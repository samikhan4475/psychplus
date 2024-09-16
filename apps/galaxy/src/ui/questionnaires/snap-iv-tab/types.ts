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
}

export type {
  ScoreInterpretationRange,
  QuestionnairesSnapIvData,
  QuestionnairesFormSnapIvProps,
}
