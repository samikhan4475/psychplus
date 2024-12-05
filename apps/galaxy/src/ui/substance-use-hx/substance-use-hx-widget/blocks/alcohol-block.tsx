import React from 'react'
import { YesNoSelect } from '@/components'
import { PatientProfile } from '@/types'
import { ALCOHOL_ID, ALCOHOL_LABEL } from './constants'

const ALCOHOL_DESCRIPTION = (patient: PatientProfile) => {
  let patientGender = patient.gender
  if (patientGender === 'Undetermined') {
    patientGender = patient.genderOrientation || patient.gender
  }
  const isFemale = patientGender === 'Female'
  return (
    <span>
      Do you drink{' '}
      <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">
        &gt;{isFemale ? 3 : 4}
      </span>{' '}
      alcoholic drinks/day or{' '}
      <span className="rounded-3 bg-gray-3 px-1.5 py-[1px]">
        &gt;{isFemale ? 7 : 14}
      </span>{' '}
      alcoholic drinks/week?
    </span>
  )
}

const AlcoholBlock = ({ patientInfo }: { patientInfo: PatientProfile }) => {
  return (
    <YesNoSelect
      label={ALCOHOL_LABEL}
      description={ALCOHOL_DESCRIPTION(patientInfo)}
      field={ALCOHOL_ID}
      isNoFirst
    />
  )
}

export { AlcoholBlock }
