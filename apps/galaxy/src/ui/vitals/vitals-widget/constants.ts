const RECORD_STATUSES = ['Active', 'Inactive', 'Deleted']

const STATUS_CODESET = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
]

enum UnitSystem {
  Metric = 'Metric',
  English = 'English',
}

enum VITAL_TABLE_LABELS {
  height = 'Height',
  weight = 'Weight',
  bmi = 'BMI',
  temperature = 'Temperature',
  bloodPressure = 'Blood Pressure',
  headCircumference = 'Head Circumference',
  heartRate = 'Heart Rate',
  respiratoryRate = 'Respiratory Rate',
  pulseOximetry = 'Pulse Oximetry',
  o2Concentration = 'O2 Concentration',
  bMIPercentile = 'BMI Percentile',
  headCircumferencePercentile = 'Head Circumference Percentile',
  weightLengthPercentile = 'Weight Length Percentile',
}

const VitalField = {
  BreathingRate: 'Respiratory Rate',
  PulseRate: 'Heart Rate',
  BodyTemperatureF: 'Temperature',
  BodyTemperatureC: 'Temperature',
}

export {
  UnitSystem,
  RECORD_STATUSES,
  VITAL_TABLE_LABELS,
  STATUS_CODESET,
  VitalField,
}
