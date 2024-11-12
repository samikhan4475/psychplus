enum VITAL_TABLE_LABELS {
  bloodPressure = 'Blood Pressure',
  heartRate = 'Heart Rate',
  respiratoryRate = 'Respiratory Rate',
  pulseOximetry = 'Pulse Oximetry',
}

enum TREATMENT_STATUS {
  Error,
  Success,
  Info,
}

type TimeSlot = 0 | 40 | 120 | 135 | 150 | 165 | 180

enum VitalsStatus {
  GOOD = 'GOOD',
  NOT_GOOD = 'NOT_GOOD',
}

type VitalTreatmentConfigType = {
  treatmentLabel: string
  information?: string
  treatmentStatus?: TREATMENT_STATUS
  showMessage: boolean
}

enum VitalTime {
  PriorTreatment = 0,
  Minutes40 = 40,
  Minutes120 = 120,
  Minutes135 = 135,
  Minutes150 = 150,
  Minutes165 = 165,
  Minutes180 = 180,
}

export {
  VITAL_TABLE_LABELS,
  TREATMENT_STATUS,
  type TimeSlot,
  VitalsStatus,
  type VitalTreatmentConfigType,
  VitalTime,
}
