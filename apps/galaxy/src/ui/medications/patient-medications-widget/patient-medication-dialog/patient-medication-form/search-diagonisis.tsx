'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, Popover, TextField } from '@radix-ui/themes'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { DrugBlockProps } from '../../types'
import { ServiceDiagnosisList } from './service-diagnosis-list'

const SearchDiagnosis = ({ index }: DrugBlockProps) => {
  const { fetchServiceDiagnosis } = useStore((state) => ({
    fetchServiceDiagnosis: state.fetchServiceDiagnosis,
    loadingServicesDiagnosis: state.loadingServicesDiagnosis,
  }))
  const [showSuggestions, setShowSuggestions] = useState(false)
  const ref = useOnclickOutside(() => setShowSuggestions(false))
  const handleSearchService = useDebouncedCallback((value: string) => {
    fetchServiceDiagnosis(value)
    setShowSuggestions(true)
  }, 500)
  return (
    <Flex direction="column" position="relative" ref={ref}>
      <Popover.Root open={showSuggestions}>
        <TextField.Root
          size="1"
          className={cn(
            'border-pp-gray-2 mb-2 h-6 w-full border border-solid !outline-none [box-shadow:none]',
          )}
          placeholder="Search Diagnosis by name"
          onChange={(e) => handleSearchService(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Popover.Trigger>
          <Flex className="-mt-2 h-0 w-full" />
        </Popover.Trigger>

        <Popover.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="mb-3 flex flex-col !rounded-1 !p-0"
          size="1"
        >
          <ServiceDiagnosisList index={index} />
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { SearchDiagnosis }
