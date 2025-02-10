'use client'

import { useMemo } from 'react'
import { useStore } from '../vitals'
import { LabelAndValue } from './label-and-value'

const BmiValue = () => {
  const { data } = useStore()
  const vital = useMemo(
    () => (data && data?.length > 0 ? data?.[0] : null),
    [data],
  )

  return <LabelAndValue label="BMI" value={vital?.bodyMassIndex} />
}

export { BmiValue }
