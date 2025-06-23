"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Activity, Brain, Apple, Clock, Info } from "lucide-react"
import { ScientificExplanation } from "@/components/scientific-explanation"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface NotificationSetting {
  id: string
  title: string
  description: string
  icon: any
  enabled: boolean
  time: string
  frequency: "daily" | "weekly" | "custom"
  scientificReason: string
  references: string[]
}

export function NotificationSettings() {
  const [notifications, setNotifications] = useLocalStorage<NotificationSetting[]>("notifications", [
    {
      id: "bedtime",
      title: "Bedtime Reminder",
      description: "Consistent sleep schedule for optimal circadian rhythm",
      icon: Moon,
      enabled: true,
      time: "21:30",
      frequency: "daily",
      scientificReason:
        "Consistent bedtime helps regulate circadian rhythms, optimizing melatonin production and sleep quality. Going to bed at the same time daily can improve sleep efficiency by 15-20% and reduce the time to fall asleep by 10-15 minutes.",
      references: ["Sleep Medicine Reviews 2020", "Nature Reviews Neuroscience 2015"],
    },
    {
      id: "meditation",
      title: "Meditation Time",
      description: "Daily mindfulness practice for stress reduction",
      icon: Brain,
      enabled: true,
      time: "07:00",
      frequency: "daily",
      scientificReason:
        "Regular meditation at the same time daily helps establish a routine that maximizes stress reduction benefits. Morning meditation can reduce cortisol levels by 23% and improve focus throughout the day.",
      references: ["Psychoneuroendocrinology 2017", "Mindfulness 2019"],
    },
    {
      id: "exercise",
      title: "Exercise Reminder",
      description: "Daily movement for cardiovascular health",
      icon: Activity,
      enabled: true,
      time: "17:00",
      frequency: "daily",
      scientificReason:
        "Consistent exercise timing helps optimize performance and recovery. Evening exercise can improve sleep quality when done 3+ hours before bedtime, while maintaining circadian rhythm stability.",
      references: ["Sports Medicine 2019", "Journal of Clinical Medicine 2020"],
    },
    {
      id: "nutrition",
      title: "Nutrition Check",
      description: "Track daily vegetable and water intake",
      icon: Apple,
      enabled: true,
      time: "12:00",
      frequency: "daily",
      scientificReason:
        "Midday nutrition reminders help maintain consistent eating patterns and ensure adequate nutrient intake. Regular meal timing supports metabolic health and can improve insulin sensitivity by 10-15%.",
      references: ["Cell Metabolism 2018", "Nutrients 2020"],
    },
    {
      id: "hydration",
      title: "Hydration Reminder",
      description: "Stay properly hydrated throughout the day",
      icon: Clock,
      enabled: false,
      time: "10:00",
      frequency: "daily",
      scientificReason:
        "Regular hydration reminders help maintain optimal fluid balance, supporting cellular function, temperature regulation, and cognitive performance. Proper hydration can improve mental performance by 12%.",
      references: ["European Journal of Nutrition 2017", "Nutrients 2019"],
    },
  ])

  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>("default")

  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setPermissionStatus(permission)

      if (permission === "granted") {
        // Schedule notifications
        scheduleNotifications()
      }
    }
  }

  const scheduleNotifications = () => {
    // Clear existing notifications
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.getNotifications().then((notifications) => {
          notifications.forEach((notification) => notification.close())
        })
      })
    }

    // Schedule new notifications
    notifications
      .filter((n) => n.enabled)
      .forEach((notification) => {
        scheduleNotification(notification)
      })
  }

  const scheduleNotification = (notification: NotificationSetting) => {
    const now = new Date()
    const [hours, minutes] = notification.time.split(":").map(Number)
    const scheduledTime = new Date()
    scheduledTime.setHours(hours, minutes, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime()

    setTimeout(() => {
      if (permissionStatus === "granted") {
        new Notification(notification.title, {
          body: notification.description,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: notification.id,
          requireInteraction: false,
          silent: false,
        })
      }

      // Schedule for next day if daily
      if (notification.frequency === "daily") {
        setTimeout(() => scheduleNotification(notification), 24 * 60 * 60 * 1000)
      }
    }, timeUntilNotification)
  }

  const updateNotification = (id: string, updates: Partial<NotificationSetting>) => {
    const updatedNotifications = notifications.map((n) => (n.id === id ? { ...n, ...updates } : n))
    setNotifications(updatedNotifications)

    // Reschedule notifications if enabled
    if (updates.enabled !== false && permissionStatus === "granted") {
      scheduleNotifications()
    }
  }

  const testNotification = (notification: NotificationSetting) => {
    if (permissionStatus === "granted") {
      new Notification(notification.title, {
        body: `Test: ${notification.description}`,
        icon: "/favicon.ico",
        tag: `test-${notification.id}`,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Permission Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Browser Notifications</h3>
              <p className="text-sm text-gray-600">
                {permissionStatus === "granted"
                  ? "Notifications are enabled and working"
                  : permissionStatus === "denied"
                    ? "Notifications are blocked. Please enable in browser settings."
                    : "Click to enable notifications for reminders"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={permissionStatus === "granted" ? "default" : "secondary"}>
                {permissionStatus === "granted" ? "Enabled" : permissionStatus === "denied" ? "Blocked" : "Disabled"}
              </Badge>
              {permissionStatus !== "granted" && (
                <Button onClick={requestNotificationPermission}>Enable Notifications</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = notification.icon

          return (
            <Card key={notification.id} className={notification.enabled ? "bg-blue-50 border-blue-200" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-6 h-6 ${notification.enabled ? "text-blue-600" : "text-gray-400"}`} />
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ScientificExplanation
                      title={`Why ${notification.title}?`}
                      content={notification.scientificReason}
                      references={notification.references}
                    />
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={(enabled) => updateNotification(notification.id, { enabled })}
                    />
                  </div>
                </div>

                {notification.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`time-${notification.id}`}>Time</Label>
                      <Input
                        id={`time-${notification.id}`}
                        type="time"
                        value={notification.time}
                        onChange={(e) => updateNotification(notification.id, { time: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`frequency-${notification.id}`}>Frequency</Label>
                      <Select
                        value={notification.frequency}
                        onValueChange={(frequency: "daily" | "weekly" | "custom") =>
                          updateNotification(notification.id, { frequency })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testNotification(notification)}
                        disabled={permissionStatus !== "granted"}
                        className="w-full"
                      >
                        Test Notification
                      </Button>
                    </div>
                  </div>
                )}

                {notification.enabled && (
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-1">🧠 Scientific Rationale</h4>
                    <p className="text-sm text-gray-700">{notification.scientificReason}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Setup Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => {
                const optimalTimes = [
                  { id: "bedtime", time: "21:30" },
                  { id: "meditation", time: "07:00" },
                  { id: "exercise", time: "17:00" },
                  { id: "nutrition", time: "12:00" },
                ]

                optimalTimes.forEach(({ id, time }) => {
                  updateNotification(id, { enabled: true, time })
                })
              }}
              className="h-auto p-4 text-left"
              variant="outline"
            >
              <div>
                <h3 className="font-medium">Optimal Schedule</h3>
                <p className="text-sm text-gray-600 mt-1">Set scientifically-backed times for maximum benefit</p>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.forEach((n) => {
                  updateNotification(n.id, { enabled: false })
                })
              }}
              className="h-auto p-4 text-left"
              variant="outline"
            >
              <div>
                <h3 className="font-medium">Disable All</h3>
                <p className="text-sm text-gray-600 mt-1">Turn off all notifications</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Consistency is Key:</strong> The timing of these activities is as important as doing them. Your
            circadian rhythm responds to consistent daily patterns.
          </p>
          <p>
            <strong>Bedtime Reminder:</strong> Going to bed at the same time every day (including weekends) optimizes
            sleep quality and hormone production.
          </p>
          <p>
            <strong>Browser Limitations:</strong> Notifications work best when the browser tab remains open. For mobile
            devices, consider adding this app to your home screen.
          </p>
          <p>
            <strong>Customization:</strong> Adjust times based on your schedule, but try to maintain consistency once
            you find what works for you.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
