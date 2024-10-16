'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
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
import { usePhysicalExamWidgetForm } from './physical-exam-widget-form'
import { type PhysicalExamWidgetSchemaType } from './physical-exam-widget-schema'

interface PhysicalExamWidgetProps {
  patientId: string
  initialValue: PhysicalExamWidgetSchemaType
}

const PhysicalExamWidget = ({
  patientId,
  initialValue,
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
  const normal = [
    'gnNormal',
    'sknNormal',
    'hntNormal',
    'nkNormal',
    'lnNormal',
    'chsNormal',
    'cvsNormal',
    'giNormal',
    'gynNormal',
    'guNormal',
    'cnsNormal',
    'msuNormal',
    'nutNormal',
    'psyNormal',
    'lngNormal',
    'cneOlfactoryNormal',
    'cneOlfactory',
    'cneOpticalNormal',
    'cneOptical',
    'cneTrochlearNormal',
    'cneTrochlear',
    'cneTrigeminalNormal',
    'cneTrigeminal',
    'cneAbducensNormal',
    'cneAbducens',
    'cneFacialNormal',
    'cneFacial',
    'cneAuditoryNormal',
    'cneAuditory',
    'cneGlossopharyngealNormal',
    'cneGlossopharyngeal',
    'cneVagusNormal',
    'cneVagus',
    'cneSpinalAccessoryNormal',
    'cneSpinalAccessory',
    'cneHypoglossalNormal',
    'cneHypoglossal',
  ]

  const [normalChipsSelected, setNormalChipsSelected] =
    useState<string[]>(normalValues)

  const handleSelectAllNormal = (checked: boolean) => {
    setNormalChipsSelected(checked ? normal : [])
  }

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="physical-exam"
        getData={transformOut(patientId)}
        title="Physical Exam"
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
        headerLeft={
          <Flex>
            <CheckAllNormalCell
              onSelectAllNormal={handleSelectAllNormal}
              checked={normalChipsSelected.length === normal.length}
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
        />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PhysicalExamWidget }
