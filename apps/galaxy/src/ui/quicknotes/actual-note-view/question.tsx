'use client'

import { Strong } from '@radix-ui/themes'
import { BlockContainer, LabelAndValue } from './shared'
import { useStore } from '@/ui/questionnaires/store'
import { QuickNoteHistory } from '@/types'
import { format } from 'date-fns'
import { BLOCK_OPTIONS } from '@/ui/questionnaires/questionnaires-widget/constants'

const Question = () => {
  const { addedToNotes, histories } = useStore((state) => ({
    histories: state.histories,
    addedToNotes: state.addedToNotes
  }))

  const groupedHistories: Record<string, QuickNoteHistory[]> = {}
  for (const sectionName in histories) {
    groupedHistories[sectionName] = histories[sectionName]
  }

  return (
    <BlockContainer heading="Questionnaires">
      {Object.entries(groupedHistories).map(([sectionName, entries]) => {
        const addedTonNotesDates = addedToNotes[sectionName] || []
      
        const filteredEntries = entries.filter((entry) =>
          addedTonNotesDates.includes(entry.createdOn)
        )

        return filteredEntries.length > 0 && (
          <BlockContainer heading={getLabelBySectionName(sectionName) || sectionName} key={sectionName} separator={false}>
            {filteredEntries.map((entry) => (
              <HistoryDetail entry={entry} key={entry.createdOn} />
            ))}
          </BlockContainer>
        )
      })}
    </BlockContainer>
  )
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
          Completed on {format(new Date(entry.createdOn), 'MM/dd/yyyy HH:mm')} by <Strong>{entry.createdByRole}</Strong>
        </>
      }
    />
  )
}

export { Question }