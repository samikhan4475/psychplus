'use client'

import { useMemo, useState } from 'react'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SearchButton } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { useStore } from '../../store'

interface options {
  label: string
  value: string
}
interface SearchDiagnosisProps {
  patientId: string
}

const ServiceDiagnosisList = ({ patientId }: SearchDiagnosisProps) => {
  const {
    loadingServicesDiagnosis,
    workingDiagnosisData,
    serviceDiagnosisData,
    updateWorkingDiagnosisData,
  } = useStore()

  const selectedOptions = useMemo(() => {
    return workingDiagnosisData.map((item) => item.sectionItemValue)
  }, [workingDiagnosisData])

  const handleValueChange = async (value: string) => {
    const data = [
      ...workingDiagnosisData,
      {
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
        sectionItem: value,
        sectionItemValue: value,
      },
    ]
    updateWorkingDiagnosisData(patientId, data)
  }

  if (loadingServicesDiagnosis) {
    return <LoadingPlaceholder className="mt-5" />
  }
  if (serviceDiagnosisData.length === 0) {
    return <Text>No data found</Text>
  }

  return serviceDiagnosisData.map((option: options, index: number) => {
    const isDisabled = selectedOptions.includes(option.value)
    return (
      <Flex
        key={option.value + index}
        justify="between"
        align="center"
        p="1"
        onClick={() => (isDisabled ? null : handleValueChange(option.value))}
        className={cn(
          `hover:bg-pp-bg-accent rounded-2 ${
            isDisabled
              ? 'cursor-not-allowed opacity-30'
              : 'cursor-pointer opacity-100'
          }`,
        )}
      >
        <Text className="w-[85%]">{option.label}</Text>
        <PlusCircleIcon stroke="#194595" strokeWidth="2" />
      </Flex>
    )
  })
}

const SearchDiagnosis = ({ patientId }: SearchDiagnosisProps) => {
  const { loadingServicesDiagnosis, fetchServiceDiagnosis } = useStore()
  const [showOptions, setShowOptions] = useState(false)

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
            placeholder="Select Practice"
            onChange={(e) => handleSearchService(e.target.value)}
            onFocus={() => setShowOptions(true)}
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
            <ServiceDiagnosisList patientId={patientId} />
          </ScrollArea>
        )}
      </Box>
      <SearchButton />
    </Flex>
  )
}

export { SearchDiagnosis }
