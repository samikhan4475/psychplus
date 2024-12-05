'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import {
  TabContentHeading,
  WidgetAddButton,
  WidgetClearButton,
  WidgetHxButton,
} from '@/components'
import { WorkingDiagnosisView } from '@/ui/diagnosis/diagnosis/diagnosis-widget'
import { SearchDiagnosis } from '@/ui/diagnosis/diagnosis/diagnosis-widget/search-diagnosis'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { Diagnosis } from './diagnosis'
import { DiagnosisSaveButton } from './diagnosis/diagnosis-widget/diagnosis-save-button'
import { useStore } from './store'

const QuicknotesDiagnosisWidget = () => {
  const patientId = useParams().id as string
  const { fetchWorkingDiagnosis, fetchFavouriteDiagnosis } = useStore()

  const handleEvent = (event: MessageEvent) => {
    const { widgetId, type, success } = event.data
    if (type === 'widget:save' && success) {
      switch (widgetId) {
        case QuickNoteSectionName.QuickNoteSectionSubstanceUseHx:
          fetchWorkingDiagnosis(patientId)
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    fetchWorkingDiagnosis(patientId)
    fetchFavouriteDiagnosis()
    window.addEventListener('message', handleEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])
  return (
    <>
      <TabContentHeading title={'Diagnosis'}>
        <Flex justify="between" align="center" width="100%">
          <Flex pl="4" gap="2" align="center">
            <SearchDiagnosis />
          </Flex>
          <Flex gap="2">
            <WidgetAddButton title="Add Diagnosis">
              <Diagnosis recommended={false} />
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

export { QuicknotesDiagnosisWidget }
