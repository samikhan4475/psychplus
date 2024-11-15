import { QuickNoteHistory, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const QuestionnaireTabsList = [
  QuickNoteSectionName.QuickNoteSectionPhq9,
  QuickNoteSectionName.QuickNoteSectionGad7,
  QuickNoteSectionName.QuickNoteSectionSnapIV,
  QuickNoteSectionName.QuickNoteSectionDast10,
  QuickNoteSectionName.QuickNoteSectionAudit,
  QuickNoteSectionName.QuickNoteSectionHamD,
  QuickNoteSectionName.QuickNoteSectionYbcos,
  QuickNoteSectionName.QuickNoteSectionMoca,
  QuickNoteSectionName.QuickNoteSectionAims,
  QuickNoteSectionName.QuickNoteSectionPcl5,
]

const transformAddToNotesData = (
  data: QuickNoteHistory[],
  histories: Record<string, QuickNoteHistory[]>,
  patientId: string,
) => {
  const addedToNotes: { [key: string]: string[] } = {}
  data?.forEach((item) => {
    item.data?.forEach((dataItem) => {
      if (dataItem.sectionItemValue !== 'empty') {
        addedToNotes[dataItem.sectionItem] =
          dataItem.sectionItemValue.split(',')
      }
    })
  })

  const currentlyAddedToNotesKeys = Object.keys(addedToNotes)

  const tabsNotHavingAddToNotes = QuestionnaireTabsList.filter(
    (tab) => !currentlyAddedToNotesKeys.includes(tab),
  )

  const autoUpdateAddToNotes = [] as QuickNoteSectionItem[]

  tabsNotHavingAddToNotes.forEach((tab) => {
    if (histories[tab]) {
      const last48HoursHistories = histories[tab]?.filter((item) => {
        const createdOn = new Date(item.createdOn).getTime()
        const now = new Date().getTime()
        const diff = now - createdOn
        return diff <= 48 * 60 * 60 * 1000
      })

      const historiesToAdd = last48HoursHistories
        ?.map((item) => item.createdOn)
        .toString()
      addedToNotes[tab] = historiesToAdd.split(',')

      autoUpdateAddToNotes.push({
        pid: Number(patientId),
        sectionName: `${QuickNoteSectionName.AddToNoteQuestionnaire}-${tab}`,
        sectionItem: tab,
        sectionItemValue: historiesToAdd,
      })
    }
  })

  return { addedToNotes, autoUpdateAddToNotes }
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
