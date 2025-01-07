'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { TcmContactMadeBy } from './blocks/contact-made-by-block'
import { DcDateBlock } from './blocks/dc-date-block'
import { DcHospitalName } from './blocks/dc-hospital-name'
import { DcHospitalServiceType } from './blocks/dc-hospital-service-type'
import { ResultBlock } from './blocks/result-block'
import { TcmDateBlock } from './blocks/tcm-date-block'
import { TcmReviewCheckBox } from './blocks/tcm-review-check-box-block'
import { transformIn, transformOut } from './data'
import { TcmHeader } from './tcm-header'
import { useTcmWidgetForm } from './tcm-widget-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { DateValue } from 'react-aria-components'
import { defaultValues } from './utils'

interface TcmWidget {
  patientId: string
  tcmData: QuickNoteSectionItem[]
  isTcmTab: boolean
}

const TcmWidget = ({ patientId, tcmData, isTcmTab }: TcmWidget) => {
  const initialValue = transformIn(tcmData)
  const form = useTcmWidgetForm(initialValue)
  const appointmentId = useSearchParams().get('id') as string
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionTcm}
        getData={transformOut(patientId, appointmentId)}
        title={!isTcmTab ? 'TCM' : undefined}
        headerRight={
          <>
            {!isTcmTab && <WidgetClearButton defaultInitialValues={defaultValues} />}
            {!isTcmTab && <WidgetSaveButton />}
          </>
        }
      >
        {isTcmTab && <TcmHeader title="TCM" />}
        <DcDateBlock />
        <DcHospitalName />
        <DcHospitalServiceType />
        <TcmContactMadeBy />
        <TcmDateBlock />
        <ResultBlock />
        <TcmReviewCheckBox />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TcmWidget }
