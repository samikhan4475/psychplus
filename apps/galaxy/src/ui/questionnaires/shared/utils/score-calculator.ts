import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { parseSectionItemValue } from '../../utils'

export const calculateVadprsScore = (data: QuickNoteSectionItem[]): number => {
  return data
    .filter((item: QuickNoteSectionItem) =>
      item.sectionItem?.match(/^VadprsQuestionsQ\d+$/)
    )
    .reduce((acc: number, curr: QuickNoteSectionItem) => {
      return acc + parseSectionItemValue(curr.sectionItemValue)
    }, 0)
}

export const calculateCssrsScore = (data: QuickNoteSectionItem[]): number => {
  return Math.max(
    ...data.map((item: QuickNoteSectionItem) =>
      Number(item.sectionItemValue),
    ),
  )
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
  switch (sectionName) {
    case QuickNoteSectionName.QuickNoteSectionCssrs:
      return calculateCssrsScore(data)
    
    case QuickNoteSectionName.QuickNoteSectionVadprs:
      return calculateVadprsScore(data)
    
    default:
      return calculateDefaultScore(data)
  }
} 