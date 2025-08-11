import { SelectOptionType } from "@/types"

type VadprsScoreType = { [key: string]: number }
interface QuestionnairesVadprsData {
  question: string
  value: number
  id: string
}

interface QuestionnairesFormVadprsData {
  id: string
  value: number
  question: string
}

interface QuestionnairesFormVadprsProps {
  labels?: string[]
  totalScore: VadprsScoreType
  disabled?: boolean
  data?: QuestionnairesFormVadprsData[]
  label?: string
  options: SelectOptionType[]
}

export type {
  QuestionnairesFormVadprsProps,
  QuestionnairesVadprsData,
  VadprsScoreType,
}

