'use client'

import { useEffect, useMemo } from 'react'
import { PatientVital, useStore } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface VitalsInfoSectionProps {
  vitals?: PatientVital
}

const VitalsInfoSection = ({ vitals }: VitalsInfoSectionProps) => {
  const { data, setData } = useStore()

  useEffect(() => {
    if (vitals) {
      setData([{ ...vitals }, ...(data ?? [])])
    }
  }, [])

  const vital = useMemo(
    () => (data && data?.length > 0 ? data?.[0] : null),
    [data],
  )

  const formatHeightInInches = (heightCm?: number) =>
    heightCm ? (heightCm * 0.39).toFixed(2) : undefined

  return (
    <>
      <LabelAndValue label="HR" value={vital?.pulseRate} />
      <LabelAndValue label="Temp (F)" value={vital?.bodyTemperatureF} />
      <LabelAndValue
        label="Height (in)"
        value={formatHeightInInches(vital?.heightCm)}
      />
      <LabelAndValue
        label="Weight (lbs)"
        value={vital?.weightPounds?.toFixed(2)}
      />
    </>
  )
}

export { VitalsInfoSection }
