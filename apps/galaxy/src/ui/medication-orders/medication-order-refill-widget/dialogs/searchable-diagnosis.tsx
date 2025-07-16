'use client'

import { useMemo, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Flex,
  IconButton,
  Popover,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { DiagnosisIcd10Code } from '@/types'
import { getIcd10Diagnosis } from '@/ui/diagnosis/diagnosis/actions/get-service-diagnosis'
import { cn } from '@/utils'
import { DrugDiagnosis } from '../types'

interface SearchDiagnosisProps {
  onSelectItem: (selectedItem: DiagnosisIcd10Code) => void
  selectedDianosis: DrugDiagnosis[]
}

const SearchDiagnosis = ({
  onSelectItem,
  selectedDianosis,
}: SearchDiagnosisProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const ref = useOnclickOutside(() => setShowSuggestions(false))
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false)
  const [diagnosisDataList, setDiagnosisDataList] = useState<
    DiagnosisIcd10Code[]
  >([])

  const handleSearchService = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) return
    setLoadingDiagnosis(true)
    const response = await getIcd10Diagnosis({
      CodeOrDescription: value,
    })
    if (response.state === 'success') {
      setDiagnosisDataList(response.data || [])
      setShowSuggestions(true)
      setLoadingDiagnosis(false)
      return
    }
    setLoadingDiagnosis(false)
  }, 500)

  const handleValueChange = (option: DiagnosisIcd10Code) => {
    onSelectItem(option)
  }

  const selectedOptions = useMemo(() => {
    return selectedDianosis.map((item) => item.diagnosisCode)
  }, [selectedDianosis])

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
          {loadingDiagnosis ? (
            <LoadingPlaceholder className="mt-5" />
          ) : (
            <ScrollArea
              className={cn(
                loadingDiagnosis ? 'min-h-25' : '',
                diagnosisDataList.length === 0 ? 'h-auto' : 'h-40',
              )}
            >
              {diagnosisDataList?.map((option, index) => {
                const isDisabled = selectedOptions.includes(option.code)
                return (
                  <Flex
                    key={option.code + index}
                    justify="between"
                    align="center"
                    p="1"
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      if (!isDisabled) handleValueChange(option)
                    }}
                    className={cn('hover:bg-pp-bg-accent rounded-2', {
                      'cursor-not-allowed opacity-30': isDisabled,
                      'cursor-pointer opacity-100': !isDisabled,
                    })}
                  >
                    <Text className="text-[11px]">{`${option.code} ${option.description}`}</Text>
                    <IconButton color="gray" variant="ghost">
                      <PlusCircleIcon
                        stroke="#194595"
                        strokeWidth="2"
                        height="15"
                        width="15"
                      />
                    </IconButton>
                  </Flex>
                )
              })}
            </ScrollArea>
          )}
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { SearchDiagnosis }
