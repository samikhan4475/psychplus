const RECORD_STATUSES = ['Active']

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
  headcircumference = 'Head circumference',
  heartRate = 'Heart Rate',
  respiratoryRate = 'Respiratory Rate',
  pulseOximetry = 'Pulse Oximetry',
  o2Concentration = 'O2 Concentration',
  bMIPercentile = 'BMI Percentile',
  headCircumferencePercentile = 'Head Circumference Percentile',
  weightLengthPercentile = 'Weight Length Percentile',
}

export { UnitSystem, RECORD_STATUSES, VITAL_TABLE_LABELS }
