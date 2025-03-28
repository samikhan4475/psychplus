'use client'

import { useMemo } from 'react'
import { PatientVital, useStore } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface VitalsInfoSectionProps {
  vitals?: PatientVital
}

const VitalsInfoSection = ({ vitals }: VitalsInfoSectionProps) => {
  const { data } = useStore()

  const vital = useMemo(
    () => (data && data?.length > 0 ? data?.[0] : vitals ?? null),
    [data, vitals],
  )

  return (
    <>
      <LabelAndValue label="HR" value={vital?.pulseRate} />
      <LabelAndValue label="Temp (F)" value={vital?.bodyTemperatureF} />
      <LabelAndValue label="Height (in)" value={vital?.heightInches} />
      <LabelAndValue
        label="Weight (lbs)"
        value={vital?.weightPounds?.toFixed(2)}
      />
    </>
  )
}

export { VitalsInfoSection }
