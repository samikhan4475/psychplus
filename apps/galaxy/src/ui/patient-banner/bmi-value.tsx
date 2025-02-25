'use client'

import { useMemo } from 'react'
import { PatientVital, useStore } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface BmiValueProps {
  vitals?: PatientVital
}

const BmiValue = ({ vitals }: BmiValueProps) => {
  const { data } = useStore()
  const vital = useMemo(
    () => (data && data?.length > 0 ? data?.[0] : vitals ?? null),
    [data, vitals],
  )

  return <LabelAndValue label="BMI" value={vital?.bodyMassIndex} />
}

export { BmiValue }
