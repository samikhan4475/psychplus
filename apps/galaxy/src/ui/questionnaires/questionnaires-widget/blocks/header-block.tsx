import React from 'react'
import { useParams } from 'next/navigation'
import { Checkbox, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { BLOCK_TITLE } from '../constants'

const HeaderBlock = () => {
  const patientId = useParams().id as string
  const { showNoteViewValue, updateShowNoteView, addedToNotes } = useStore(
    (state) => ({
      showNoteViewValue: state.showNoteViewValue,
      updateShowNoteView: state.updateShowNoteView,
      addedToNotes: state.addedToNotes,
    }),
  )

  const hasScored = Object.keys(addedToNotes).some(
    (key) => key !== 'ShowNoteView',
  )

  const hasCheckBoxState = Object.keys(addedToNotes).some(
    (key) => key === 'ShowNoteView',
  )

  const ischeckBoxDisabled = hasCheckBoxState ? false : hasScored

  return (
    <>
      <Checkbox
        checked={hasCheckBoxState ? showNoteViewValue === 'show' : hasScored}
        onCheckedChange={(checked) => updateShowNoteView(!!checked, patientId)}
        highContrast
        className={cn(
          ischeckBoxDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
        disabled={ischeckBoxDisabled}
      />
      <Text size="3" weight="medium">
        {BLOCK_TITLE}
      </Text>
    </>
  )
}

export { HeaderBlock }
