"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, BookOpen, Clock } from "lucide-react"
import { useState } from "react"

export function VideoIntegration() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)

  const bryanJohnsonVideo = {
    title: "Bryan Johnson's Blueprint Training",
    url: "https://youtu.be/sYyVi-H-ozI?si=fWh1FqGT5lEncrz7",
    embedUrl: "https://www.youtube.com/embed/sYyVi-H-ozI",
    duration: "45:30",
    description:
      "Learn from Bryan Johnson's comprehensive approach to slowing down aging through data-driven lifestyle optimization.",
    keyPoints: [
      "Data-driven approach to anti-aging",
      "Sleep optimization protocols",
      "Nutrition and supplementation strategies",
      "Exercise and recovery methods",
      "Biomarker tracking and analysis",
    ],
  }

  return (
    <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Play className="w-6 h-6 mr-2 text-indigo-600" />
            Featured Training: Bryan Johnson's Blueprint
          </div>
          <Badge className="bg-indigo-100 text-indigo-800">
            <Clock className="w-3 h-3 mr-1" />
            {bryanJohnsonVideo.duration}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{bryanJohnsonVideo.description}</p>

        {!isVideoExpanded ? (
          <div className="relative">
            <div
              className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setIsVideoExpanded(true)}
            >
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium">Click to Watch Training Video</p>
                <p className="text-sm opacity-80">Bryan Johnson's Blueprint Methodology</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <iframe
              src={bryanJohnsonVideo.embedUrl}
              title={bryanJohnsonVideo.title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Key Learning Points
            </h4>
            <ul className="space-y-2">
              {bryanJohnsonVideo.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">How This Applies to You</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Our app simplifies Bryan's complex protocols into actionable steps</p>
              <p>• We focus on evidence-based interventions that don't require expensive equipment</p>
              <p>• Your personalized recommendations are inspired by his data-driven approach</p>
              <p>• Track your progress using similar biomarkers and lifestyle factors</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <Button
            variant="default"
            onClick={() => setIsVideoExpanded(!isVideoExpanded)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isVideoExpanded ? "Minimize Video" : "Watch Full Video"}
          </Button>

          <Button variant="outline" asChild>
            <a href={bryanJohnsonVideo.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in YouTube
            </a>
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Note</h4>
          <p className="text-sm text-yellow-700">
            While Bryan Johnson's approach is groundbreaking, his extreme protocols (100+ supplements, extensive
            testing) are experimental and not suitable for everyone. Our app focuses on scientifically-validated
            interventions that are accessible and safe for general use.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
