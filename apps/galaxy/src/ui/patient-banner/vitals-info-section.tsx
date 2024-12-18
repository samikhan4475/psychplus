import { PatientVital } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface VitalsInfoSectionProps {
  vitals: PatientVital
}

const VitalsInfoSection = ({ vitals }: VitalsInfoSectionProps) => {
  const formatHeightInInches = (heightCm?: number) =>
    heightCm ? (heightCm * 0.39).toFixed(2) : undefined
  const formatBloodPressure = (systolic?: number, diastolic?: number) =>
    systolic && diastolic ? `${systolic}/${diastolic}` : undefined

  return (
    <>
      <LabelAndValue
        label="BP"
        value={formatBloodPressure(vitals?.systolic, vitals?.diastolic)}
      />
      <LabelAndValue label="HR" value={vitals?.pulseRate} />
      <LabelAndValue label="Temp (F)" value={vitals?.bodyTemperatureF} />
      <LabelAndValue
        label="Height (in)"
        value={formatHeightInInches(vitals?.heightCm)}
      />
      <LabelAndValue
        label="Weight (lbs)"
        value={vitals?.weightPounds?.toFixed(2)}
      />
      <LabelAndValue label="BMI" value={vitals?.bodyMassIndex} />
    </>
  )
}

export { VitalsInfoSection }
