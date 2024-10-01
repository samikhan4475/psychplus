import z from 'zod'
import { mocaSchema } from './moca-schema'

interface ScoreInterpretationRange {
  label: string
  color: string
  min: number
  max: number
}

interface Options {
  label: string
  value: string
}

interface QuestionnairesMocaData {
  question: string
  value: number
  id: string
  boldPart?: string
  isGrid?: true
  options: Options[]
  description?: string
}

interface QuestionnairesFormMocaProps {
  labels?: string[]
  totalScore: { [key: string]: number }
}

export type FormValues = z.infer<typeof mocaSchema>

export type scoreType = Record<string, number>

export type {
  ScoreInterpretationRange,
  QuestionnairesMocaData,
  QuestionnairesFormMocaProps,
}
