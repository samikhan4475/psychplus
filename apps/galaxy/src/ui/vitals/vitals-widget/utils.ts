import { UnitSystem, VITAL_TABLE_LABELS } from './constants'
import { PatientVital } from './types'

const isUnitMetric = (unitSystem: UnitSystem) =>
  unitSystem === UnitSystem.Metric

const roundToTwoDecimals = (value: number) => {
  if (Number.isInteger(value)) return value

  return value ? parseFloat(value.toFixed(2)) : ''
}

const getVitalValue = (
  vital: PatientVital,
  label: VITAL_TABLE_LABELS,
  unitSystem: UnitSystem,
) => {
  const isMetric = isUnitMetric(unitSystem)

  switch (label) {
    case VITAL_TABLE_LABELS.height:
      const height = isMetric ? vital.heightCm : vital.heightFt
      return height !== undefined
        ? `${roundToTwoDecimals(height)} ${getUnitValue(label, unitSystem)}`
        : ''
    case VITAL_TABLE_LABELS.weight:
      const weight = isMetric ? vital.weightKilograms : vital.weightPounds
      return weight !== undefined
        ? `${roundToTwoDecimals(weight)} ${getUnitValue(label, unitSystem)}`
        : ''
    case VITAL_TABLE_LABELS.bmi:
      return vital.bodyMassIndex !== undefined
        ? roundToTwoDecimals(vital.bodyMassIndex)
        : ''
    case VITAL_TABLE_LABELS.temperature:
      const temp = isMetric ? vital.bodyTemperatureC : vital.bodyTemperatureF
      return temp !== undefined
        ? `${roundToTwoDecimals(temp)} ${getUnitValue(label, unitSystem)}`
        : ''
    case VITAL_TABLE_LABELS.bloodPressure:
      return vital.systolic !== undefined && vital.diastolic !== undefined
        ? `${vital.systolic}/${vital.diastolic} mmHg`
        : ''
    case VITAL_TABLE_LABELS.headcircumference:
      const headCircumference = isMetric
        ? vital.headCircumferenceCm
        : vital.headCircumferenceIn
      return headCircumference !== undefined
        ? `${roundToTwoDecimals(headCircumference)} ${getUnitValue(
            label,
            unitSystem,
          )}`
        : ''
    case VITAL_TABLE_LABELS.heartRate:
      return vital.pulseRate !== undefined ? `${vital.pulseRate} bpm` : ''
    case VITAL_TABLE_LABELS.respiratoryRate:
      return vital.breathingRate !== undefined
        ? `${vital.breathingRate} bpm`
        : ''
    case VITAL_TABLE_LABELS.pulseOximetry:
      return vital.pulseOximetry !== undefined ? `${vital.pulseOximetry}` : ''
    case VITAL_TABLE_LABELS.o2Concentration:
      return vital.oxygenConcentration !== undefined
        ? `${vital.oxygenConcentration}`
        : ''
    case VITAL_TABLE_LABELS.bMIPercentile:
      return vital.bmiPercentile !== undefined ? `${vital.bmiPercentile}` : ''
    case VITAL_TABLE_LABELS.headCircumferencePercentile:
      return vital.headOccipitalCircumferencePercentile !== undefined
        ? `${vital.headOccipitalCircumferencePercentile}`
        : ''
    case VITAL_TABLE_LABELS.weightLengthPercentile:
      return vital.weightForLengthPercentile !== undefined
        ? `${vital.weightForLengthPercentile}`
        : ''
    default:
      return ''
  }
}

const getUnitValue = (label: VITAL_TABLE_LABELS, unitSystem: UnitSystem) => {
  const isMetric = isUnitMetric(unitSystem)

  switch (label) {
    case VITAL_TABLE_LABELS.height:
      return isMetric ? 'cm' : 'ft'
    case VITAL_TABLE_LABELS.weight:
      return isMetric ? 'kg' : 'lbs'
    case VITAL_TABLE_LABELS.temperature:
      return isMetric ? '°C' : '°F'
    case VITAL_TABLE_LABELS.headcircumference:
      return isMetric ? 'cm' : 'in'
    default:
      return ''
  }
}

const getFormField = (label: VITAL_TABLE_LABELS) =>
  label
    .split(' ')
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')

const getLatest10Vitals = (vitals: PatientVital[]) => {
  const sortedVitals = vitals.toSorted((a, b) => {
    const dateA = new Date(a.metadata.createdOn).getTime()
    const dateB = new Date(b.metadata.createdOn).getTime()

    return dateB - dateA
  })

  return sortedVitals.slice(0, 10)
}

export {
  getVitalValue,
  roundToTwoDecimals,
  getUnitValue,
  getFormField,
  getLatest10Vitals,
}
