'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionItem } from '@/types'
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
import { getInitialValues } from './utils'

interface HpiWidgetProps {
  patientId: string
  initialValue?: HpiWidgetSchemaType
  isHpiHeader?: boolean
  otherData?: QuickNoteSectionItem[]
}

const HpiWidget = ({
  patientId,
  initialValue,
  isHpiHeader,
  otherData,
}: HpiWidgetProps) => {
  const form = useHpiWidgetForm(initialValue ?? getInitialValues())

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        tags={isHpiHeader ? [QuickNoteSectionName.QuicknoteSectionHPI] : []}
        widgetId={QuickNoteSectionName.QuicknoteSectionHPI}
        getData={transformOut(patientId)}
        title={!isHpiHeader ? 'HPI/Presenting Symptoms' : undefined}
        sticky
        className="p-2 pt-0"
        headerRight={
          !isHpiHeader && (
            <>
              <ClearButton shouldCheckPermission />
              <WidgetSaveButton shouldCheckPermission />
            </>
          )
        }
        topHeader={isHpiHeader && <HpiWidgetHeader />}
        formResetValues={getInitialValues()}
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
        <OtherBlock data={otherData} />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { HpiWidget }
