"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Heart } from "lucide-react"

interface LifeTimelineVisualizationProps {
  currentAge: number
  maxAge: number
  agingRate: number
}

export function LifeTimelineVisualization({ currentAge, maxAge, agingRate }: LifeTimelineVisualizationProps) {
  const lifeProgress = (currentAge / maxAge) * 100
  const remainingYears = maxAge - currentAge
  const healthyYears = remainingYears * (2.0 - agingRate)

  const getTimelineColor = () => {
    if (agingRate < 0.9) return "from-green-400 to-emerald-600"
    if (agingRate < 1.1) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-red-600"
  }

  const getLifeStage = (age: number) => {
    if (age < 18) return "Childhood"
    if (age < 30) return "Young Adult"
    if (age < 50) return "Adult"
    if (age < 65) return "Middle Age"
    if (age < 80) return "Senior"
    return "Elder"
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Life Timeline Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Timeline */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Age {currentAge}</span>
            <Badge variant="outline">{getLifeStage(currentAge)}</Badge>
            <span className="text-sm font-medium">Age {Math.round(maxAge)}</span>
          </div>

          <div className="relative">
            <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getTimelineColor()} transition-all duration-1000 ease-out`}
                style={{ width: `${lifeProgress}%` }}
              />
            </div>
            <div
              className="absolute top-0 w-1 h-6 bg-white border-2 border-gray-800 rounded-full"
              style={{ left: `${lifeProgress}%`, transform: "translateX(-50%)" }}
            />
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{remainingYears.toFixed(1)} years remaining</p>
            <p className="text-sm text-gray-600">at current aging rate</p>
          </div>
        </div>

        {/* Life Tree Visualization */}
        <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-lg p-6 text-center">
          <div className="text-6xl mb-2">{agingRate < 0.9 ? "🌳" : agingRate < 1.1 ? "🌲" : "🌿"}</div>
          <p className="font-medium text-gray-800">Your Life Tree</p>
          <p className="text-sm text-gray-600">
            {agingRate < 0.9
              ? "Flourishing with optimal health!"
              : agingRate < 1.1
                ? "Growing strong with good habits"
                : "Needs more care to thrive"}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium text-gray-700">Aging Rate</p>
            <p className="text-xl font-bold text-blue-600">{agingRate.toFixed(2)}</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Heart className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-medium text-gray-700">Healthy Years</p>
            <p className="text-xl font-bold text-green-600">{healthyYears.toFixed(0)}</p>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Upcoming Milestones</h4>
          <div className="space-y-2 text-sm">
            {[50, 60, 70, 80, 90]
              .filter((age) => age > currentAge && age <= maxAge)
              .slice(0, 3)
              .map((age) => (
                <div key={age} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Age {age}</span>
                  <span className="text-gray-600">{age - currentAge} years</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
