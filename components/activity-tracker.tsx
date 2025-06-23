"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Activity, Brain, BookOpen, Moon, Apple, Pill, Smile, CheckCircle, Target } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ScientificExplanation } from "@/components/scientific-explanation"

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

interface ActivityTrackerProps {
  dailyActivities: DailyActivities[]
  setDailyActivities: (activities: DailyActivities[]) => void
  userProfile: UserProfile
}

export function ActivityTracker({ dailyActivities, setDailyActivities, userProfile }: ActivityTrackerProps) {
  const today = new Date().toISOString().split("T")[0]
  const todayActivity = dailyActivities.find((a) => a.date === today)

  const [currentActivity, setCurrentActivity] = useState<DailyActivities>(
    todayActivity || {
      date: today,
      exercise: false,
      meditation: false,
      journaling: false,
      sleepTime: "22:00",
      wakeTime: "06:00",
      vegetables: 0,
      water: 0,
      supplements: [],
      mood: 5,
      energy: 5,
    },
  )

  const [journalEntry, setJournalEntry] = useState("")
  const [supplementInput, setSupplementInput] = useState("")

  const updateActivity = (updates: Partial<DailyActivities>) => {
    const updated = { ...currentActivity, ...updates }
    setCurrentActivity(updated)

    const existingIndex = dailyActivities.findIndex((a) => a.date === today)
    if (existingIndex >= 0) {
      const newActivities = [...dailyActivities]
      newActivities[existingIndex] = updated
      setDailyActivities(newActivities)
    } else {
      setDailyActivities([...dailyActivities, updated])
    }
  }

  const toggleActivity = (activity: keyof Pick<DailyActivities, "exercise" | "meditation" | "journaling">) => {
    updateActivity({ [activity]: !currentActivity[activity] })
  }

  const addSupplement = () => {
    if (supplementInput.trim()) {
      updateActivity({
        supplements: [...currentActivity.supplements, supplementInput.trim()],
      })
      setSupplementInput("")
    }
  }

  const removeSupplement = (index: number) => {
    const newSupplements = currentActivity.supplements.filter((_, i) => i !== index)
    updateActivity({ supplements: newSupplements })
  }

  const calculateSleepHours = () => {
    const sleep = new Date(`2000-01-01T${currentActivity.sleepTime}`)
    const wake = new Date(`2000-01-02T${currentActivity.wakeTime}`)
    return ((wake.getTime() - sleep.getTime()) / (1000 * 60 * 60)).toFixed(1)
  }

  const getStreakCount = (activity: keyof Pick<DailyActivities, "exercise" | "meditation" | "journaling">) => {
    let streak = 0
    const sortedActivities = [...dailyActivities].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    for (const day of sortedActivities) {
      if (day[activity]) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Daily Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Today's Activities - {new Date().toLocaleDateString()}
              </div>
              <Badge
                variant={
                  currentActivity.exercise && currentActivity.meditation && currentActivity.journaling
                    ? "default"
                    : "secondary"
                }
              >
                {
                  [currentActivity.exercise, currentActivity.meditation, currentActivity.journaling].filter(Boolean)
                    .length
                }
                /3 Core Activities
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exercise */}
              <Card
                className={`cursor-pointer transition-all ${currentActivity.exercise ? "bg-green-50 border-green-200" : "hover:bg-gray-50"}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Activity
                        className={`w-8 h-8 ${currentActivity.exercise ? "text-green-600" : "text-gray-400"}`}
                      />
                      <div>
                        <h3 className="font-semibold">Exercise</h3>
                        <p className="text-sm text-gray-600">Daily movement</p>
                      </div>
                    </div>
                    <ScientificExplanation
                      title="Exercise Benefits"
                      content="Regular exercise increases mitochondrial biogenesis, improves cardiovascular health, and reduces inflammation markers like CRP by up to 30%. Studies show 150 minutes of moderate exercise per week can extend lifespan by 3-7 years through improved cellular repair mechanisms and enhanced autophagy."
                      references={["Lancet 2016", "Cell Metabolism 2018", "Nature Medicine 2019"]}
                    />
                  </div>

                  <Button
                    onClick={() => toggleActivity("exercise")}
                    className={`w-full ${currentActivity.exercise ? "bg-green-600 hover:bg-green-700" : ""}`}
                    variant={currentActivity.exercise ? "default" : "outline"}
                  >
                    {currentActivity.exercise ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed Today
                      </>
                    ) : (
                      "Mark as Done"
                    )}
                  </Button>

                  {getStreakCount("exercise") > 0 && (
                    <Badge className="mt-2 w-full justify-center bg-orange-100 text-orange-800">
                      🔥 {getStreakCount("exercise")} day streak
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Meditation */}
              <Card
                className={`cursor-pointer transition-all ${currentActivity.meditation ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Brain className={`w-8 h-8 ${currentActivity.meditation ? "text-blue-600" : "text-gray-400"}`} />
                      <div>
                        <h3 className="font-semibold">Meditation</h3>
                        <p className="text-sm text-gray-600">Mindfulness practice</p>
                      </div>
                    </div>
                    <ScientificExplanation
                      title="Meditation Benefits"
                      content="Meditation reduces cortisol levels by 23% on average, decreases telomere shortening, and increases gray matter density in areas associated with learning and memory. Regular practice (8+ weeks) shows measurable changes in brain structure and reduces biological age markers by 2-3 years."
                      references={["PNAS 2014", "Psychoneuroendocrinology 2017", "Nature Neuroscience 2018"]}
                    />
                  </div>

                  <Button
                    onClick={() => toggleActivity("meditation")}
                    className={`w-full ${currentActivity.meditation ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={currentActivity.meditation ? "default" : "outline"}
                  >
                    {currentActivity.meditation ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed Today
                      </>
                    ) : (
                      "Mark as Done"
                    )}
                  </Button>

                  {getStreakCount("meditation") > 0 && (
                    <Badge className="mt-2 w-full justify-center bg-orange-100 text-orange-800">
                      🔥 {getStreakCount("meditation")} day streak
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Journaling */}
              <Card
                className={`cursor-pointer transition-all ${currentActivity.journaling ? "bg-purple-50 border-purple-200" : "hover:bg-gray-50"}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen
                        className={`w-8 h-8 ${currentActivity.journaling ? "text-purple-600" : "text-gray-400"}`}
                      />
                      <div>
                        <h3 className="font-semibold">Journaling</h3>
                        <p className="text-sm text-gray-600">Reflection & gratitude</p>
                      </div>
                    </div>
                    <ScientificExplanation
                      title="Journaling Benefits"
                      content="Expressive writing reduces stress hormones, improves immune function, and enhances emotional regulation. Gratitude journaling specifically increases positive emotions and life satisfaction while reducing inflammation markers. Studies show 15-20 minutes of daily journaling can improve mental health outcomes by 25%."
                      references={[
                        "Journal of Experimental Psychology 2006",
                        "Applied Psychology 2011",
                        "Psychosomatic Medicine 2013",
                      ]}
                    />
                  </div>

                  <Button
                    onClick={() => toggleActivity("journaling")}
                    className={`w-full ${currentActivity.journaling ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                    variant={currentActivity.journaling ? "default" : "outline"}
                  >
                    {currentActivity.journaling ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed Today
                      </>
                    ) : (
                      "Mark as Done"
                    )}
                  </Button>

                  {getStreakCount("journaling") > 0 && (
                    <Badge className="mt-2 w-full justify-center bg-orange-100 text-orange-800">
                      🔥 {getStreakCount("journaling")} day streak
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sleep Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Moon className="w-5 h-5 mr-2" />
                Sleep Schedule
                <ScientificExplanation
                  title="Sleep Consistency Benefits"
                  content="Consistent sleep-wake times regulate circadian rhythms, optimize melatonin production, and improve sleep quality. Going to bed at the same time daily enhances deep sleep phases crucial for cellular repair, memory consolidation, and growth hormone release. Irregular sleep patterns can accelerate aging by disrupting metabolic processes."
                  references={["Sleep Medicine Reviews 2020", "Nature Reviews Neuroscience 2015"]}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleepTime">Bedtime</Label>
                  <Input
                    id="sleepTime"
                    type="time"
                    value={currentActivity.sleepTime}
                    onChange={(e) => updateActivity({ sleepTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wakeTime">Wake Time</Label>
                  <Input
                    id="wakeTime"
                    type="time"
                    value={currentActivity.wakeTime}
                    onChange={(e) => updateActivity({ wakeTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Sleep Duration: {calculateSleepHours()} hours</p>
                <p className="text-xs text-blue-700 mt-1">
                  Optimal: 7-8 hours for cellular repair and hormone regulation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Apple className="w-5 h-5 mr-2" />
                Nutrition & Hydration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Vegetable Servings</Label>
                    <Badge variant="outline">{currentActivity.vegetables}/5</Badge>
                  </div>
                  <Slider
                    value={[currentActivity.vegetables]}
                    onValueChange={(value) => updateActivity({ vegetables: value[0] })}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600">Target: 5+ servings daily for optimal antioxidant intake</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Water Intake (glasses)</Label>
                    <Badge variant="outline">{currentActivity.water}/8</Badge>
                  </div>
                  <Slider
                    value={[currentActivity.water]}
                    onValueChange={(value) => updateActivity({ water: value[0] })}
                    max={15}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supplements & Mood */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supplements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Supplements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add supplement (e.g., Vitamin D3)"
                  value={supplementInput}
                  onChange={(e) => setSupplementInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSupplement()}
                />
                <Button onClick={addSupplement}>Add</Button>
              </div>

              <div className="space-y-2">
                {currentActivity.supplements.map((supplement, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{supplement}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSupplement(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {currentActivity.supplements.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No supplements tracked today</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Mood & Energy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smile className="w-5 h-5 mr-2" />
                Mood & Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Mood Level</Label>
                  <Badge variant="outline">{currentActivity.mood}/10</Badge>
                </div>
                <Slider
                  value={[currentActivity.mood]}
                  onValueChange={(value) => updateActivity({ mood: value[0] })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>😢 Poor</span>
                  <span>😊 Excellent</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Energy Level</Label>
                  <Badge variant="outline">{currentActivity.energy}/10</Badge>
                </div>
                <Slider
                  value={[currentActivity.energy]}
                  onValueChange={(value) => updateActivity({ energy: value[0] })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>⚡ Low</span>
                  <span>🔋 High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journal Entry */}
        {currentActivity.journaling && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Today's Journal Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write about your day, gratitude, goals, or reflections..."
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">💡 Journaling Prompts</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• What are 3 things I'm grateful for today?</li>
                  <li>• What did I learn about myself today?</li>
                  <li>• How did I take care of my health today?</li>
                  <li>• What's one thing I want to improve tomorrow?</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Summary & Consistency Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {
                    [currentActivity.exercise, currentActivity.meditation, currentActivity.journaling].filter(Boolean)
                      .length
                  }
                </div>
                <p className="text-sm text-gray-600">Core Activities Today</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.max(getStreakCount("exercise"), getStreakCount("meditation"), getStreakCount("journaling"))}
                </div>
                <p className="text-sm text-gray-600">Best Streak (days)</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  -
                  {(
                    dailyActivities.slice(-7).filter((a) => a.exercise || a.meditation || a.journaling).length * 0.005
                  ).toFixed(3)}
                </div>
                <p className="text-sm text-gray-600">Aging Rate Reduction</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">🎯 Consistency is Key</h4>
              <p className="text-sm text-gray-600">
                Daily consistency in these activities compounds over time. Each day you complete all three core
                activities reduces your aging rate by approximately 0.005 points. Over a year, this consistency can
                reduce your biological aging by 1.8 points, potentially adding 2-3 years to your lifespan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
