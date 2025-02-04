'use client'

import { useMemo, useState } from 'react'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { useHasPermission } from '@/hooks'
import { DiagnosisIcd10Code } from '@/types'
import { PermissionAlert, SearchButton } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { useStore } from '../../store'

const ServiceDiagnosisList = () => {
  const {
    loadingServicesDiagnosis,
    workingDiagnosisData,
    serviceDiagnosisData,
    updateWorkingDiagnosisData,
  } = useStore()

  const selectedOptions = useMemo(() => {
    return workingDiagnosisData.map((item) => item.code)
  }, [workingDiagnosisData])

  const handleValueChange = async (option: DiagnosisIcd10Code) => {
    updateWorkingDiagnosisData([...workingDiagnosisData, option])
  }
  if (loadingServicesDiagnosis) {
    return <LoadingPlaceholder className="mt-5" />
  }
  if (serviceDiagnosisData.length === 0) {
    return (
      <Text weight="medium" className="text-[12px]">
        No data found
      </Text>
    )
  }

  return serviceDiagnosisData.map(
    (option: DiagnosisIcd10Code, index: number) => {
      const isDisabled = selectedOptions.includes(option.code)
      return (
        <Flex
          key={option.code + index}
          justify="between"
          align="center"
          p="1"
          onClick={() => (isDisabled ? null : handleValueChange(option))}
          className={cn(
            `hover:bg-pp-bg-accent rounded-2 ${
              isDisabled
                ? 'cursor-not-allowed opacity-30'
                : 'cursor-pointer opacity-100'
            }`,
          )}
        >
          <Text className="w-[85%] text-[11px]">{`${option.code} ${option.description}`}</Text>
          <PlusCircleIcon
            stroke="#194595"
            strokeWidth="2"
            height="15"
            width="15"
          />
        </Flex>
      )
    },
  )
}

const SearchDiagnosis = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { loadingServicesDiagnosis, fetchServiceDiagnosis } = useStore()
  const [showOptions, setShowOptions] = useState(false)
  const hasPermission = useHasPermission('addDiagnosisWorkingDiagnosisTab')

  const handleSearchService = useDebouncedCallback((value: string) => {
    fetchServiceDiagnosis(value)
  }, 500)

  const ref = useOnclickOutside(() => setShowOptions(false))
  return (
    <Flex align="center" gap="2">
      <Box ref={ref} className="relative">
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
            placeholder="Search Diagnosis"
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => {
              if (hasPermission) {
                setShowOptions(true)
              } else {
                setIsOpen(true)
              }
            }}
          />
        </Flex>

        {showOptions && (
          <ScrollArea
            className={cn(
              `bg-white !absolute z-50 mx-auto h-auto max-h-40 w-full rounded-[25px] p-2 shadow-3  ${
                loadingServicesDiagnosis ?? 'min-h-28'
              }`,
            )}
          >
            <ServiceDiagnosisList />
          </ScrollArea>
        )}
      </Box>
      <SearchButton />

      <PermissionAlert
        message="You do not have permission to add diagnosis. Please contact your supervisor if you need any further assistance"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Flex>
  )
}

export { SearchDiagnosis }
