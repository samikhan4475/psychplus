import { NO_SHOW_QUESTIONS } from './constants'
import { NoShowFormData } from './ns-popup/types'

export const getNoShowAnswerLabel = (field: string, value: string): string => {
  const question = NO_SHOW_QUESTIONS.find((q) => q.field === field)
  const option = question?.options.find((opt) => opt.value === value)
  return option?.label || value
}

export const getQuestionLabel = (sectionItem: string) => {
  if (sectionItem === 'comments') {
    return 'Comments'
  }
  const question = NO_SHOW_QUESTIONS.find((q) => q.field === sectionItem)
  return question ? question.question : sectionItem
}

export const buildEncounterDetailsFromForm = (
  sanitizedData: NoShowFormData,
) => {
  return Object.entries(sanitizedData).map(([key, value]) => ({
    sectionName: 'NoShowPopUp',
    sectionItem: key,
    sectionItemValue: value,
  }))
}
