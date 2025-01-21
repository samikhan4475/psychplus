'use client'

import { Box, Flex, TextField } from '@radix-ui/themes'
import { useDebouncedCallback } from 'use-debounce'
import { SearchButton } from '@/ui/schedule/shared'
import { cn } from '@/utils'

const SearchMedications = () => {
  const handleSearchService = useDebouncedCallback((value: string) => {}, 500)

  return (
    <Flex align="center" gap="2">
      <Box className="relative">
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
            className="min-w-14 !outline-white w-[500px] flex-1 [box-shadow:none]"
            placeholder="Select Practice"
            onChange={(e) => handleSearchService(e.target.value)}
          />
        </Flex>
      </Box>
      <SearchButton />
    </Flex>
  )
}

export { SearchMedications }
