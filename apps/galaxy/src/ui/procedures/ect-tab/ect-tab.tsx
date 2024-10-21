'use client'

import { FormProvider } from 'react-hook-form'
import {
  FormFieldContainer,
  StaticLabel,
  TabContentHeading,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import {
  SeriesMaintenanceBlock,
  AnesthesiologistSelect,
  BiteBlock,
  EctTypeBlock,
  SettingsBlock,
  SeizureDuration,
  PostOpMedicationsBlock,
  ComplicationsBlock,
  ECTAssesment,
  ContinueEctBlock,
  TimeInputFieldECT,
} from './blocks'
import { useEctWidgetForm } from './ect-tab-form'
import { ProcedureTabs } from '../constants'
import { Flex } from '@radix-ui/themes'

interface EctTabProps {
  patientId: string
}

const EctTab = ({ patientId }: EctTabProps) => {
  const form = useEctWidgetForm()

  return (
    <FormProvider {...form}>
      <TabContentHeading title={ProcedureTabs.ECT} >
        <Flex justify="end" align="center" width="100%" gap={"2"}>
            <WidgetHxButton />
            <WidgetSaveButton />
        </Flex>
      </TabContentHeading>

      <Flex direction="column" py="3" gap={"1"} className="bg-white px-2.5 shadow-2">
        <SeriesMaintenanceBlock />
        <AnesthesiologistSelect />
        <FormFieldContainer className='w-auto flex flex-row gap-4 items-center'>
        <TimeInputFieldECT name="timeOut" label="Time Out"  />
        <TimeInputFieldECT name="timeOfProcedure" label="Time of Procedure"  /> 
        <BiteBlock />
        <StaticLabel label='Machine Name' value='Mecta' />
        </FormFieldContainer>

        <EctTypeBlock />
        <SettingsBlock />
        <SeizureDuration />
        <PostOpMedicationsBlock />
        <ComplicationsBlock />
        <ECTAssesment />
        <ContinueEctBlock />
      </Flex>
    </FormProvider>
  )
}

export { EctTab }
