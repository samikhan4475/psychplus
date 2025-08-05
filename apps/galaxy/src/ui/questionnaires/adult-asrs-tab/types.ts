interface ScoreInterpretationRange {
  label?: string
  color: string
  min: number
  max: number
  rangeTitle?: string
}

interface QuestionnairesPsc17Data {
  question: string
  value: number
  id: string
}

interface QuestionnairesFormAdultAsrsProps {
  labels?: string[]
  totalScore: { [key: string]: number }
  disabled?: boolean
}

export type {
  ScoreInterpretationRange,
  QuestionnairesPsc17Data,
  QuestionnairesFormAdultAsrsProps,
}
