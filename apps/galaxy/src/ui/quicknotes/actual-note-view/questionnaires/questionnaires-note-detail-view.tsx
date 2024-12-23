'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteHistory } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
import { NoteDetailProps } from '../types'
import { transformAddToNotesData } from './data'
import { Questionnaires } from './questionnaires-view'

const QuestionnairesNoteDetailView = ({ groupedData }: NoteDetailProps) => {
  const addedToNotes = transformAddToNotesData(groupedData) || {}

  const patientId = useParams().id as string
  const { showNoteViewValue, histories, initializeNotesQuesionnaires } =
    useStore((state) => ({
      showNoteViewValue: state.showNoteViewValue,
      histories: state.histories,
      initializeNotesQuesionnaires: state.initializeNotesQuesionnaires,
    }))

  useEffect(() => {
    if (addedToNotes) initializeNotesQuesionnaires(patientId, addedToNotes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupedHistories: Record<string, QuickNoteHistory[]> = {}
  for (const sectionName in histories) {
    groupedHistories[sectionName] = histories[sectionName]
  }
  if (!addedToNotes) return null

  return (
    <Questionnaires
      histories={groupedHistories}
      showNoteViewValue={showNoteViewValue}
      addedToNotes={addedToNotes}
    />
  )
}

export { QuestionnairesNoteDetailView }
