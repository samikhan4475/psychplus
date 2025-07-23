'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ProcedureTabs } from '../constants'
import { transformIn, transformOut } from './data'
import { useEctWidgetForm } from './ect-tab-form'
import { ECTView } from './ect-view'

interface EctTabProps {
  patientId: string
  procedureEctData: QuickNoteSectionItem[]
}

const EctWidget = ({ patientId, procedureEctData }: EctTabProps) => {
  const initialValue = transformIn(procedureEctData)
  const form = useEctWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionProcedureEtcTab}
        tags={[QuickNoteSectionName.QuicknoteSectionProcedureEtcTab]}
        title={ProcedureTabs.ECT}
        getData={transformOut(patientId)}
        headerRight={<WidgetSaveButton variant="filled" />}
      >
        <Flex
          direction="column"
          py="3"
          gap={'1'}
          className="bg-white mt-2 px-2.5 shadow-2"
        >
          <ECTView />
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { EctWidget }
