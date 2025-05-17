'use client'

import { useState } from 'react'
import { Box, Flex, ScrollArea, TextField } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { SearchButton } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { searchAllergies } from './actions'
import { AllergyOptionsList } from './allergy-options-list'
import { SearchAllergiesResponse } from './types'

const SearchAllergy = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [loadingOptions, setLoadingOptions] = useState(false)
  const [options, setOptions] = useState<SearchAllergiesResponse[]>([])

  const handleSearchService = useDebouncedCallback(
    (value: string) => fetchAllergies(value),
    500,
  )
  const ref = useOnclickOutside(() => setShowOptions(false))

  const fetchAllergies = async (searchText: string) => {
    if (!searchText) return
    setLoadingOptions(true)
    setShowOptions(true)
    const response = await searchAllergies(searchText)
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    setLoadingOptions(false)
    setOptions(response.data)
  }

  return (
    <Flex gap="2" justify="between" align="center" className="">
      <Box className="relative  w-full" ref={ref}>
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
            className="min-w-14 !outline-white w-[460px] flex-1 [box-shadow:none]"
            placeholder=""
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => {
              setShowOptions(false)
            }}
          />
        </Flex>
        {showOptions && (
          <ScrollArea
            className={cn(
              `bg-white !absolute z-50 mx-auto h-auto max-h-28 w-full rounded-[25px] p-2 shadow-3  ${
                loadingOptions ?? 'min-h-16'
              }`,
            )}
          >
            <AllergyOptionsList
              loadingOptions={loadingOptions}
              options={options}
            />
          </ScrollArea>
        )}
      </Box>
      <SearchButton />
    </Flex>
  )
}

export { SearchAllergy }
