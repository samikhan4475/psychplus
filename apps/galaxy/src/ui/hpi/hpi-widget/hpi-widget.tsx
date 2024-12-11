'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
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
  OtherBlock,
  PtsdBlock,
  SchizophreniaBlock,
  SubstanceBlock,
} from './blocks'
import { ClearButton } from './clear-button'
import { transformOut } from './data'
import { useHpiWidgetForm } from './hpi-widget-form'
import { HpiWidgetHeader } from './hpi-widget-header'
import { type HpiWidgetSchemaType } from './hpi-widget-schema'

interface HpiWidgetProps {
  patientId: string
  initialValue: HpiWidgetSchemaType
  isHpiHeader?: boolean
}

const HpiWidget = ({
  patientId,
  initialValue,
  isHpiHeader,
}: HpiWidgetProps) => {
  const form = useHpiWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      {isHpiHeader && <HpiWidgetHeader />}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionHPI}
        getData={transformOut(patientId)}
        title={!isHpiHeader ? 'HPI/Presenting Symptoms' : undefined}
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
        {/* <OcdBlock /> */}
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
