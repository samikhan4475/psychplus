import z from 'zod'
import { SelectOptionType } from '@/types'

interface ScoreInterpretationRange {
  label: string
  color: string
  min: number
  max: number
}

interface QuestionnairesMocaData {
  question: string
  value: number
  id: string
  boldPart?: string
  isGrid?: true
  options: SelectOptionType[]
  description?: string
}

interface QuestionnairesFormMocaProps {
  labels?: string
  totalScore: { [key: string]: number }
  disabled?: boolean
}

export type ScoreType = Record<string, number>

export type {
  ScoreInterpretationRange,
  QuestionnairesMocaData,
  QuestionnairesFormMocaProps,
}
