import { useMemo, useState } from 'react'
import { Box, Flex, IconButton } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import {
  DetailsSection,
  LeftPanelActions,
  LeftPanelFilters,
} from '../components'
import { NotesTable } from '../components/notes-table'
import { RowSelectionContext } from '../context'

const NotesLayout = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [selectedRow, setSelectedRow] = useState<string | undefined>(undefined)

  const ctxValue = useMemo(
    () => ({
      selectedRow,
      setSelectedRow,
    }),
    [selectedRow],
  )

  return (
    <RowSelectionContext.Provider value={ctxValue}>
      <Flex className="mt-1 h-1 w-full flex-1">
        <Box className="w-[46.6%] overflow-clip">
          <LeftPanelActions>
            <IconButton
              className={cn(
                'h-6 gap-x-1 border border-[#DDDDE3] px-2 text-[#000000]',
                {
                  'bg-[#194595]': isVisible,
                  'text-[#FFF]': isVisible,
                },
              )}
              color="gray"
              variant={isVisible ? undefined : 'outline'}
              onClick={() => setIsVisible(!isVisible)}
            >
              <ListFilterIcon width={16} height={16} />
            </IconButton>
          </LeftPanelActions>
          {isVisible && <LeftPanelFilters />}
          <Box className="min-w-[100%] overflow-x-scroll">
            <NotesTable />
          </Box>
        </Box>
        <Box className="w-[53.4%] overflow-y-scroll border-l border-[#DDDDE3]">
          <DetailsSection />
        </Box>
      </Flex>
    </RowSelectionContext.Provider>
  )
}

export { NotesLayout }
