'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import {
  AdhdHyperactiveBlock,
  AdhdInattentiveBlock,
  AnxietyBlock,
  BpdBlock,
  ChiefComplaintBlock,
  DementiaBlock,
  DepressionBlock,
  ManiaBlock,
  MedicationSeBlock,
  ObsessionBlock,
  OtherBlock,
  PtsdBlock,
  SchizophreniaBlock,
  SubstanceBlock,
} from './blocks'
import { transformOut } from './data'
import { useHpiWidgetForm } from './hpi-widget-form'
import { type HpiWidgetSchemaType } from './hpi-widget-schema'

interface HpiWidgetProps {
  patientId: string
  initialValue: HpiWidgetSchemaType
}

const HpiWidget = ({ patientId, initialValue }: HpiWidgetProps) => {
  const form = useHpiWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="hpi"
        getData={transformOut(patientId)}
        title="HPI/Presenting Symptoms"
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <ChiefComplaintBlock />
        <DepressionBlock />
        <AnxietyBlock />
        <ManiaBlock />
        <PtsdBlock />
        <ObsessionBlock />
        <BpdBlock />
        <SubstanceBlock />
        <AdhdInattentiveBlock />
        <AdhdHyperactiveBlock />
        <DementiaBlock />
        <SchizophreniaBlock />
        <MedicationSeBlock />
        <OtherBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HpiWidget }
