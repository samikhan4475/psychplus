'use client'

import { useEffect } from 'react'
import { PatientVital, useStore } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface VitalsInfoSectionProps {
  vitals?: PatientVital[]
}

const VitalsInfoSection = ({ vitals }: VitalsInfoSectionProps) => {
  const { data, setData } = useStore()
  const vital: PatientVital | null = data && data?.length > 0 ? data?.[0] : null

  const formatHeightInInches = (heightCm?: number) =>
    heightCm ? (heightCm * 0.39).toFixed(2) : undefined
  const formatBloodPressure = (systolic?: number, diastolic?: number) =>
    systolic && diastolic ? `${systolic}/${diastolic}` : undefined

  useEffect(() => {
    if (vitals) {
      setData([...vitals])
    }
  }, [vitals])

  return (
    <>
      <LabelAndValue
        label="BP"
        value={formatBloodPressure(vital?.systolic, vital?.diastolic)}
      />
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
      <LabelAndValue label="BMI" value={vital?.bodyMassIndex} />
    </>
  )
}

export { VitalsInfoSection }
