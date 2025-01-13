'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { Appointment, BookVisitPayload, QuickNoteSectionItem } from '@/types'
import { TcmReviewCheckBox } from './blocks/tcm-review-check-box-block'
import { transformIn, transformOut } from './data'
import { TcmHeader } from './tcm-header'
import { useTcmWidgetForm } from './tcm-widget-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { defaultValues } from './utils'
import { DischargeBlock } from './blocks/discharge-block'
import { ResultContactBlock } from './blocks/result-contact-block'

interface TcmWidget {
  patientId: string
  tcmData: QuickNoteSectionItem[]
  isTcmTab: boolean
  appointmentData: Appointment
}

const TcmWidget = ({ patientId, tcmData, isTcmTab, appointmentData }: TcmWidget) => {
  const initialValue = transformIn(tcmData, appointmentData)
  const form = useTcmWidgetForm(initialValue)
  const appointmentId = useSearchParams().get('id') as string


  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionTcm}
        getData={transformOut(patientId, appointmentId, appointmentData)}
        title={!isTcmTab ? 'TCM' : undefined}
        headerRight={
          <>
            {!isTcmTab && <WidgetClearButton defaultInitialValues={defaultValues} />}
            {!isTcmTab && <WidgetSaveButton />}
          </>
        }
      >
        {isTcmTab && <TcmHeader title="TCM" />}

        <DischargeBlock/>
        <ResultContactBlock/>
        <TcmReviewCheckBox />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TcmWidget }
