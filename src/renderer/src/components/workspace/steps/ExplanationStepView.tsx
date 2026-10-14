import React from 'react'
import { BookOpen, ChevronRight } from 'lucide-react'
import { ExplanationStep } from '../../../types/curriculum'
import { MarkdownRenderer } from '../../common/MarkdownRenderer'

interface ExplanationStepViewProps {
  step: ExplanationStep
  onContinue: () => void
}

export const ExplanationStepView: React.FC<ExplanationStepViewProps> = ({ step, onContinue }) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Step Header */}
      <div className="rounded-2xl border border-cyan-500/30 bg-linear-to-r from-cyan-950/30 to-[#1e293b] p-5 shadow-lg shadow-black/20">
        <div className="flex items-center space-x-2.5 text-cyan-400 mb-1">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">Concept Explanation</span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">{step.title}</h2>
      </div>

      {/* Main Markdown Content */}
      <div className="rounded-2xl border border-coddy-border bg-[#1e293b]/50 p-6 space-y-4 text-sm leading-relaxed text-slate-300">
        <MarkdownRenderer content={step.content} />
      </div>

      {/* Explicit Continue Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onContinue}
          className="flex items-center space-x-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-cyan-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Understood! Continue</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
