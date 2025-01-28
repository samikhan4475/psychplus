import { SchemaType } from './buttons/add-vitals/add-vitals-form'
import { UnitSystem, VITAL_TABLE_LABELS, VitalField } from './constants'
import { PatientVital } from './types'

const isUnitMetric = (unitSystem: UnitSystem) =>
  unitSystem === UnitSystem.Metric

const roundToTwoDecimals = (value: number) => {
  if (Number.isInteger(value)) return value

  return value ? parseFloat(value.toFixed(2)) : ''
}

const formatValue = (val: number | string | undefined, unit: string) =>
  typeof val === 'number' ? `${roundToTwoDecimals(val)} ${unit}` : val ?? ''

const getVitalValue = (
  vital: PatientVital,
  label: VITAL_TABLE_LABELS,
  unitSystem: UnitSystem,
): string => {
  const isMetric = isUnitMetric(unitSystem)

  const vitalMappings: Record<
    VITAL_TABLE_LABELS,
    (vital: PatientVital) => number | string | undefined
  > = {
    [VITAL_TABLE_LABELS.height]: (v) => (isMetric ? v.heightCm : v.heightFt),
    [VITAL_TABLE_LABELS.weight]: (v) =>
      isMetric ? v.weightKilograms : v.weightPounds,
    [VITAL_TABLE_LABELS.temperature]: (v) =>
      isMetric ? v.bodyTemperatureC : v.bodyTemperatureF,
    [VITAL_TABLE_LABELS.headCircumference]: (v) =>
      isMetric ? v.headCircumferenceCm : v.headCircumferenceIn,
    [VITAL_TABLE_LABELS.bmi]: (v) => v.bodyMassIndex,
    [VITAL_TABLE_LABELS.bMIPercentile]: (v) => v.bmiPercentile,
    [VITAL_TABLE_LABELS.headCircumferencePercentile]: (v) =>
      v.headOccipitalCircumferencePercentile,
    [VITAL_TABLE_LABELS.weightLengthPercentile]: (v) =>
      v.weightForLengthPercentile,
    [VITAL_TABLE_LABELS.pulseOximetry]: (v) => v.pulseOximetry,
    [VITAL_TABLE_LABELS.o2Concentration]: (v) => v.oxygenConcentration,
    [VITAL_TABLE_LABELS.heartRate]: (v) => v.pulseRate,
    [VITAL_TABLE_LABELS.respiratoryRate]: (v) => v.breathingRate,
    [VITAL_TABLE_LABELS.bloodPressure]: (v) =>
      v.systolic !== undefined && v.diastolic !== undefined
        ? `${v.systolic}/${v.diastolic} mmHg`
        : undefined,
  }

  const value = vitalMappings[label](vital)

  if (value === undefined) return ''

  return formatValue(value, getUnitValue(label, unitSystem))
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
    case VITAL_TABLE_LABELS.headCircumference:
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

function createVitalsObject(vital: SchemaType, unitSystem: UnitSystem) {
  const isMetric = isUnitMetric(unitSystem)

  const updatedVital = {
    systolic: Number(vital.systolic),
    diastolic: Number(vital.diastolic),
    pulseRate: Number(vital.heartRate),
    breathingRate: Number(vital.respiratoryRate),
    pulseOximetry: Number(vital.pulseOximetry),
    oxygenConcentration: Number(vital.o2Concentration),
    bmiPercentile: Number(vital.bmiPercentile),
    headOccipitalCircumferencePercentile: Number(
      vital.headCircumferencePercentile,
    ),
    weightForLengthPercentile: Number(vital.weightLengthPercentile),
    bodyMassIndex: Number(vital.bmi),
  } as PatientVital

  if (isMetric) {
    updatedVital.heightCm = Number(vital.height)
    updatedVital.weightKilograms = Number(vital.weight)
    updatedVital.bodyTemperatureC = Number(vital.temperature)
    updatedVital.headCircumferenceCm = Number(vital.headCircumference)
  } else {
    updatedVital.heightFt = Number(vital.height)
    updatedVital.weightPounds = Number(vital.weight)
    updatedVital.bodyTemperatureF = Number(vital.temperature)
    updatedVital.headCircumferenceIn = Number(vital.headCircumference)
  }

  return updatedVital
}

const removeNaNValues = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !isNaN(value) || value === null),
  )
}

const mapErrorMessage = (errorMessage: string): string => {
  for (const key in VitalField) {
    if (errorMessage.includes(key)) {
      const userFriendlyName = VitalField[key as keyof typeof VitalField]
      return errorMessage.replace(key, userFriendlyName)
    }
  }
  return errorMessage
}

const getVitalRowHeightClass = (index: number, data?: PatientVital[]) => {
  if (!data) return 'h-7'

  const thresholdIndex = Object.values(VITAL_TABLE_LABELS).length - 2

  if (index >= thresholdIndex && data.length === 4) return 'h-[31px]'
  if (index >= thresholdIndex && data.length > 4) return 'h-[33px]'

  return 'h-7'
}

const filterVitalsWithin48Hours = (vitals: PatientVital[]) => {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - 48 * 60 * 60 * 1000)

  return vitals.filter((vital) => {
    const createdAtDate = new Date(vital?.metadata?.createdOn)
    return createdAtDate >= cutoffDate
  })
}

export {
  getVitalValue,
  roundToTwoDecimals,
  getUnitValue,
  getFormField,
  getLatest10Vitals,
  createVitalsObject,
  removeNaNValues,
  mapErrorMessage,
  getVitalRowHeightClass,
  filterVitalsWithin48Hours,
}
