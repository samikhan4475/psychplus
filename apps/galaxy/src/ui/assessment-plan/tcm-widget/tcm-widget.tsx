'use client'

import { FormProvider } from 'react-hook-form'
import {
    WidgetClearButton,
    WidgetFormContainer,
    WidgetHxButton,
    WidgetSaveButton,
} from '@/components'

import { transformIn, transformOut } from './data'
import { useTcmWidgetForm } from './tcm-widget-form'
import { TcmHeader } from './tcm-header'
import { DcDateBlock } from './blocks/dc-date-block'
import { TcmDateBlock } from './blocks/tcm-date-block'
import { DcHospitalName } from './blocks/dc-hospital-name'
import { DcHospitalServiceType } from './blocks/dc-hospital-service-type'
import { TcmContactMadeBy } from './blocks/contact-made-by-block'
import { TcmReviewCheckBox } from './blocks/tcm-review-check-box-block'
import { QuickNoteSectionItem } from '@/types'
import { ResultBlock } from './blocks/result-block'
import { useSearchParams } from 'next/navigation'

interface TcmWidget {
    patientId: string
    tcmData: QuickNoteSectionItem[]
    isTcmTab: boolean
}

const TcmWidget = ({
    patientId,
    tcmData,
    isTcmTab
}: TcmWidget) => {
    const initialValue = transformIn(tcmData)
    const form = useTcmWidgetForm(initialValue)
    const appointmentId = useSearchParams().get('id') as string
    const visitSequence = useSearchParams().get('visitSequence') || ''
    return (
        <FormProvider {...form}>
            <WidgetFormContainer
                patientId={patientId}
                widgetId="tcm-widget"
                getData={transformOut(patientId, appointmentId, visitSequence)}
                title={!isTcmTab ? 'TCM' : undefined}
                headerRight={
                    <>
                        {!isTcmTab && <WidgetClearButton/>}
                        {!isTcmTab && <WidgetHxButton/>}
                        {!isTcmTab && <WidgetSaveButton />}
                    </>
                }
            >
                {isTcmTab && ( <TcmHeader title="TCM" />  )}
            <DcDateBlock />
            <DcHospitalName/>
            <DcHospitalServiceType/>
            <TcmContactMadeBy/>
            <TcmDateBlock/>
            <ResultBlock />
            <TcmReviewCheckBox/>
            </WidgetFormContainer>
        </FormProvider>
    )
}

export { TcmWidget }
