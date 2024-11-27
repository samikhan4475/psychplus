'use client'

import { useState } from 'react'
import { Box, Flex, IconButton, ScrollArea } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'
import { cn } from '@/utils'
import { LeftPanelActions } from './left-panel-actions'
import { LeftPanelFilters } from './left-panel-filters'
import { NoteDetailsSection } from './note-detail'
import { NotesTable } from './notes-table'

const scrollClass = `max-h-[calc(100dvh_-_325px)] max-w-[50%] flex-1 [&>.rt-ScrollAreaViewport>div]:w-auto`
const NotesLayout = ({ patientId }: { patientId: string }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  return (
    <Flex className="w-full flex-1" gap={'1'}>
      <ScrollArea scrollbars="vertical" type="hover" className={scrollClass}>
        <Flex className={cn('w-full gap-1')} direction={'column'}>
          <Flex
            direction={'column'}
            gap={'2'}
            className="bg-white p-2 shadow-2"
          >
            <LeftPanelActions>
              <IconButton
                className={cn(
                  'text-black h-6 w-6 gap-x-1 border border-mauve-4 px-[6px]',
                  {
                    'bg-indigo-11': isVisible,
                    'text-white': isVisible,
                  },
                )}
                color="gray"
                variant={isVisible ? undefined : 'outline'}
                onClick={() => setIsVisible(!isVisible)}
              >
                <ListFilterIcon width={16} height={16} />
              </IconButton>
            </LeftPanelActions>
            {isVisible && <LeftPanelFilters patientId={patientId} />}
          </Flex>
          <Box className="bg-white p-2 shadow-2">
            <NotesTable patientId={patientId} />
          </Box>
        </Flex>
      </ScrollArea>
      <ScrollArea scrollbars="vertical" type="hover" className={scrollClass}>
        <Flex className={cn('w-full gap-1')} direction={'column'}>
          <NoteDetailsSection />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { NotesLayout }
