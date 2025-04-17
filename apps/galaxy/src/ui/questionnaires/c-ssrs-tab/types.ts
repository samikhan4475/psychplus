interface QuestionnairesCssrsData {
  question: string
  value: number
  id: string
  options?: { label: string; value: string }[]
}

interface QuestionnairesFormCssrsProps {
  labels?: string[]
  totalScore: { [key: string]: number }
  disabled?: boolean
}

export type { QuestionnairesCssrsData, QuestionnairesFormCssrsProps }
