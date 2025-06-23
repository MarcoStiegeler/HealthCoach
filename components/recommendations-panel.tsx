"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, CheckCircle, Clock, Star, Moon, Apple, Activity, Brain, Shield, Target } from "lucide-react"
import { useState } from "react"
import { ScientificExplanation } from "@/components/scientific-explanation"

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

interface RecommendationsPanelProps {
  userProfile: UserProfile
  dailyActivities: DailyActivities[]
}

interface DetailedRecommendation {
  id: string
  title: string
  description: string
  impact: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: "Sleep" | "Nutrition" | "Exercise" | "Stress" | "Lifestyle" | "Consistency"
  icon: any
  scientificBasis: string
  mechanism: string
  dosage: string
  timeframe: string
  actionSteps: string[]
  references: string[]
  dailyRequirement: string
}

export function RecommendationsPanel({ userProfile, dailyActivities }: RecommendationsPanelProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const generateDetailedRecommendations = (): DetailedRecommendation[] => {
    const recommendations: DetailedRecommendation[] = []
    const recentActivities = dailyActivities.slice(-7) // Last 7 days
    const exerciseConsistency =
      recentActivities.length > 0 ? recentActivities.filter((a) => a.exercise).length / recentActivities.length : 0
    const meditationConsistency =
      recentActivities.length > 0 ? recentActivities.filter((a) => a.meditation).length / recentActivities.length : 0

    if (userProfile.sleepHours < 7) {
      recommendations.push({
        id: "sleep-optimization",
        title: "Optimize Sleep Duration & Consistency",
        description: "Establish a consistent 7-8 hour sleep schedule every single night",
        impact: "+2-3 years life expectancy, -0.08 aging rate reduction",
        difficulty: "Medium",
        category: "Sleep",
        icon: Moon,
        scientificBasis:
          "Sleep duration of 7-8 hours optimizes cellular repair, hormone production, and immune function. Consistency is more important than total duration.",
        mechanism:
          "During deep sleep, growth hormone peaks (300% increase), promoting cellular repair and protein synthesis. Consistent sleep timing regulates circadian rhythms, optimizing melatonin and cortisol cycles.",
        dosage: "7-8 hours nightly, same bedtime/wake time daily (±30 minutes), including weekends",
        timeframe: "Benefits begin within 1 week, full optimization after 4-6 weeks of consistency",
        dailyRequirement:
          "EVERY SINGLE NIGHT - no exceptions. Weekend sleep-ins disrupt circadian rhythm for up to 3 days.",
        actionSteps: [
          "Set fixed bedtime and wake time (even weekends)",
          "Create 1-hour wind-down routine before bed",
          "Keep bedroom at 65-68°F (18-20°C)",
          "No screens 1 hour before bedtime",
          "Use blackout curtains and white noise",
          "No caffeine after 2 PM",
          "Track sleep consistency for 30 days minimum",
        ],
        references: ["Nature Reviews Neuroscience 2015", "Sleep Medicine Reviews 2020", "Cell Metabolism 2018"],
      })
    }

    if (userProfile.veggiePortions < 5) {
      recommendations.push({
        id: "vegetable-optimization",
        title: "Achieve 5+ Vegetable Servings Daily",
        description: "Consume diverse, colorful vegetables every single day for optimal antioxidant protection",
        impact: "+1-2 years per additional serving, -0.03 aging rate reduction",
        difficulty: "Easy",
        category: "Nutrition",
        icon: Apple,
        scientificBasis:
          "Vegetables provide polyphenols, carotenoids, and fiber that reduce oxidative stress, inflammation, and support gut microbiome diversity.",
        mechanism:
          "Antioxidants neutralize free radicals, reducing DNA damage. Fiber feeds beneficial gut bacteria, producing short-chain fatty acids that reduce inflammation by 15-25%.",
        dosage: "5+ servings daily (1 serving = 1 cup raw or ½ cup cooked), minimum 3 different colors",
        timeframe:
          "Antioxidant levels increase within 2 hours, inflammation markers improve after 2 weeks of consistency",
        dailyRequirement:
          "EVERY SINGLE DAY - antioxidant protection requires daily replenishment. Missing days allows oxidative damage accumulation.",
        actionSteps: [
          "Add vegetables to every meal (breakfast, lunch, dinner)",
          "Prep vegetables weekly for easy access",
          "Follow the 'rainbow rule' - eat 5 different colors daily",
          "Start meals with a salad or vegetable soup",
          "Replace snacks with raw vegetables and hummus",
          "Blend vegetables into smoothies",
          "Track daily vegetable intake for accountability",
        ],
        references: ["NEJM 2018", "Nature Medicine 2019", "Nutrients 2020"],
      })
    }

    if (userProfile.steps < 10000 || exerciseConsistency < 0.8) {
      recommendations.push({
        id: "movement-consistency",
        title: "Daily Movement & Exercise Consistency",
        description: "Achieve 10,000+ steps AND structured exercise every single day",
        impact: "+3-5 years life expectancy, -0.12 aging rate reduction",
        difficulty: "Medium",
        category: "Exercise",
        icon: Activity,
        scientificBasis:
          "Daily movement maintains mitochondrial function, cardiovascular health, and muscle mass. Consistency is more important than intensity.",
        mechanism:
          "Exercise stimulates mitochondrial biogenesis, increases BDNF (brain-derived neurotrophic factor), and activates autophagy - cellular cleanup processes that remove damaged proteins.",
        dosage: "10,000+ steps daily + 30 minutes structured exercise, 7 days per week",
        timeframe: "Cardiovascular improvements within 2 weeks, mitochondrial adaptations after 4-6 weeks",
        dailyRequirement:
          "EVERY SINGLE DAY - even light activity. Rest days should include walking or gentle movement. Complete inactivity triggers rapid fitness decline.",
        actionSteps: [
          "Walk 10,000+ steps daily (use step counter)",
          "Schedule 30 minutes exercise at same time daily",
          "Mix cardio (3-4 days) and strength training (2-3 days)",
          "Take stairs instead of elevators always",
          "Park farther away from destinations",
          "Have walking meetings when possible",
          "Track daily movement for 90 days minimum",
        ],
        references: ["Lancet 2016", "Cell Metabolism 2018", "Mayo Clinic Proceedings 2018"],
      })
    }

    if (userProfile.stressLevel > 6 || meditationConsistency < 0.8) {
      recommendations.push({
        id: "stress-meditation-consistency",
        title: "Daily Meditation & Stress Management",
        description: "Practice meditation and stress reduction techniques every single day",
        impact: "+2-4 years life expectancy, -0.10 aging rate reduction",
        difficulty: "Medium",
        category: "Stress",
        icon: Brain,
        scientificBasis:
          "Daily meditation reduces cortisol by 23%, increases telomerase activity by 30%, and improves emotional regulation.",
        mechanism:
          "Meditation activates the parasympathetic nervous system, reducing cortisol and inflammatory cytokines. Regular practice increases gray matter density in areas associated with learning and memory.",
        dosage: "10-20 minutes daily meditation + stress management techniques throughout the day",
        timeframe: "Cortisol reduction within 1 week, structural brain changes after 8 weeks of daily practice",
        dailyRequirement:
          "EVERY SINGLE DAY - stress management is not optional. Daily practice builds resilience; sporadic practice provides minimal benefit.",
        actionSteps: [
          "Meditate 10-20 minutes at the same time daily",
          "Use guided meditation apps for consistency",
          "Practice deep breathing during stressful moments",
          "Maintain a gratitude journal (3 items daily)",
          "Limit news and social media consumption",
          "Schedule regular breaks during work",
          "Track meditation streak for motivation",
        ],
        references: ["PNAS 2014", "Psychoneuroendocrinology 2017", "Nature Neuroscience 2018"],
      })
    }

    if (userProfile.cigarettesPerDay > 0) {
      recommendations.push({
        id: "smoking-cessation",
        title: "Complete Smoking Cessation",
        description: "Eliminate all tobacco use immediately and permanently",
        impact: "+7-10 years life expectancy, -0.50 aging rate reduction",
        difficulty: "Hard",
        category: "Lifestyle",
        icon: Shield,
        scientificBasis:
          "Smoking accelerates aging through oxidative stress, inflammation, and DNA damage. Quitting reverses many effects within months.",
        mechanism:
          "Tobacco smoke contains 70+ carcinogens that damage DNA, reduce oxygen delivery, and accelerate telomere shortening. Cessation allows cellular repair mechanisms to recover.",
        dosage: "Complete cessation - zero cigarettes, zero tobacco products",
        timeframe:
          "Circulation improves within 2 weeks, lung function increases within 3 months, cancer risk halves within 5 years",
        dailyRequirement:
          "ZERO TOLERANCE - even one cigarette daily significantly increases disease risk. 'Light smoking' is still extremely harmful.",
        actionSteps: [
          "Set a quit date within 2 weeks",
          "Remove all tobacco products from environment",
          "Consider nicotine replacement therapy",
          "Identify and avoid smoking triggers",
          "Replace smoking habits with healthy alternatives",
          "Seek professional support if needed",
          "Track smoke-free days for motivation",
        ],
        references: ["CDC 2020", "Lancet 2018", "NEJM 2019"],
      })
    }

    if (dailyActivities.length > 0) {
      const avgConsistency = (exerciseConsistency + meditationConsistency) / 2
      if (avgConsistency < 0.9) {
        recommendations.push({
          id: "consistency-optimization",
          title: "Achieve 90%+ Daily Consistency",
          description: "Maintain core healthy habits 90% of days (6.3 out of 7 days weekly)",
          impact: "+1-2 years life expectancy through compound consistency effects",
          difficulty: "Hard",
          category: "Consistency",
          icon: Target,
          scientificBasis:
            "Consistency creates compound health benefits. 90% consistency provides 80% of maximum benefits, while 50% consistency provides only 20% of benefits.",
          mechanism:
            "Consistent habits create positive feedback loops, optimize circadian rhythms, and allow physiological adaptations to fully develop.",
          dosage: "90%+ consistency across all core habits (exercise, meditation, sleep, nutrition)",
          timeframe: "Habit formation takes 66 days on average, compound benefits accumulate over months to years",
          dailyRequirement:
            "DAILY COMMITMENT - consistency is the most important factor for longevity. Perfect days matter less than consistent days.",
          actionSteps: [
            "Track daily habits with simple yes/no checkboxes",
            "Focus on minimum effective dose on difficult days",
            "Plan for obstacles and have backup strategies",
            "Celebrate weekly consistency wins",
            "Review and adjust habits monthly",
            "Find accountability partner or group",
            "Prioritize consistency over perfection",
          ],
          references: ["European Journal of Social Psychology 2009", "Health Psychology 2019"],
        })
      }
    }

    return recommendations
  }

  const recommendations = generateDetailedRecommendations()
  const completionRate = recommendations.length > 0 ? (completedTasks.length / recommendations.length) * 100 : 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sleep":
        return "text-blue-600"
      case "Nutrition":
        return "text-green-600"
      case "Exercise":
        return "text-orange-600"
      case "Stress":
        return "text-purple-600"
      case "Lifestyle":
        return "text-red-600"
      case "Consistency":
        return "text-indigo-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Science-Based Action Plan
            </div>
            <Badge variant="outline">
              {completedTasks.length}/{recommendations.length} implemented
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Implementation Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Critical Understanding</h4>
              <p className="text-sm text-yellow-700">
                These recommendations require DAILY consistency. Sporadic implementation provides minimal benefit. Each
                habit must become a non-negotiable part of your daily routine to achieve the stated longevity benefits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations */}
      <div className="space-y-6">
        {recommendations.map((rec) => {
          const isCompleted = completedTasks.includes(rec.id)
          const IconComponent = rec.icon

          return (
            <Card key={rec.id} className={`transition-all ${isCompleted ? "bg-green-50 border-green-200" : ""}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-lg ${getCategoryColor(rec.category)} bg-opacity-10`}>
                      <IconComponent className={`w-6 h-6 ${getCategoryColor(rec.category)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-lg font-semibold ${isCompleted ? "line-through text-gray-500" : ""}`}>
                          {rec.title}
                        </h3>
                        <Badge className={getDifficultyColor(rec.difficulty)}>{rec.difficulty}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600 font-medium">
                          <Star className="w-4 h-4 inline mr-1" />
                          {rec.impact}
                        </span>
                        <Badge variant="outline">{rec.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ScientificExplanation
                      title={rec.title}
                      content={rec.scientificBasis}
                      mechanism={rec.mechanism}
                      dosage={rec.dosage}
                      timeframe={rec.timeframe}
                      references={rec.references}
                    />
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTask(rec.id)}
                      className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Implemented
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 mr-1" />
                          Start Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-6">
                {/* Daily Requirement Emphasis */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">🎯 Daily Requirement</h4>
                  <p className="text-sm text-red-800 font-medium">{rec.dailyRequirement}</p>
                </div>

                {/* Scientific Evidence */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🧬 Scientific Mechanism</h4>
                  <p className="text-sm text-blue-800 mb-3">{rec.mechanism}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-900">Optimal Dosage:</span>
                      <p className="text-blue-800">{rec.dosage}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">Expected Timeline:</span>
                      <p className="text-blue-800">{rec.timeframe}</p>
                    </div>
                  </div>
                </div>

                {/* Action Steps */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">📋 Implementation Steps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rec.actionSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm p-2 bg-gray-50 rounded">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">📚 Scientific References</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.references.map((ref, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ref}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Outstanding Work!</h3>
            <p className="text-gray-600">
              You're already following optimal health practices with excellent consistency. Continue maintaining these
              habits for maximum longevity benefits.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Implementation Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Implementation Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Priority Order</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </span>
                  <span>Eliminate harmful habits (smoking, excessive alcohol)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </span>
                  <span>Establish consistent sleep schedule</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </span>
                  <span>Implement daily movement and exercise</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    4
                  </span>
                  <span>Optimize nutrition and stress management</span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Success Principles</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Start with ONE habit at a time</li>
                <li>• Focus on consistency over perfection</li>
                <li>• Track daily progress for accountability</li>
                <li>• Plan for obstacles and setbacks</li>
                <li>• Celebrate small wins weekly</li>
                <li>• Review and adjust monthly</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">💡 Remember</h4>
            <p className="text-sm text-green-700">
              The compound effect of daily consistency is more powerful than perfect execution. A 1% daily improvement
              compounds to 37x better results over a year. Focus on showing up every day, even when motivation is low.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
