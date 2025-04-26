'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { useDebouncedCallback } from 'use-debounce'
import { WidgetAddButton } from '@/components'
import {
  DiagnosisIcd10Code,
  FavouriteDiagnosisData,
  QuickNoteSectionItem,
} from '@/types'
import { WorkingDiagnosisView } from '@/ui/diagnosis/diagnosis/diagnosis-widget'
import { SearchDiagnosis } from '@/ui/diagnosis/diagnosis/diagnosis-widget/search-diagnosis'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { Diagnosis } from '../diagnosis'
import { DiagnosisSaveButton } from '../diagnosis/diagnosis-widget/diagnosis-save-button'
import { shouldDisableDiagnosisActions } from '../diagnosis/utils'
import { useStore } from '../store'

interface DiagnosisWidgetProps {
  workingDiagnosis?: DiagnosisIcd10Code[]
  favouriteDiagnosis?: FavouriteDiagnosisData[]
  patientId?: string
}

const DiagnosisWidget = ({
  workingDiagnosis,
  favouriteDiagnosis,
  patientId,
}: DiagnosisWidgetProps) => {
  const { isQuickNoteView, updateActualNoteWidgetsData } = useQuickNoteUpdate()
  const searchParams = useSearchParams()
  const visitType = searchParams.get('visitType') ?? ''
  const visitSequence = searchParams.get('visitSequence') ?? ''
  const isDisabled = useMemo(
    () => shouldDisableDiagnosisActions(visitType, visitSequence),
    [visitType, visitSequence],
  )
  const {
    updateFavoritesDiagnosis,
    updateWorkingDiagnosisData,
    workingDiagnosisData,
  } = useStore((state) => ({
    fetchWorkingDiagnosis: state.fetchWorkingDiagnosis,
    updateFavoritesDiagnosis: state.updateFavoritesDiagnosis,
    updateWorkingDiagnosisData: state.updateWorkingDiagnosisData,
    workingDiagnosisData: state.workingDiagnosisData,
  }))

  const handleDiagnosischange = useDebouncedCallback(
    (value: QuickNoteSectionItem[]) => {
      updateActualNoteWidgetsData(value)
    },
    1500,
  )

  useEffect(() => {
    if (isQuickNoteView && workingDiagnosis !== undefined) {
      handleDiagnosischange([
        {
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
          sectionItem: 'diagnosis',
          sectionItemValue:
            workingDiagnosisData
              .reduce((acc: string[], { code }) => {
                if (code !== 'empty') acc.push(code)
                return acc
              }, [])
              .toString() || 'empty',
        },
      ])
    }
  }, [isQuickNoteView, patientId, workingDiagnosisData])

  useEffect(() => {
    updateWorkingDiagnosisData(workingDiagnosis ?? [])
    favouriteDiagnosis && updateFavoritesDiagnosis(favouriteDiagnosis)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingDiagnosis, favouriteDiagnosis])

  return (
    <Flex className="bg-white" direction="column">
      <Flex justify="between" p="2" className="bg-white border border-gray-5">
        <Text className="flex-none text-[16px] font-[600]">
          {isDisabled ? 'Admitting' : 'Working'} Diagnosis
        </Text>
        {!isDisabled && (
          <Flex justify="between" align="center" width="100%">
            <Flex pl="4" gap="2" align="center">
              <SearchDiagnosis />
            </Flex>
            <Flex gap="2">
              <WidgetAddButton title="Add Diagnosis">
                <Diagnosis />
              </WidgetAddButton>
              <DiagnosisSaveButton />
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex className="bg-white">
        <WorkingDiagnosisView isDisabled={isDisabled} />
      </Flex>
    </Flex>
  )
}

export { DiagnosisWidget }
