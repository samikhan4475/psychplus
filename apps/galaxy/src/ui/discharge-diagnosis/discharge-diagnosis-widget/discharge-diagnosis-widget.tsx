'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useDebouncedCallback } from 'use-debounce'
import {
  DiagnosisIcd10Code,
  FavouriteDiagnosisData,
  QuickNoteSectionItem,
} from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { AddDiagnosisDialog } from '../add-diagnosis-dialog'
import { DiagnosisList } from '../diagnosis-list'
import { DiagnosisSaveButton, SearchDiagnosisField } from '../shared'
import { useStore } from '../store'

interface DischargeDiagnosisWidgetProps {
  workingDiagnosis?: DiagnosisIcd10Code[]
  favouriteDiagnosis?: FavouriteDiagnosisData[]
  patientId?: string
  appointmentId: string
}

const DischargeDiagnosisWidget = ({
  workingDiagnosis,
  favouriteDiagnosis,
  patientId,
  appointmentId,
}: DischargeDiagnosisWidgetProps) => {
  const { isQuickNoteView, updateActualNoteWidgetsData } = useQuickNoteUpdate()
  const {
    updateFavoritesDiagnosis,
    updateWorkingDischargeDiagnosisData,
    workingDischargeDiagnosisData,
  } = useStore((state) => ({
    updateFavoritesDiagnosis: state.updateFavoritesDiagnosis,
    updateWorkingDischargeDiagnosisData:
      state.updateWorkingDischargeDiagnosisData,
    workingDischargeDiagnosisData: state.workingDischargeDiagnosisData,
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
          sectionName:
            QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis,
          sectionItem: 'diagnosis',
          appId: Number(appointmentId),
          sectionItemValue:
            workingDischargeDiagnosisData
              .reduce((acc: string[], { code }) => {
                if (code !== 'empty') acc.push(code)
                return acc
              }, [])
              .toString() || 'empty',
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuickNoteView, patientId, workingDischargeDiagnosisData, appointmentId])

  useEffect(() => {
    updateWorkingDischargeDiagnosisData(workingDiagnosis ?? [])
    favouriteDiagnosis && updateFavoritesDiagnosis(favouriteDiagnosis)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingDiagnosis, favouriteDiagnosis])

  return (
    <Flex direction="column" className="bg-white">
      <Flex align="center" p="2">
        <Flex className="flex-none">
          <Text className="text-[16px] font-[600]">
            Working Discharge Diagnosis
          </Text>
        </Flex>
        <Flex justify="between" align="center" width="100%">
          <Flex pl="4" gap="2" align="center">
            <SearchDiagnosisField />
          </Flex>
          <Flex gap="2">
            <AddDiagnosisDialog />
            <DiagnosisSaveButton />
          </Flex>
        </Flex>
      </Flex>
      <DiagnosisList />
    </Flex>
  )
}

export { DischargeDiagnosisWidget }
