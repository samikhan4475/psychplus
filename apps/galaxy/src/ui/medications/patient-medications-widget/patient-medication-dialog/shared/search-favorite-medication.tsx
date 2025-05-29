'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, TextField } from '@radix-ui/themes'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/utils'
import { useStore } from '../../store'

const SearchFavoriteMedication = () => {
  const { fetchFavoriteMedications } = useStore()
  const handleSearchService = useDebouncedCallback((value: string) => {
    fetchFavoriteMedications(value)
  }, 500)

  return (
    <Flex align="center" gap="2" className="w-full">
      <Box className="relative w-full">
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
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>
      </Box>
    </Flex>
  )
}

export { SearchFavoriteMedication }
