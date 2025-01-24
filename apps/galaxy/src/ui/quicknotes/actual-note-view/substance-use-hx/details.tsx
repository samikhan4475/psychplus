'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PatientProfile, SharedCode } from '@/types'
import { SubstanceUseHxWidgetSchemaType } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-hx-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { DrugAlcohol } from './blocks/drug-alcohol'
import { Tobacco } from './blocks/tobacco'

interface Props<T> {
  sectionName: string
  data: T
  patient?: PatientProfile
  actualNoteViewVisibility?: boolean
  counsellingCodeset: SharedCode[]
  tobaccoTreatmentCodeset: SharedCode[]
  referralTreatmentCodeset: SharedCode[]
}

const Details = ({
  sectionName,
  data,
  patient,
  actualNoteViewVisibility,
  counsellingCodeset,
  tobaccoTreatmentCodeset,
  referralTreatmentCodeset,
}: Props<SubstanceUseHxWidgetSchemaType>) => {
  if (!patient) return null

  return actualNoteViewVisibility ? (
    <BlockContainer heading={sectionName}>
      <Flex direction="column">
        <LabelAndValue label="Tobacco:" value={data.tobacco} />
        <Tobacco
          data={data}
          tobaccoTreatmentCodeset={tobaccoTreatmentCodeset}
          counsellingCodeset={counsellingCodeset}
        />
        <DrugAlcohol
          data={data}
          patient={patient}
          referralTreatmentCodeset={referralTreatmentCodeset}
        />
      </Flex>
    </BlockContainer>
  ) : null
}

export { Details }
