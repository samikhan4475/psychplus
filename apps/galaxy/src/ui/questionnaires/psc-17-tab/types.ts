interface ScoreInterpretationRange {
  label?: string
  color: string
  min: number
  max: number
}

interface QuestionnairesPsc17Data {
  question: string
  value: number
  id: string
}

interface QuestionnairesFormPsc17Props {
  labels?: string[]
  totalScore: { [key: string]: number }
  disabled?: boolean
}

export type {
  ScoreInterpretationRange,
  QuestionnairesPsc17Data,
  QuestionnairesFormPsc17Props,
}
