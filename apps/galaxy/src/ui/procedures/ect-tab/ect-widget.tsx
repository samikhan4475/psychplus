'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  FormFieldContainer,
  StaticLabel,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { ProcedureTabs, ProcedureTabsId } from '../constants'
import {
  AnesthesiologistSelect,
  BiteBlock,
  ComplicationsBlock,
  ContinueEctBlock,
  ECTAssesment,
  EctTypeBlock,
  PostOpMedicationsBlock,
  SeizureDuration,
  SeriesMaintenanceBlock,
  SettingsBlock,
  TimeInputFieldECT,
} from './blocks'
import { transformIn, transformOut } from './data'
import { useEctWidgetForm } from './ect-tab-form'

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
        widgetId={ProcedureTabsId.ECT_ID}
        title={ProcedureTabs.ECT}
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetSaveButton />
          </>
        }
      >
        <Flex
          direction="column"
          py="3"
          gap={'1'}
          className="bg-white mt-2 px-2.5 shadow-2"
        >
          <SeriesMaintenanceBlock />
          <AnesthesiologistSelect />
          <FormFieldContainer className="flex w-auto flex-row items-center gap-4">
            <TimeInputFieldECT name="timeOut" label="Time Out" />
            <TimeInputFieldECT
              name="timeOfProcedure"
              label="Time of Procedure"
            />
            <BiteBlock />
            <StaticLabel label="Machine Name" value="Mecta" />
          </FormFieldContainer>

          <EctTypeBlock />
          <SettingsBlock />
          <SeizureDuration />
          <PostOpMedicationsBlock />
          <ComplicationsBlock />
          <ECTAssesment />
          <ContinueEctBlock />
        </Flex>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { EctWidget }
