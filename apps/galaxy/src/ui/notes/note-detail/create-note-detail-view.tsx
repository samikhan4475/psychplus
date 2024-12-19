'use client'

import { Box, Separator, TextArea } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { FileViewCard } from '../create-note/file-view-card'
import { useStore } from '../store'
import { SecondaryNoteResults } from './secondary-note-results'

const CreateNoteDetailView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const { documents } = useStore((state) => ({
    documents: state.documents,
  }))

  if (!data) return null

  return (
    <>
      <SecondaryNoteResults />
      <Box className="flex max-w-[639px] flex-col justify-between rounded-1 px-3 py-[14px] outline-none [box-shadow:none]">
        <TextArea
          placeholder="Description"
          size="1"
          className="h-44 max-w-[639px] border-none outline-none focus:outline-none focus:ring-0"
          style={{
            border: 'none',
            boxShadow: 'none',
          }}
          value={data[0]?.sectionItemValue}
        />
        <Box className="scrollbar-thin flex gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap">
          {documents?.map((document, index: number) => (
            <FileViewCard
              document={document}
              key={`${document.fileName}+${index}`}
            />
          ))}
        </Box>
      </Box>
      {<Separator orientation="horizontal" className="my-2 w-full" />}
    </>
  )
}
export { CreateNoteDetailView }
