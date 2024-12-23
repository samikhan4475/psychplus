'use client'

import { Strong } from '@radix-ui/themes'
import { format } from 'date-fns'
import { QuickNoteHistory } from '@/types'
import { BLOCK_OPTIONS } from '@/ui/questionnaires/questionnaires-widget/constants'
import { BlockContainer, LabelAndValue } from '../shared'

const Questionnaires = ({
  histories,
  showNoteViewValue,
  addedToNotes,
}: {
  histories: Record<string, QuickNoteHistory[]>
  showNoteViewValue: string | null
  addedToNotes: Record<string, string[] | string>
}) => {
  const hasScored = Object.keys(addedToNotes).some(
    (key) => key !== 'ShowNoteView',
  )

  const hasCheckBoxState = Object.keys(addedToNotes).some(
    (key) => key === 'ShowNoteView',
  )

  const actualNoteViewVisibility = hasCheckBoxState
    ? showNoteViewValue === 'show'
    : hasScored

  return actualNoteViewVisibility ? (
    <BlockContainer heading="Questionnaires">
      {Object.entries(histories).map(([sectionName, entries]) => {
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

export { Questionnaires }
