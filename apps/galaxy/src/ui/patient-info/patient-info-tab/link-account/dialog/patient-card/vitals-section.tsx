import { useEffect, useState } from 'react'
import { PatientVital } from '@/ui/vitals'
import { getPatientVitalsAction } from '../../actions'
import { LabelAndValue } from './label-and-value'

interface PatientCardVitalsSectionProps {
  patientId: string
}

const PatientCardVitalsSection = ({
  patientId,
}: PatientCardVitalsSectionProps) => {
  const [vitalsResponse, setVitalsResponse] = useState<PatientVital>()

  const fetchPatientVitalsData = async () => {
    const vitals = await getPatientVitalsAction(patientId)
    if (vitals.state === 'success') {
      setVitalsResponse(vitals.data[vitals.data.length - 1])
    }
  }
  useEffect(() => {
    fetchPatientVitalsData()
  }, [patientId])

  const HeightInInches = (heightCm?: number) =>
    heightCm ? (heightCm * 0.39).toFixed(2) : undefined
  const BloodPressure = (systolic?: number, diastolic?: number) =>
    systolic && diastolic ? `${systolic}/${diastolic}` : undefined

  return (
    <>
      <LabelAndValue
        label="BP"
        value={BloodPressure(
          vitalsResponse?.systolic,
          vitalsResponse?.diastolic,
        )}
      />
      <LabelAndValue label="HR" value={vitalsResponse?.pulseRate} />
      <LabelAndValue
        label="Temp (F)"
        value={vitalsResponse?.bodyTemperatureF}
      />
      <LabelAndValue
        label="Height (in)"
        value={HeightInInches(vitalsResponse?.heightCm)}
      />
      <LabelAndValue
        label="Weight (lbs)"
        value={vitalsResponse?.weightPounds?.toFixed(2)}
      />
      <LabelAndValue label="BMI" value={vitalsResponse?.bodyMassIndex} />
    </>
  )
}

export { PatientCardVitalsSection }
