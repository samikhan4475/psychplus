import { Text } from '@radix-ui/themes'
import { getPatientVitalsAction } from './actions'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  patientId: string
}

const VitalsInfoSection = async ({ patientId }: PatientBannerProps) => {
  const response = await getPatientVitalsAction(patientId)
  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const vitals = response.data[response.data.length - 1]

  const formatHeightInInches = (heightCm?: number) => {
    return heightCm ? (heightCm * 0.39).toFixed(2) : undefined
  }

  const formatBloodPressure = (systolic?: number, diastolic?: number) => {
    return systolic && diastolic ? `${systolic}/${diastolic}` : undefined
  }

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
