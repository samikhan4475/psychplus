'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  AdhdHyperactiveBlock,
  AdhdInattentiveBlock,
  AnxietyBlock,
  AutismBlock,
  BipolarManiaBlock,
  BpdBlock,
  ChiefComplaintBlock,
  ConductDisorderBlock,
  DementiaBlock,
  DepressionBlock,
  MedicationSeBlock,
  ObsessionBlock,
  OcdBlock,
  OtherBlock,
  PtsdBlock,
  SchizophreniaBlock,
  SubstanceBlock,
} from './blocks'
import { ClearButton } from './clear-button'
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
        widgetId={QuickNoteSectionName.QuicknoteSectionHPI}
        getData={transformOut(patientId)}
        title="HPI/Presenting Symptoms"
        sticky
        className="p-2 pt-0"
        headerRight={
          <>
            <ClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <ChiefComplaintBlock />
        <DepressionBlock />
        <AnxietyBlock />
        <BipolarManiaBlock />
        <PtsdBlock />
        <ObsessionBlock />
        <OcdBlock />
        <BpdBlock />
        <SubstanceBlock />
        <AdhdInattentiveBlock />
        <AdhdHyperactiveBlock />
        <AutismBlock />
        <ConductDisorderBlock />
        <DementiaBlock />
        <SchizophreniaBlock />
        <MedicationSeBlock />
        <OtherBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HpiWidget }
