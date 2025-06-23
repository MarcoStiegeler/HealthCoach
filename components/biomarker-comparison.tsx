"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Heart,
  Brain,
  Shield,
  Zap,
  Activity,
  Droplets,
  Thermometer,
  Eye,
  CheckCircle,
} from "lucide-react"
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

interface Biomarker {
  name: string
  category: string
  userValue: number
  ageGroupAverage: number
  optimalRange: [number, number]
  unit: string
  description: string
  icon: any
  higherIsBetter: boolean
  scientificBasis: string
  improvementTips: string[]
  references: string[]
}

interface BiomarkerComparisonProps {
  userProfile: UserProfile
}

export function BiomarkerComparison({ userProfile }: BiomarkerComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState("cardiovascular")

  // Calculate estimated biomarkers based on user profile
  const calculateBiomarkers = (): Biomarker[] => {
    const age = userProfile.age
    const bmi = userProfile.weight / Math.pow(userProfile.height / 100, 2)

    return [
      // Cardiovascular
      {
        name: "Resting Heart Rate",
        category: "cardiovascular",
        userValue: Math.max(
          50,
          70 - userProfile.exerciseMinutes * 0.3 + userProfile.stressLevel * 2 + userProfile.cigarettesPerDay * 1.5,
        ),
        ageGroupAverage: age < 30 ? 72 : age < 50 ? 76 : 80,
        optimalRange: [50, 70],
        unit: "bpm",
        description: "Heart rate at rest, indicator of cardiovascular fitness",
        icon: Heart,
        higherIsBetter: false,
        scientificBasis:
          "Lower resting heart rate indicates better cardiovascular efficiency and is associated with increased longevity. Each 10 bpm reduction correlates with 16% lower mortality risk.",
        improvementTips: [
          "Regular aerobic exercise (30+ minutes daily)",
          "Stress reduction through meditation",
          "Adequate sleep (7-8 hours)",
          "Quit smoking if applicable",
        ],
        references: ["European Heart Journal 2013", "JAMA Cardiology 2018"],
      },
      {
        name: "Blood Pressure (Systolic)",
        category: "cardiovascular",
        userValue: Math.max(
          100,
          120 +
            userProfile.stressLevel * 3 +
            userProfile.alcoholUnitsPerWeek * 1.5 +
            (bmi > 25 ? 10 : 0) -
            userProfile.exerciseMinutes * 0.2,
        ),
        ageGroupAverage: age < 30 ? 115 : age < 50 ? 125 : 135,
        optimalRange: [90, 120],
        unit: "mmHg",
        description: "Pressure in arteries when heart beats",
        icon: Activity,
        higherIsBetter: false,
        scientificBasis:
          "Optimal blood pressure reduces cardiovascular disease risk by 40% and stroke risk by 50%. Each 10 mmHg reduction extends life expectancy by 1-2 years.",
        improvementTips: [
          "Reduce sodium intake (<2300mg daily)",
          "Increase potassium-rich foods",
          "Regular exercise and weight management",
          "Limit alcohol consumption",
        ],
        references: ["Lancet 2016", "New England Journal of Medicine 2019"],
      },
      {
        name: "VO2 Max",
        category: "cardiovascular",
        userValue: Math.max(
          20,
          (age < 30 ? 45 : age < 50 ? 35 : 25) + userProfile.exerciseMinutes * 0.4 - userProfile.cigarettesPerDay * 2,
        ),
        ageGroupAverage: age < 30 ? 40 : age < 50 ? 30 : 22,
        optimalRange: age < 30 ? [45, 60] : age < 50 ? [35, 50] : [25, 40],
        unit: "ml/kg/min",
        description: "Maximum oxygen uptake during exercise",
        icon: Zap,
        higherIsBetter: true,
        scientificBasis:
          "VO2 Max is the strongest predictor of longevity. Each 1 ml/kg/min increase reduces all-cause mortality by 9-15%. Elite levels can add 5-8 years to lifespan.",
        improvementTips: [
          "High-intensity interval training (HIIT)",
          "Progressive endurance training",
          "Strength training 2-3x per week",
          "Maintain consistent exercise routine",
        ],
        references: ["Mayo Clinic Proceedings 2018", "Circulation 2020"],
      },

      // Metabolic
      {
        name: "Fasting Glucose",
        category: "metabolic",
        userValue: Math.max(
          70,
          85 + (userProfile.veggiePortions < 3 ? 10 : -5) + (bmi > 25 ? 8 : 0) + userProfile.stressLevel * 2,
        ),
        ageGroupAverage: age < 30 ? 88 : age < 50 ? 92 : 98,
        optimalRange: [70, 85],
        unit: "mg/dL",
        description: "Blood sugar level after 8+ hours of fasting",
        icon: Droplets,
        higherIsBetter: false,
        scientificBasis:
          "Optimal glucose levels reduce diabetes risk by 70% and cardiovascular disease by 40%. Each 10 mg/dL reduction below 100 extends healthy lifespan by 1-2 years.",
        improvementTips: [
          "Increase fiber intake (25-35g daily)",
          "Regular physical activity",
          "Maintain healthy weight",
          "Limit refined carbohydrates",
        ],
        references: ["Diabetes Care 2019", "Nature Medicine 2018"],
      },
      {
        name: "HbA1c",
        category: "metabolic",
        userValue: Math.max(4.5, 5.2 + (userProfile.veggiePortions < 3 ? 0.3 : -0.2) + (bmi > 25 ? 0.4 : 0)),
        ageGroupAverage: age < 30 ? 5.3 : age < 50 ? 5.5 : 5.8,
        optimalRange: [4.5, 5.6],
        unit: "%",
        description: "Average blood sugar over 2-3 months",
        icon: Thermometer,
        higherIsBetter: false,
        scientificBasis:
          "HbA1c below 5.7% reduces diabetes risk by 80% and cardiovascular complications by 50%. Optimal levels are associated with 3-5 years increased longevity.",
        improvementTips: [
          "Mediterranean-style diet",
          "Regular meal timing",
          "Weight management",
          "Stress reduction techniques",
        ],
        references: ["NEJM 2018", "Diabetologia 2020"],
      },

      // Inflammatory
      {
        name: "C-Reactive Protein (CRP)",
        category: "inflammatory",
        userValue: Math.max(
          0.5,
          2.0 -
            userProfile.exerciseMinutes * 0.02 -
            userProfile.veggiePortions * 0.15 +
            userProfile.stressLevel * 0.3 +
            userProfile.cigarettesPerDay * 0.4,
        ),
        ageGroupAverage: age < 30 ? 1.8 : age < 50 ? 2.5 : 3.2,
        optimalRange: [0, 1.0],
        unit: "mg/L",
        description: "Marker of systemic inflammation",
        icon: Shield,
        higherIsBetter: false,
        scientificBasis:
          "CRP below 1.0 mg/L reduces cardiovascular disease risk by 50% and all-cause mortality by 25%. Low inflammation is key to healthy aging and longevity.",
        improvementTips: [
          "Anti-inflammatory diet (omega-3, antioxidants)",
          "Regular exercise",
          "Stress management",
          "Adequate sleep quality",
        ],
        references: ["Circulation 2017", "Nature Reviews Immunology 2019"],
      },
      {
        name: "Interleukin-6 (IL-6)",
        category: "inflammatory",
        userValue: Math.max(0.5, 2.5 - userProfile.exerciseMinutes * 0.03 + userProfile.stressLevel * 0.4 + age * 0.02),
        ageGroupAverage: age < 30 ? 1.8 : age < 50 ? 2.8 : 4.2,
        optimalRange: [0, 2.0],
        unit: "pg/mL",
        description: "Pro-inflammatory cytokine marker",
        icon: Shield,
        higherIsBetter: false,
        scientificBasis:
          "Lower IL-6 levels are associated with successful aging and reduced frailty. Each 1 pg/mL reduction correlates with 15% lower mortality risk in older adults.",
        improvementTips: [
          "Regular physical activity",
          "Mediterranean diet pattern",
          "Quality sleep (7-8 hours)",
          "Social connections and stress reduction",
        ],
        references: ["Aging Cell 2018", "Journal of Gerontology 2020"],
      },

      // Cognitive
      {
        name: "Processing Speed",
        category: "cognitive",
        userValue: Math.max(
          60,
          100 - (age - 25) * 0.8 + userProfile.exerciseMinutes * 0.3 + (userProfile.sleepHours >= 7 ? 5 : -5),
        ),
        ageGroupAverage: Math.max(70, 100 - (age - 25) * 1.2),
        optimalRange: [90, 110],
        unit: "score",
        description: "Speed of cognitive processing tasks",
        icon: Brain,
        higherIsBetter: true,
        scientificBasis:
          "Maintained processing speed indicates healthy brain aging. Regular exercise can improve cognitive processing by 20% and delay cognitive decline by 5-10 years.",
        improvementTips: [
          "Regular aerobic exercise",
          "Cognitive training and learning",
          "Quality sleep maintenance",
          "Social engagement",
        ],
        references: ["Nature Reviews Neuroscience 2018", "PNAS 2019"],
      },
      {
        name: "Working Memory",
        category: "cognitive",
        userValue: Math.max(
          70,
          100 - (age - 25) * 0.6 + (userProfile.sleepHours >= 7 ? 8 : -8) + (userProfile.stressLevel > 6 ? -10 : 5),
        ),
        ageGroupAverage: Math.max(75, 100 - (age - 25) * 1.0),
        optimalRange: [85, 115],
        unit: "score",
        description: "Ability to hold and manipulate information",
        icon: Brain,
        higherIsBetter: true,
        scientificBasis:
          "Working memory maintenance is crucial for independence in aging. Meditation and exercise can improve working memory by 15-25% and protect against age-related decline.",
        improvementTips: [
          "Meditation and mindfulness practice",
          "Regular physical exercise",
          "Challenging mental activities",
          "Stress management techniques",
        ],
        references: ["Psychological Science 2018", "Frontiers in Aging Neuroscience 2020"],
      },

      // Hormonal
      {
        name: "Cortisol (Morning)",
        category: "hormonal",
        userValue: Math.max(
          5,
          15 +
            userProfile.stressLevel * 2 -
            (userProfile.sleepHours >= 7 ? 3 : 0) +
            (userProfile.exerciseMinutes > 30 ? -2 : 2),
        ),
        ageGroupAverage: age < 30 ? 12 : age < 50 ? 15 : 18,
        optimalRange: [6, 18],
        unit: "μg/dL",
        description: "Primary stress hormone level in morning",
        icon: Thermometer,
        higherIsBetter: false,
        scientificBasis:
          "Optimal cortisol rhythm supports healthy aging. Chronic elevation accelerates cellular aging and increases disease risk by 40-60%.",
        improvementTips: [
          "Consistent sleep schedule",
          "Stress reduction techniques",
          "Regular exercise (not excessive)",
          "Mindfulness and meditation",
        ],
        references: ["Psychoneuroendocrinology 2017", "Aging Cell 2019"],
      },

      // Cellular
      {
        name: "Telomere Length",
        category: "cellular",
        userValue: Math.max(
          4000,
          6500 -
            age * 50 +
            userProfile.exerciseMinutes * 20 +
            userProfile.veggiePortions * 100 -
            userProfile.stressLevel * 150 -
            userProfile.cigarettesPerDay * 200,
        ),
        ageGroupAverage: Math.max(4500, 7000 - age * 60),
        optimalRange: [5500, 8000],
        unit: "bp",
        description: "Length of protective DNA caps",
        icon: Eye,
        higherIsBetter: true,
        scientificBasis:
          "Longer telomeres are associated with 3-5 years increased lifespan. Lifestyle factors can influence telomere length by 10-15%, equivalent to 5-10 years of biological aging.",
        improvementTips: [
          "Regular moderate exercise",
          "Mediterranean diet with antioxidants",
          "Stress management and meditation",
          "Avoid smoking and excessive alcohol",
        ],
        references: ["Nature 2015", "Lancet Oncology 2017"],
      },
    ]
  }

  const biomarkers = calculateBiomarkers()
  const categories = ["cardiovascular", "metabolic", "inflammatory", "cognitive", "hormonal", "cellular"]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cardiovascular":
        return Heart
      case "metabolic":
        return Droplets
      case "inflammatory":
        return Shield
      case "cognitive":
        return Brain
      case "hormonal":
        return Thermometer
      case "cellular":
        return Eye
      default:
        return BarChart3
    }
  }

  const getComparisonStatus = (biomarker: Biomarker) => {
    const { userValue, ageGroupAverage, optimalRange, higherIsBetter } = biomarker

    const isInOptimalRange = userValue >= optimalRange[0] && userValue <= optimalRange[1]
    const isBetterThanAverage = higherIsBetter ? userValue > ageGroupAverage : userValue < ageGroupAverage

    if (isInOptimalRange) return { status: "optimal", color: "text-green-600", bg: "bg-green-50" }
    if (isBetterThanAverage) return { status: "good", color: "text-blue-600", bg: "bg-blue-50" }
    return { status: "needs-improvement", color: "text-red-600", bg: "bg-red-50" }
  }

  const calculatePercentile = (biomarker: Biomarker) => {
    const { userValue, ageGroupAverage, higherIsBetter } = biomarker
    const difference = higherIsBetter
      ? ((userValue - ageGroupAverage) / ageGroupAverage) * 100
      : ((ageGroupAverage - userValue) / ageGroupAverage) * 100

    return Math.max(0, Math.min(100, 50 + difference))
  }

  return (
    <div className="space-y-6">
      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Biomarker Analysis - Age Group Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const categoryBiomarkers = biomarkers.filter((b) => b.category === category)
              const optimalCount = categoryBiomarkers.filter((b) => {
                const { userValue, optimalRange } = b
                return userValue >= optimalRange[0] && userValue <= optimalRange[1]
              }).length

              const IconComponent = getCategoryIcon(category)

              return (
                <Card
                  key={category}
                  className={`cursor-pointer transition-all ${selectedCategory === category ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="pt-4 text-center">
                    <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium text-sm capitalize">{category}</h3>
                    <Badge variant="outline" className="mt-1">
                      {optimalCount}/{categoryBiomarkers.length} optimal
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Biomarker Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="capitalize flex items-center">
            {React.createElement(getCategoryIcon(selectedCategory), { className: "w-5 h-5 mr-2" })}
            {selectedCategory} Biomarkers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {biomarkers
              .filter((b) => b.category === selectedCategory)
              .map((biomarker, index) => {
                const comparison = getComparisonStatus(biomarker)
                const percentile = calculatePercentile(biomarker)
                const IconComponent = biomarker.icon

                return (
                  <Card
                    key={index}
                    className={`${comparison.bg} border-l-4 ${comparison.color.replace("text-", "border-")}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <IconComponent className={`w-6 h-6 ${comparison.color}`} />
                          <div>
                            <h3 className="font-semibold text-lg">{biomarker.name}</h3>
                            <p className="text-sm text-gray-600">{biomarker.description}</p>
                          </div>
                        </div>
                        <ScientificExplanation
                          title={`${biomarker.name} - Scientific Evidence`}
                          content={biomarker.scientificBasis}
                          references={biomarker.references}
                          dosage={biomarker.improvementTips.join(", ")}
                        />
                      </div>

                      {/* Values Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className={`text-2xl font-bold ${comparison.color}`}>
                            {biomarker.userValue.toFixed(1)} {biomarker.unit}
                          </div>
                          <p className="text-sm text-gray-600">Your Value</p>
                        </div>

                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-600">
                            {biomarker.ageGroupAverage.toFixed(1)} {biomarker.unit}
                          </div>
                          <p className="text-sm text-gray-600">Age Group Average</p>
                        </div>

                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {biomarker.optimalRange[0]}-{biomarker.optimalRange[1]} {biomarker.unit}
                          </div>
                          <p className="text-sm text-gray-600">Optimal Range</p>
                        </div>
                      </div>

                      {/* Percentile Ranking */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Age Group Percentile</span>
                          <Badge variant="outline">{Math.round(percentile)}th percentile</Badge>
                        </div>
                        <Progress value={percentile} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0th</span>
                          <span>50th (Average)</span>
                          <span>100th</span>
                        </div>
                      </div>

                      {/* Status and Trend */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {comparison.status === "optimal" ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : comparison.status === "good" ? (
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`font-medium ${comparison.color}`}>
                            {comparison.status === "optimal"
                              ? "Optimal Range"
                              : comparison.status === "good"
                                ? "Above Average"
                                : "Needs Improvement"}
                          </span>
                        </div>

                        <Badge variant={comparison.status === "optimal" ? "default" : "secondary"}>
                          {biomarker.higherIsBetter
                            ? biomarker.userValue > biomarker.ageGroupAverage
                              ? "↑"
                              : "↓"
                            : biomarker.userValue < biomarker.ageGroupAverage
                              ? "↑"
                              : "↓"}{" "}
                          vs peers
                        </Badge>
                      </div>

                      {/* Improvement Tips */}
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">💡 Improvement Strategies</h4>
                        <ul className="space-y-1">
                          {biomarker.improvementTips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">🎯 Your Strengths</h4>
              <div className="space-y-2">
                {biomarkers
                  .filter((b) => {
                    const { userValue, optimalRange } = b
                    return userValue >= optimalRange[0] && userValue <= optimalRange[1]
                  })
                  .slice(0, 3)
                  .map((biomarker, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{biomarker.name} is in optimal range</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 mb-3">🎯 Priority Areas</h4>
              <div className="space-y-2">
                {biomarkers
                  .filter((b) => {
                    const { userValue, optimalRange } = b
                    return userValue < optimalRange[0] || userValue > optimalRange[1]
                  })
                  .slice(0, 3)
                  .map((biomarker, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span>{biomarker.name} needs attention</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">📊 Overall Biological Age Assessment</h4>
            <p className="text-sm text-blue-800">
              Based on your biomarker profile, your biological age appears to be approximately{" "}
              <strong>
                {Math.round(
                  userProfile.age +
                    biomarkers.filter((b) => {
                      const { userValue, optimalRange } = b
                      return userValue < optimalRange[0] || userValue > optimalRange[1]
                    }).length *
                      0.8 -
                    biomarkers.filter((b) => {
                      const { userValue, optimalRange } = b
                      return userValue >= optimalRange[0] && userValue <= optimalRange[1]
                    }).length *
                      0.5,
                )}
              </strong>{" "}
              years compared to your chronological age of {userProfile.age}. Consistent lifestyle improvements can
              reduce your biological age by 5-10 years over time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
