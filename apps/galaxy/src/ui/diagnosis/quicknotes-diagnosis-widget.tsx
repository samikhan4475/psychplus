'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import {
  TabContentHeading,
  WidgetAddButton,
  WidgetClearButton,
  WidgetHxButton,
} from '@/components'
import { WorkingDiagnosisView } from '@/ui/diagnosis/diagnosis/diagnosis-widget'
import { SearchDiagnosis } from '@/ui/diagnosis/diagnosis/diagnosis-widget/search-diagnosis'
import { Diagnosis } from './diagnosis'
import { DiagnosisSaveButton } from './diagnosis/diagnosis-widget/diagnosis-save-button'
import { useStore } from './store'

interface DiagnosisWidgetProps {
  patientId: string
}

const QuicknotesDiagnosisWidget = ({ patientId }: DiagnosisWidgetProps) => {
  const { fetchWorkingDiagnosis, fetchFavouriteDiagnosis } = useStore()
  useEffect(() => {
    fetchWorkingDiagnosis(patientId)
    fetchFavouriteDiagnosis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])
  return (
    <>
      <TabContentHeading title={'Diagnosis'}>
        <Flex justify="between" align="center" width="100%">
          <Flex pl="4" gap="2" align="center">
            <SearchDiagnosis patientId={patientId} />
          </Flex>
          <Flex gap="2">
            <WidgetAddButton title="Add Diagnosis">
              <Diagnosis patientId={patientId} recommended={false} />
            </WidgetAddButton>
            <WidgetHxButton />
            <WidgetClearButton />
            <DiagnosisSaveButton patientId={patientId} />
          </Flex>
        </Flex>
      </TabContentHeading>
      <Flex className="bg-white">
        <WorkingDiagnosisView patientId={patientId} />
      </Flex>
    </>
  )
}

export { QuicknotesDiagnosisWidget }

