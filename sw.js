const CACHE_NAME = 'vitalage-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/App.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Push notification event
self.addEventListener('push', event => {
  console.log('Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'VitalAge reminder - time to optimize your health!',
    icon: '/App.png',
    badge: '/App.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'vitalage-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/App.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/App.png'
      }
    ],
    data: {
      url: '/',
      timestamp: Date.now()
    }
  };

  event.waitUntil(
    self.registration.showNotification('VitalAge', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // If app is already open, focus it
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

// Background sync event (for future offline functionality)
self.addEventListener('sync', event => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sync data when connection is restored
      syncData()
    );
  }
});

// Sync data function
async function syncData() {
  try {
    console.log('Syncing data...');
    // In a real app, this would sync with a backend
    return Promise.resolve();
  } catch (error) {
    console.error('Sync failed:', error);
    throw error;
  }
}

// Periodic background sync (for future features)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'health-reminder') {
    event.waitUntil(
      sendHealthReminder()
    );
  }
});

// Send health reminder
async function sendHealthReminder() {
  const options = {
    body: 'Time to check in with your health goals!',
    icon: '/App.png',
    badge: '/App.png',
    tag: 'health-reminder',
    requireInteraction: false
  };
  
  return self.registration.showNotification('VitalAge Health Check', options);
}

// Message event (for communication with main app)
self.addEventListener('message', event => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    // Schedule a notification
    const { title, body, delay } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/App.png',
        badge: '/App.png'
      });
    }, delay);
  }
});