'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { cn } from '@/utils'
import {
  CardiovascularCvsBlock,
  CentralNervousSystemCnsBlock,
  ChestBlock,
  CranialNervesExamBlock,
  GastrointestinalGiBlock,
  GeneralBlock,
  GenitourinaryGuBlock,
  GynecologicalGynBlock,
  HeentBlock,
  LungsBlock,
  LymphNodesBlock,
  NeckBlock,
  NutritionBlock,
  PeMusculoskeletalBlock,
  PsychiatricBlock,
  SkinBlock,
} from './blocks'
import { CheckAllNormalCell } from './check-all-normal-cell'
import { transformOut } from './data'
import { HistoryButton } from './history'
import { PhysicalExamHeader } from './physical-exam-header'
import { usePhysicalExamWidgetForm } from './physical-exam-widget-form'
import { type PhysicalExamWidgetSchemaType } from './physical-exam-widget-schema'
import { containsAbnormal, normal } from './utils'
import { WidgetClearButton } from './widget-clear-button'

interface PhysicalExamWidgetProps {
  patientId: string
  initialValue: PhysicalExamWidgetSchemaType
  isPhysicalExamTab: boolean
}

const PhysicalExamWidget = ({
  patientId,
  initialValue,
  isPhysicalExamTab,
}: PhysicalExamWidgetProps) => {
  const form = usePhysicalExamWidgetForm(initialValue)
  const dependentNormalValues = [
    'cneOlfactory',
    'cneOptical',
    'cneTrochlear',
    'cneTrigeminal',
    'cneAbducens',
    'cneFacial',
    'cneAuditory',
    'cneGlossopharyngeal',
    'cneVagus',
    'cneSpinalAccessory',
    'cneHypoglossal',
  ]

  const normalValues = Object.values(initialValue)
    .flat()
    .filter(
      (value) =>
        value.includes('Normal') || dependentNormalValues.includes(value),
    )

  const [normalChipsSelected, setNormalChipsSelected] =
    useState<string[]>(normalValues)

  const handleSelectAllNormal = (checked: boolean) => {
    setNormalChipsSelected(checked ? normal : [])
  }

  const handleOnClear = () => {
    setNormalChipsSelected([])
  }

  return (
    <FormProvider {...form}>
      {isPhysicalExamTab && (
        <PhysicalExamHeader
          patientId={patientId}
          getData={transformOut(patientId)}
          sectionName={QuickNoteSectionName.QuicknoteSectionPhysicalExam}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionPhysicalExam}
        getData={transformOut(patientId)}
        title={!isPhysicalExamTab ? 'Physical Exam' : undefined}
        headerRight={
          <>
            <WidgetTagButton />
            {!isPhysicalExamTab && (
              <HistoryButton
                patientId={patientId}
                sectionName={QuickNoteSectionName.QuicknoteSectionPhysicalExam}
              />
            )}
            <WidgetClearButton handleOnClear={handleOnClear} />
            {!isPhysicalExamTab && <WidgetSaveButton />}
          </>
        }
        headerLeft={
          <Flex className={cn(isPhysicalExamTab && 'ml-[-11px]')}>
            <CheckAllNormalCell
              onSelectAllNormal={handleSelectAllNormal}
              checked={
                normalChipsSelected.length === normal.length &&
                !containsAbnormal(normalChipsSelected)
              }
            />
          </Flex>
        }
      >
        <GeneralBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <SkinBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <HeentBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <NeckBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <LymphNodesBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <ChestBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <CardiovascularCvsBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <LungsBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <GastrointestinalGiBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <GynecologicalGynBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <GenitourinaryGuBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <CentralNervousSystemCnsBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <PeMusculoskeletalBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <NutritionBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <PsychiatricBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
        />
        <CranialNervesExamBlock
          normalChipsSelected={normalChipsSelected}
          setNormalChipsSelected={setNormalChipsSelected}
          dependentNormalValues={dependentNormalValues}
        />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PhysicalExamWidget }
