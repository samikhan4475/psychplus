import z from 'zod'
import { QuickNoteSectionItem, SelectOptionType } from '@/types'
import { tograBlueSchema } from './schema'

interface ScoreInterpretationRange {
  label: string
  color: string
  min: number
  max: number
}

interface QuestionnairesData {
  question: string
  value: number
  id: string
  boldPart?: string
  isGrid?: true
  options: SelectOptionType[]
  description?: string
}

interface QuestionnairesFormProps {
  labels?: string
  totalScore?: { [key: string]: number }
  disabled?: boolean
  patientId: string
  fillOutView?: boolean
  data?: QuickNoteSectionItem[]
  submittedDate?: string | null
  startedAt?: string | null
}

interface ScoreItem {
  name: string
  value: string
}

export type FormValues = z.infer<typeof tograBlueSchema>

export type ScoreType = Record<string, number>

export type {
  ScoreInterpretationRange,
  QuestionnairesData,
  QuestionnairesFormProps,
  ScoreItem,
}
