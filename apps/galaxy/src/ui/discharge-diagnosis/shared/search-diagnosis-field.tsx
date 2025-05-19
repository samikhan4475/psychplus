'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import { PlusCircleIcon } from 'lucide-react'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components'
import { useHasPermission } from '@/hooks'
import { DiagnosisIcd10Code } from '@/types'
import { useDebouncedDiagnosisQuickNoteSave } from '@/ui/diagnosis/diagnosis/hooks'
import { getFilteredDiagnosesByCodes } from '@/ui/diagnosis/diagnosis/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { useStore } from '../store'
import { SearchButton } from './search-button'

const ServiceDiagnosisList = () => {
  const { id: patientId, apptId = '' } = useParams<{
    id: string
    apptId: string
  }>()
  const { isQuickNoteView, updateActualNoteWidgetsData } = useQuickNoteUpdate()
  const debouncedDiagnosisSave = useDebouncedDiagnosisQuickNoteSave(
    patientId,
    updateActualNoteWidgetsData,
    QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis,
    10,
    apptId,
  )
  const {
    loadingServicesDiagnosis,
    workingDischargeDiagnosisData,
    serviceDiagnosisData,
    updateWorkingDischargeDiagnosisData,
  } = useStore()

  const selectedOptions = useMemo(() => {
    return workingDischargeDiagnosisData.map((item) => item.code)
  }, [workingDischargeDiagnosisData])

  const handleValueChange = async (option: DiagnosisIcd10Code) => {
    const diagnosis = getFilteredDiagnosesByCodes(
      workingDischargeDiagnosisData,
      option,
    )
    const updateDischargeDxCodes = [...diagnosis, option]
    updateWorkingDischargeDiagnosisData(updateDischargeDxCodes)
    if (isQuickNoteView) {
      debouncedDiagnosisSave(updateDischargeDxCodes)
    }
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
          key={`${option.code}-${index}`}
          justify="between"
          align="center"
          p="1"
          className={cn('hover:bg-pp-bg-accent cursor-pointer rounded-2', {
            'cursor-not-allowed opacity-30': isDisabled,
          })}
          onClick={() => !isDisabled && handleValueChange(option)}
        >
          <Text className="w-[85%] text-[11px]">{`${option.code} ${option.description}`}</Text>
          <PlusCircleIcon
            className="stroke-pp-bg-primary"
            strokeWidth="2"
            height="15"
            width="15"
          />
        </Flex>
      )
    },
  )
}

const SearchDiagnosisField = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const ref = useOnclickOutside(() => setShowOptions(false))
  const { loadingServicesDiagnosis, fetchServiceDiagnosis } = useStore()
  const hasPermission = useHasPermission('addDiagnosisWorkingDiagnosisTab')
  const handleSearchService = useDebouncedCallback((value: string) => {
    fetchServiceDiagnosis(value)
  }, 500)

  return (
    <Flex align="center" gap="2">
      <Box className="relative" ref={ref}>
        <Flex
          className="w-full overflow-y-auto rounded-2 border border-gray-7"
          align="center"
          gap="1"
          wrap="wrap"
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
              'bg-white !absolute z-50 mx-auto h-auto max-h-40 w-full rounded-[25px] p-2 shadow-3',
              {
                'min-h-28': loadingServicesDiagnosis,
              },
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

export { SearchDiagnosisField }
