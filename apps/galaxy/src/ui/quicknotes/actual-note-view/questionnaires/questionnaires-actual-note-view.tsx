'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteHistory } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
import { Questionnaires } from './questionnaires-view'

const QuestionnairesActualnoteView = () => {
  const patientId = useParams().id as string
  const {
    showNoteViewValue,
    addedToNotes,
    histories,
    initializeQuestionnaires,
  } = useStore((state) => ({
    showNoteViewValue: state.showNoteViewValue,
    histories: state.histories,
    addedToNotes: state.addedToNotes,
    initializeQuestionnaires: state.initializeQuestionnaires,
  }))

  useEffect(() => {
    initializeQuestionnaires(patientId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
