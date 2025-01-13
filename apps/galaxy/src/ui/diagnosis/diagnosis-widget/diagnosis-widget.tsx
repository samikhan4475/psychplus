'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import {
  TabContentHeading,
  WidgetAddButton,
  WidgetClearButton,
  WidgetHxButton,
} from '@/components'
import { DiagnosisIcd10Code, FavouriteDiagnosisData } from '@/types'
import { WorkingDiagnosisView } from '@/ui/diagnosis/diagnosis/diagnosis-widget'
import { SearchDiagnosis } from '@/ui/diagnosis/diagnosis/diagnosis-widget/search-diagnosis'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { Diagnosis } from '../diagnosis'
import { DiagnosisSaveButton } from '../diagnosis/diagnosis-widget/diagnosis-save-button'
import { useStore } from '../store'

const Widgets = [QuickNoteSectionName.QuickNoteSectionSubstanceUseHx]

interface DiagnosisWidgetProps {
  workingDiagnosis?: DiagnosisIcd10Code[]
  favouriteDiagnosis?: FavouriteDiagnosisData[]
}

const DiagnosisWidget = ({
  workingDiagnosis,
  favouriteDiagnosis,
}: DiagnosisWidgetProps) => {
  const patientId = useParams().id as string
  const router = useRouter()
  const {
    fetchWorkingDiagnosis,
    updateFavoritesDiagnosis,
    updateWorkingDiagnosisData,
  } = useStore((state) => ({
    fetchWorkingDiagnosis: state.fetchWorkingDiagnosis,
    updateFavoritesDiagnosis: state.updateFavoritesDiagnosis,
    updateWorkingDiagnosisData: state.updateWorkingDiagnosisData,
  }))

  const handleEvent = (event: MessageEvent) => {
    const { widgetId, type, success } = event.data
    if (type === 'widget:save' && success && Widgets.includes(widgetId)) {
      fetchWorkingDiagnosis(patientId)
      router.refresh()
    }
  }

  useEffect(() => {
    workingDiagnosis && updateWorkingDiagnosisData(workingDiagnosis)
    favouriteDiagnosis && updateFavoritesDiagnosis(favouriteDiagnosis)
    window.addEventListener('message', handleEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingDiagnosis, favouriteDiagnosis])

  return (
    <>
      <TabContentHeading title="">
        <Flex className="flex-none">
          <Text className="text-[16px] font-[600]">Working Diagnosis</Text>
        </Flex>
        <Flex justify="between" align="center" width="100%">
          <Flex pl="4" gap="2" align="center">
            <SearchDiagnosis />
          </Flex>
          <Flex gap="2">
            <WidgetAddButton title="Add Diagnosis">
              <Diagnosis />
            </WidgetAddButton>
            <WidgetHxButton />
            <WidgetClearButton />
            <DiagnosisSaveButton />
          </Flex>
        </Flex>
      </TabContentHeading>
      <Flex className="bg-white">
        <WorkingDiagnosisView />
      </Flex>
    </>
  )
}

export { DiagnosisWidget }
