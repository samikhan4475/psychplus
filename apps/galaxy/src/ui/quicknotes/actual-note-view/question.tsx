'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Strong } from '@radix-ui/themes'
import { format } from 'date-fns'
import { QuickNoteHistory } from '@/types'
import { BLOCK_OPTIONS } from '@/ui/questionnaires/questionnaires-widget/constants'
import { useStore } from '@/ui/questionnaires/store'
import { BlockContainer, LabelAndValue } from './shared'

const Question = () => {
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
  }, [])

  const groupedHistories: Record<string, QuickNoteHistory[]> = {}
  for (const sectionName in histories) {
    groupedHistories[sectionName] = histories[sectionName]
  }

  return showNoteViewValue === 'show' ? (
    <BlockContainer heading="Questionnaires">
      {Object.entries(groupedHistories).map(([sectionName, entries]) => {
        const addedTonNotesDates = addedToNotes[sectionName] || []
        const filteredEntries = entries.filter((entry) =>
          addedTonNotesDates.includes(entry.createdOn),
        )

        return (
          filteredEntries.length > 0 && (
            <BlockContainer
              heading={getLabelBySectionName(sectionName) || sectionName}
              key={sectionName}
              separator={false}
            >
              {filteredEntries.map((entry) => (
                <HistoryDetail entry={entry} key={entry.createdOn} />
              ))}
            </BlockContainer>
          )
        )
      })}
    </BlockContainer>
  ) : null
}

const getLabelBySectionName = (sectionName: string): string | null => {
  const option = BLOCK_OPTIONS.find((opt) => opt.value === sectionName)
  return option ? option.label : null
}

const HistoryDetail = ({ entry }: { entry: QuickNoteHistory }) => {
  const totalScore = entry.data.reduce(
    (acc, item) => acc + Number(item.sectionItemValue),
    0,
  )

  return (
    <LabelAndValue
      label={`Score ${totalScore}:`}
      value={
        <>
          Completed on {format(new Date(entry.createdOn), 'MM/dd/yyyy HH:mm')}{' '}
          by <Strong>{entry.createdByRole}</Strong>
        </>
      }
    />
  )
}

export { Question }
