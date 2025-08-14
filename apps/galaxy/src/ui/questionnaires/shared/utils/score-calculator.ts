import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QUESTIONS } from '../../des-ii-tab/constants'
import { parseSectionItemValue } from '../../utils'

export const calculateVadprsScore = (data: QuickNoteSectionItem[]): number => {
  return data
    .filter((item: QuickNoteSectionItem) =>
      item.sectionItem?.match(/^VadprsQuestionsQ\d+$/),
    )
    .reduce((acc: number, curr: QuickNoteSectionItem) => {
      return acc + parseSectionItemValue(curr.sectionItemValue)
    }, 0)
}

export const calculateCssrsScore = (data: QuickNoteSectionItem[]): number => {
  return Math.max(
    ...data.map((item: QuickNoteSectionItem) => Number(item.sectionItemValue)),
  )
}

export const calculateDesiiScore = (score: number) => {
  const number = score / QUESTIONS.length
  return number % 1 >= 0.5 ? Math.ceil(number) : Math.floor(number)
}

export const calculateDefaultScore = (data: QuickNoteSectionItem[]): number => {
  return data.reduce((acc, item) => {
    return acc + parseSectionItemValue(item.sectionItemValue)
  }, 0)
}

export const calculateTotalScore = (
  data: QuickNoteSectionItem[],
  sectionName: QuickNoteSectionName,
): number => {
  const defaultScore = calculateDefaultScore(data)
  switch (sectionName) {
    case QuickNoteSectionName.QuickNoteSectionCssrs:
      return calculateCssrsScore(data)

    case QuickNoteSectionName.QuickNoteSectionVadprs:
      return calculateVadprsScore(data)

    case QuickNoteSectionName.QuickNoteSectionDesii:
      return calculateDesiiScore(defaultScore)

    default:
      return defaultScore
  }
}
