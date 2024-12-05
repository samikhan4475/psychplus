import React from 'react'
import { useParams } from 'next/navigation'
import { Checkbox, Text } from '@radix-ui/themes'
import { useStore } from '../../store'
import { BLOCK_TITLE } from '../constants'

const HeaderBlock = () => {
  const patientId = useParams().id as string
  const { showNoteViewValue, updateShowNoteView } = useStore((state) => ({
    showNoteViewValue: state.showNoteViewValue,
    updateShowNoteView: state.updateShowNoteView,
  }))

  return (
    <>
      <Checkbox
        checked={showNoteViewValue === 'show'}
        onCheckedChange={(checked) => updateShowNoteView(!!checked, patientId)}
        highContrast
        className="cursor-pointer"
      />
      <Text size="3" weight="medium">
        {BLOCK_TITLE}
      </Text>
    </>
  )
}

export { HeaderBlock }
