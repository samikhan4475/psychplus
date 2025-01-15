'use client'

import { QuickNoteHistory } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
import { Questionnaires } from './questionnaires-view'

const QuestionnairesActualnoteView = () => {
  const { showNoteViewValue, addedToNotes, histories } = useStore((state) => ({
    showNoteViewValue: state.showNoteViewValue,
    addedToNotes: state.addedToNotes,
    histories: state.histories,
  }))
  const groupedHistories: Record<string, QuickNoteHistory[]> = {}
  for (const sectionName in histories) {
    groupedHistories[sectionName] = histories[sectionName]
  }

  return (
    <Questionnaires
      histories={groupedHistories}
      showNoteViewValue={showNoteViewValue}
      addedToNotes={addedToNotes}
    />
  )
}

export { QuestionnairesActualnoteView }
