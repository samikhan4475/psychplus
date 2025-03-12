import React from 'react'
import { PatientProfile } from '@psychplus-v2/types'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectableChip } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { ALCOHOL_ID, ALCOHOL_LABEL, YES_NO_OPTIONS } from '../constants'
import { SubstanceUseSchemaType } from '../substance-use-hx-schema'

const ALCOHOL_DESCRIPTION_TEXT = (patient: PatientProfile) => {
  let patientGender = patient.gender
  if (patientGender === 'Undetermined') {
    patientGender = patient.genderOrientation || patient.gender
  }
  const isGenderFemale = patientGender === 'Female'
  return (
    <span>
      Do you drink{' '}
      <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">
        &gt;{isGenderFemale ? 3 : 4}
      </span>{' '}
      alcoholic drinks/day or{' '}
      <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">
        &gt;{isGenderFemale ? 7 : 14}
      </span>{' '}
      alcoholic drinks/week?
    </span>
  )
}

const AlcoholBlock = () => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))
  const form = useFormContext<SubstanceUseSchemaType>()

  return (
    <Flex gap={'2'} align={'center'} wrap={'wrap'}>
      <Text weight="medium" className="line-clamp-1 text-[16px]">
        {ALCOHOL_LABEL}:
      </Text>
      <Text weight={'regular'} className="line-clamp-1 text-[14px]">
        {ALCOHOL_DESCRIPTION_TEXT(profile)}
      </Text>
      {YES_NO_OPTIONS.map((option) => (
        <SelectableChip
          key={option.value}
          label={option.label}
          selected={form.watch(ALCOHOL_ID) === option.value}
          onClick={() => {
            form.clearErrors(ALCOHOL_ID)
            form.setValue(ALCOHOL_ID, option.value)
          }}
        />
      ))}
    </Flex>
  )
}

export { AlcoholBlock }
