import { QuickNoteHistory } from '@/types'

const transformAddToNotesData = (data: QuickNoteHistory[]) => {
  const result: { [key: string]: string[] } = {}
  data?.forEach((item) => {
    item.data?.forEach((dataItem) => {
      if (dataItem.sectionItemValue !== 'empty') {
        result[dataItem.sectionItem] = dataItem.sectionItemValue.split(',')
      }
    })
  })

  return result
}

const transformHistories = (data: QuickNoteHistory[]) => {
  const sections: Record<string, QuickNoteHistory[]> = {}

  if (Array.isArray(data)) {
    data?.forEach((item) => {
      if (!sections[item.sectionName]) {
        sections[item.sectionName] = []
      }
      sections[item.sectionName].push(item)
    })
  }
  return sections
}

export { transformAddToNotesData, transformHistories }
