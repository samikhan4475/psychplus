'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, TextField } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { DrugsList } from './drugs-list'
import { DrugInfo } from '@/types'

const SearchDrugs = ({
  onSelect,
  replaceIndex,
}: {
  onSelect?: (drug: DrugInfo) => void
  replaceIndex?: number | null
}) => {
  const { loadingDrugs, fetchDrugs } = useStore((state) => ({
    fetchDrugs: state.fetchDrugs,
    loadingDrugs: state.loadingDrugs,
  }))

  const [showOptions, setShowOptions] = useState(false)
  const ref = useOnclickOutside(() => setShowOptions(false))
  const handleSearchService = useDebouncedCallback((value: string) => {
    fetchDrugs(value)
  }, 500)

  return (
    <Flex align="center" gap="2" className="w-full">
      <Box ref={ref} className="relative w-full">
        <Flex
          className={cn(
            'w-full flex-wrap overflow-y-auto rounded-2 border border-gray-7',
          )}
          align="center"
          gap="1"
          pl="1"
        >
          <TextField.Root
            style={
              {
                '--text-field-border-width': '0px',
              } as React.CSSProperties
            }
            size="1"
            className="!outline-white w-full [box-shadow:none]"
            placeholder="Search Drugs"
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => setShowOptions(true)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {showOptions && (
          <ScrollArea
            className={cn(
              `bg-white !absolute z-50 mx-auto h-auto max-h-40 w-full rounded-[25px] p-2 shadow-3  ${
                loadingDrugs ?? 'min-h-28'
              }`,
            )}
          >
            <DrugsList
              onSelect={(drug) => {
                onSelect?.(drug)
                setShowOptions(false)
              }}
              replaceIndex={replaceIndex}
            />
          </ScrollArea>
        )}
      </Box>
    </Flex>
  )
}

export { SearchDrugs }
