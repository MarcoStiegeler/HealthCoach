"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Target, TrendingUp, Award, Clock, BarChart3 } from "lucide-react"
import { AgingRateCalculator } from "@/components/aging-rate-calculator"
import { RecommendationsPanel } from "@/components/recommendations-panel"
import { ProgressTracking } from "@/components/progress-tracking"
import { VideoIntegration } from "@/components/video-integration"
import { ActivityTracker } from "@/components/activity-tracker"
import { BiomarkerComparison } from "@/components/biomarker-comparison"
import { NotificationSettings } from "@/components/notification-settings"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface UserProfile {
  age: number
  weight: number
  height: number
  sleepHours: number
  veggiePortions: number
  steps: number
  stressLevel: number
  cigarettesPerDay: number
  alcoholUnitsPerWeek: number
  exerciseMinutes: number
}

interface DailyActivities {
  date: string
  exercise: boolean
  meditation: boolean
  journaling: boolean
  sleepTime: string
  wakeTime: string
  vegetables: number
  water: number
  supplements: string[]
  mood: number
  energy: number
}

export default function AgingSlowdownCoach() {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>("userProfile", {
    age: 35,
    weight: 70,
    height: 175,
    sleepHours: 7,
    veggiePortions: 3,
    steps: 8000,
    stressLevel: 5,
    cigarettesPerDay: 0,
    alcoholUnitsPerWeek: 2,
    exerciseMinutes: 30,
  })

  const [dailyActivities, setDailyActivities] = useLocalStorage<DailyActivities[]>("dailyActivities", [])
  const [agingRate, setAgingRate] = useLocalStorage<number>("agingRate", 1.0)
  const [maxAge, setMaxAge] = useLocalStorage<number>("maxAge", 80)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const scrollY = useRef(0)

  // Auto-hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsHeaderVisible(currentScrollY < scrollY.current || currentScrollY < 100)
      scrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate aging rate when profile changes
  useEffect(() => {
    const calculateAgingRate = () => {
      let rate = 1.0

      // Sleep factor (optimal: 7-8 hours)
      const sleepOptimal = Math.abs(userProfile.sleepHours - 7.5)
      rate += sleepOptimal * 0.02

      // Nutrition factor
      rate -= Math.min(userProfile.veggiePortions, 5) * 0.015

      // Exercise factor
      rate -= Math.min(userProfile.steps / 1000, 10) * 0.008
      rate -= Math.min(userProfile.exerciseMinutes, 60) * 0.002

      // Stress factor
      rate += (userProfile.stressLevel - 1) * 0.025

      // Negative factors
      rate += userProfile.cigarettesPerDay * 0.05
      rate += userProfile.alcoholUnitsPerWeek * 0.01

      // Daily consistency bonus from activities
      const recentActivities = dailyActivities.slice(-7) // Last 7 days
      const consistencyBonus = calculateConsistencyBonus(recentActivities)
      rate -= consistencyBonus

      const baseAge = 82
      const ageAdjustment = (1.0 - rate) * 25
      const calculatedMaxAge = baseAge + ageAdjustment

      setAgingRate(Math.max(0.6, Math.min(1.4, rate)))
      setMaxAge(Math.max(65, Math.min(100, calculatedMaxAge)))
    }

    calculateAgingRate()
  }, [userProfile, dailyActivities])

  const calculateConsistencyBonus = (activities: DailyActivities[]) => {
    if (activities.length === 0) return 0

    let bonus = 0
    const exerciseConsistency = activities.filter((a) => a.exercise).length / activities.length
    const meditationConsistency = activities.filter((a) => a.meditation).length / activities.length
    const journalingConsistency = activities.filter((a) => a.journaling).length / activities.length

    bonus += exerciseConsistency * 0.02
    bonus += meditationConsistency * 0.015
    bonus += journalingConsistency * 0.01

    return bonus
  }

  const agingRateStatus = agingRate < 0.9 ? "Excellent" : agingRate < 1.1 ? "Good" : "Needs Improvement"
  const healthScore = Math.round((2.0 - agingRate) * 50)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Auto-hiding Header */}
      <header
        className={`bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Aging Slowdown Coach</h1>
                <p className="text-sm text-gray-600">Science-Based Longevity Optimization</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden sm:flex">
                <Clock className="w-4 h-4 mr-1" />
                Health Score: {healthScore}
              </Badge>
              <Badge variant={agingRate < 1.0 ? "default" : "secondary"}>Aging Rate: {agingRate.toFixed(2)}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Aging Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{agingRate.toFixed(2)}</div>
              <p className="text-green-100">years per year</p>
              <Badge className="mt-2 bg-white/20">{agingRateStatus}</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Expected Max Age
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Math.round(maxAge)}</div>
              <p className="text-blue-100">years</p>
              <Badge className="mt-2 bg-white/20">+{Math.round(maxAge - 82)} vs average</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{healthScore}</div>
              <p className="text-purple-100">out of 100</p>
              <Progress value={healthScore} className="mt-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Consistency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {dailyActivities.length > 0
                  ? Math.round(
                      (dailyActivities.slice(-7).filter((a) => a.exercise || a.meditation || a.journaling).length /
                        Math.min(7, dailyActivities.length)) *
                        100,
                    )
                  : 0}
                %
              </div>
              <p className="text-orange-100">last 7 days</p>
              <Badge className="mt-2 bg-white/20">Daily Activities</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Bryan Johnson Video Integration */}
        <VideoIntegration />

        {/* Main Content Tabs */}
        <Tabs defaultValue="activities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="activities">Daily Activities</TabsTrigger>
            <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-6">
            <ActivityTracker
              dailyActivities={dailyActivities}
              setDailyActivities={setDailyActivities}
              userProfile={userProfile}
            />
          </TabsContent>

          <TabsContent value="biomarkers" className="space-y-6">
            <BiomarkerComparison userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="calculator">
            <AgingRateCalculator userProfile={userProfile} setUserProfile={setUserProfile} />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsPanel userProfile={userProfile} dailyActivities={dailyActivities} />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracking agingRate={agingRate} maxAge={maxAge} dailyActivities={dailyActivities} />
          </TabsContent>

          <TabsContent value="settings">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
