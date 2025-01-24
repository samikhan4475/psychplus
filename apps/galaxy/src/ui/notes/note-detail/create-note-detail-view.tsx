'use client'

import { Box, Separator, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { FileViewCard } from '../create-note/file-view-card'
import { SecondaryNoteResults } from './secondary-note-results'

const CreateNoteDetailView = ({
  data,
  noteDocuments,
}: {
  data: QuickNoteSectionItem[]
  noteDocuments: QuickNoteSectionItem[]
}) => {
  if (!data) return null

  return (
    <>
      <SecondaryNoteResults />
      <Box className="flex max-w-[639px] flex-col justify-between rounded-1 px-3 py-[14px] outline-none [box-shadow:none]">
        <Text
          className="h-44 max-w-[639px] border-none outline-none focus:outline-none focus:ring-0"
          size="1"
        >
          {data[0]?.sectionItemValue}
        </Text>
        <Box className="scrollbar-thin flex gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap">
          {noteDocuments?.map((document, index: number) => (
            <FileViewCard
              document={document}
              key={`${document.sectionItemValue}+${index}`}
            />
          ))}
        </Box>
      </Box>
      {<Separator orientation="horizontal" className="my-2 w-full" />}
    </>
  )
}
export { CreateNoteDetailView }
