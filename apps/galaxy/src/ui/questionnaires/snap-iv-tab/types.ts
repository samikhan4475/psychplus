interface ScoreInterpretationRange {
  label: string
  color: string
  min: number
  max: number
}

interface QuestionnairesSnapIvData {
  question: string
  value: number
  id: string
}

interface QuestionnairesFormSnapIvProps {
  labels?: string[]
  totalScore: { [key: string]: number }
  disabled?: boolean
}

export type {
  ScoreInterpretationRange,
  QuestionnairesSnapIvData,
  QuestionnairesFormSnapIvProps,
}
