'use client'

import { Flex, Heading } from '@radix-ui/themes'
import { QuickNotesPrintButton } from '../quicknotes-print-button'
import { CloseButton } from './close-button'

const NoteViewHeader = () => {
  return (
    <Flex
      justify="between"
      className="border-pp-grey bg-white z-10 border-b py-2.5"
      align="center"
      position="sticky"
      top="0"
      px="2"
    >
      <Flex gap="2" align="center">
        <Heading size="4" className="font-[590]">
          Actual Note View
        </Heading>
        <QuickNotesPrintButton id="actual-note-view" />
      </Flex>
      <CloseButton />
    </Flex>
  )
}

export { NoteViewHeader }
