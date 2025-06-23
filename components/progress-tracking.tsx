"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Calendar, Award, Target, BarChart3, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { useState } from "react"

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

interface ProgressTrackingProps {
  agingRate: number
  maxAge: number
  dailyActivities: DailyActivities[]
}

export function ProgressTracking({ agingRate, maxAge, dailyActivities }: ProgressTrackingProps) {
  const [selectedMetric, setSelectedMetric] = useState<"aging" | "consistency" | "wellness">("aging")

  // Generate historical data from daily activities
  const generateHistoricalData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toISOString().split("T")[0]
    })

    return last30Days.map((date) => {
      const activity = dailyActivities.find((a) => a.date === date)
      const consistencyScore = activity
        ? ([activity.exercise, activity.meditation, activity.journaling].filter(Boolean).length / 3) * 100
        : 0

      // Simulate aging rate improvement over time
      const baseAgingRate = 1.2 - (consistencyScore / 100) * 0.3
      const wellnessScore = activity ? ((activity.mood + activity.energy) / 2) * 10 : 50

      return {
        date,
        agingRate: baseAgingRate,
        maxAge: 82 + (1.2 - baseAgingRate) * 25,
        consistencyScore,
        wellnessScore,
        vegetables: activity?.vegetables || 0,
        water: activity?.water || 0,
        mood: activity?.mood || 5,
        energy: activity?.energy || 5,
      }
    })
  }

  const historicalData = generateHistoricalData()
  const currentHealthScore = Math.round((2.0 - agingRate) * 50)
  const avgConsistency =
    dailyActivities.length > 0
      ? (dailyActivities
          .slice(-7)
          .reduce((acc, day) => acc + [day.exercise, day.meditation, day.journaling].filter(Boolean).length / 3, 0) /
          Math.min(7, dailyActivities.length)) *
        100
      : 0

  const achievements = [
    {
      id: 1,
      title: "First Week Complete",
      description: "Completed your first week of tracking",
      date: dailyActivities.length >= 7 ? dailyActivities[6]?.date : null,
      icon: "🎯",
      unlocked: dailyActivities.length >= 7,
    },
    {
      id: 2,
      title: "Consistency Champion",
      description: "Maintained 80%+ consistency for 7 days",
      date: avgConsistency >= 80 ? new Date().toISOString().split("T")[0] : null,
      icon: "🏆",
      unlocked: avgConsistency >= 80,
    },
    {
      id: 3,
      title: "Meditation Master",
      description: "Meditated for 7 consecutive days",
      date: dailyActivities.slice(-7).every((day) => day.meditation) ? new Date().toISOString().split("T")[0] : null,
      icon: "🧘",
      unlocked: dailyActivities.slice(-7).every((day) => day.meditation),
    },
    {
      id: 4,
      title: "Hydration Hero",
      description: "Drank 8+ glasses of water for 14 days",
      date: dailyActivities.slice(-14).every((day) => day.water >= 8) ? new Date().toISOString().split("T")[0] : null,
      icon: "💧",
      unlocked: dailyActivities.slice(-14).every((day) => day.water >= 8),
    },
    {
      id: 5,
      title: "Veggie Lover",
      description: "Ate 5+ servings of vegetables for 14 days",
      date: dailyActivities.slice(-14).every((day) => day.vegetables >= 5)
        ? new Date().toISOString().split("T")[0]
        : null,
      icon: "🥦",
      unlocked: dailyActivities.slice(-14).every((day) => day.vegetables >= 5),
    },
  ].filter((achievement) => achievement.unlocked)

  const improvement = historicalData.length > 1 ? currentHealthScore - historicalData[0].wellnessScore : 0

  const exportData = () => {
    const dataStr = JSON.stringify(historicalData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "aging-slowdown-progress.json"
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{currentHealthScore}</div>
            <p className="text-sm text-gray-600">out of 100</p>
            {improvement > 0 && <Badge className="mt-2 bg-green-100 text-green-800">+{improvement} improvement</Badge>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Current Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Age {Math.round(maxAge)}</div>
            <p className="text-sm text-gray-600">Expected max age</p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">+{Math.round(maxAge - 82)} vs average</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{achievements.length}</div>
            <p className="text-sm text-gray-600">milestones reached</p>
            <Badge className="mt-2 bg-purple-100 text-purple-800">
              Latest: {achievements[achievements.length - 1]?.title}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Aging Rate Trend
              </div>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short" })}
                />
                <YAxis domain={[0.8, 1.3]} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [value.toFixed(2), "Aging Rate"]}
                />
                <Line
                  type="monotone"
                  dataKey="agingRate"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Health Score Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short" })}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [value, "Health Score"]}
                />
                <Area type="monotone" dataKey="healthScore" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">7.5</div>
              <p className="text-sm text-gray-600">Avg Sleep Hours</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.2</div>
              <p className="text-sm text-gray-600">Avg Veggie Portions</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">8,500</div>
              <p className="text-sm text-gray-600">Avg Daily Steps</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.1</div>
              <p className="text-sm text-gray-600">Avg Stress Level</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
