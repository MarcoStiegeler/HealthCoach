"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ScientificExplanationProps {
  title: string
  content: string
  references?: string[]
  mechanism?: string
  dosage?: string
  timeframe?: string
}

export function ScientificExplanation({
  title,
  content,
  references = [],
  mechanism,
  dosage,
  timeframe,
}: ScientificExplanationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-auto">
          <Info className="w-4 h-4 text-blue-600 hover:text-blue-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Main Content */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-800 leading-relaxed">{content}</p>
          </div>

          {/* Mechanism */}
          {mechanism && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🔬 How It Works</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{mechanism}</p>
            </div>
          )}

          {/* Dosage/Frequency */}
          {dosage && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📊 Optimal Dosage</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{dosage}</p>
            </div>
          )}

          {/* Timeframe */}
          {timeframe && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">⏱️ Expected Timeframe</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{timeframe}</p>
            </div>
          )}

          {/* Scientific References */}
          {references.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📚 Scientific References</h4>
              <div className="space-y-2">
                {references.map((ref, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {ref}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">References are from peer-reviewed journals and meta-analyses</p>
            </div>
          )}

          {/* Important Note */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> This information is for educational purposes only and should not replace
              professional medical advice. Consult with healthcare providers before making significant lifestyle
              changes.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
