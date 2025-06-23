"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface AgingRateCalculatorProps {
  userProfile: UserProfile
  setUserProfile: (profile: UserProfile) => void
}

export function AgingRateCalculator({ userProfile, setUserProfile }: AgingRateCalculatorProps) {
  const updateProfile = (key: keyof UserProfile, value: number) => {
    setUserProfile({ ...userProfile, [key]: value })
  }

  const resetToOptimal = () => {
    setUserProfile({
      ...userProfile,
      sleepHours: 8,
      veggiePortions: 5,
      steps: 10000,
      stressLevel: 3,
      cigarettesPerDay: 0,
      alcoholUnitsPerWeek: 0,
      exerciseMinutes: 45,
    })
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Personal Health Calculator
              </div>
              <Button onClick={resetToOptimal} variant="outline" size="sm">
                Set Optimal Values
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => updateProfile("age", Number.parseInt(e.target.value) || 0)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => updateProfile("weight", Number.parseInt(e.target.value) || 0)}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={userProfile.height}
                  onChange={(e) => updateProfile("height", Number.parseInt(e.target.value) || 0)}
                  className="text-lg"
                />
              </div>
            </div>

            {/* Sleep */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label>Sleep Hours per Night</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Optimal: 7-8 hours. Quality sleep promotes cellular repair and reduces inflammation.</p>
                  </TooltipContent>
                </Tooltip>
                <Badge variant={userProfile.sleepHours >= 7 && userProfile.sleepHours <= 8 ? "default" : "secondary"}>
                  {userProfile.sleepHours}h
                </Badge>
              </div>
              <Slider
                value={[userProfile.sleepHours]}
                onValueChange={(value) => updateProfile("sleepHours", value[0])}
                max={12}
                min={4}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>4h</span>
                <span className="text-green-600 font-medium">7-8h (Optimal)</span>
                <span>12h</span>
              </div>
            </div>

            {/* Nutrition */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label>Vegetable Portions per Day</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Optimal: 5+ portions. Rich in antioxidants that protect against cellular damage.</p>
                  </TooltipContent>
                </Tooltip>
                <Badge variant={userProfile.veggiePortions >= 5 ? "default" : "secondary"}>
                  {userProfile.veggiePortions} portions
                </Badge>
              </div>
              <Slider
                value={[userProfile.veggiePortions]}
                onValueChange={(value) => updateProfile("veggiePortions", value[0])}
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            {/* Exercise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Daily Steps</Label>
                  <Badge variant={userProfile.steps >= 10000 ? "default" : "secondary"}>
                    {userProfile.steps.toLocaleString()}
                  </Badge>
                </div>
                <Slider
                  value={[userProfile.steps]}
                  onValueChange={(value) => updateProfile("steps", value[0])}
                  max={20000}
                  min={1000}
                  step={500}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Exercise Minutes per Day</Label>
                  <Badge variant={userProfile.exerciseMinutes >= 30 ? "default" : "secondary"}>
                    {userProfile.exerciseMinutes} min
                  </Badge>
                </div>
                <Slider
                  value={[userProfile.exerciseMinutes]}
                  onValueChange={(value) => updateProfile("exerciseMinutes", value[0])}
                  max={120}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Stress */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label>Stress Level (1-10)</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Chronic stress increases cortisol, which accelerates cellular aging.</p>
                  </TooltipContent>
                </Tooltip>
                <Badge variant={userProfile.stressLevel <= 4 ? "default" : "destructive"}>
                  {userProfile.stressLevel}/10
                </Badge>
              </div>
              <Slider
                value={[userProfile.stressLevel]}
                onValueChange={(value) => updateProfile("stressLevel", value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            {/* Negative Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Cigarettes per Day</Label>
                  <Badge variant={userProfile.cigarettesPerDay === 0 ? "default" : "destructive"}>
                    {userProfile.cigarettesPerDay}
                  </Badge>
                </div>
                <Slider
                  value={[userProfile.cigarettesPerDay]}
                  onValueChange={(value) => updateProfile("cigarettesPerDay", value[0])}
                  max={40}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Alcohol Units per Week</Label>
                  <Badge variant={userProfile.alcoholUnitsPerWeek <= 7 ? "default" : "destructive"}>
                    {userProfile.alcoholUnitsPerWeek}
                  </Badge>
                </div>
                <Slider
                  value={[userProfile.alcoholUnitsPerWeek]}
                  onValueChange={(value) => updateProfile("alcoholUnitsPerWeek", value[0])}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
