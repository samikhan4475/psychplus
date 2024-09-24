interface ScoreInterpretationRange {
  label: string
  color: string
  min: number
  max: number
}

interface QuestionnairesAimsData {
  question: string
  value: number
  id: string
  boldPart?: string
}

interface QuestionnairesFormAimsProps {
  labels?: string[]
  totalScore: { [key: string]: number }
}

export type {
  ScoreInterpretationRange,
  QuestionnairesAimsData,
  QuestionnairesFormAimsProps,
}
