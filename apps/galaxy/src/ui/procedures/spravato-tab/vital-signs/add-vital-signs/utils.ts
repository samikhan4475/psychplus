import {
  TREATMENT_STATUS,
  VITAL_TABLE_LABELS,
  VitalsStatus,
  VitalTime,
} from './types'

export const getVitalValue = (vital: any, label: VITAL_TABLE_LABELS) => {
  switch (label) {
    case VITAL_TABLE_LABELS.bloodPressure:
      return vital.systolic !== undefined && vital.diastolic !== undefined
        ? `${vital.systolic}/${vital.diastolic} sys/dis`
        : ''
    case VITAL_TABLE_LABELS.heartRate:
      return vital.heartRate !== undefined ? `${vital.heartRate}` : ''
    case VITAL_TABLE_LABELS.respiratoryRate:
      return vital.respiratoryRate !== undefined
        ? `${vital.respiratoryRate}`
        : ''
    case VITAL_TABLE_LABELS.pulseOximetry:
      return vital.pulseOximetry !== undefined ? `${vital.pulseOximetry}` : ''

    default:
      return ''
  }
}

export const getFormField = (label: VITAL_TABLE_LABELS) =>
  `newVitalSign.${label
    .split(' ')
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')}`

export const evaluateVitals = (
  currentTimeSlot: number,
  isCurrentVitalsGood: VitalsStatus,
  setCurrentTimeSlot: (value: number) => void,
) => {
  const isGood = isCurrentVitalsGood === VitalsStatus.GOOD

  switch (currentTimeSlot) {
    case VitalTime.PriorTreatment:
      isGood && setCurrentTimeSlot(VitalTime.Minutes40)
      return {
        disable: false,
        showMessage: true,
        treatmentLabel: isGood
          ? '40 Minutes into Treatment'
          : 'Prior to Treatment',
        information: isGood
          ? "Prior to treatment, the patient's vital signs were assessed and it was determined safe to proceed with treatment."
          : 'Prior to treatment, the patient’s vital signs were assessed and it was determined UNSAFE to proceed with treatment.',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        discharge: false,
      }
    case VitalTime.Minutes40:
      setCurrentTimeSlot(VitalTime.Minutes120)
      return {
        disable: false,
        showMessage: false,
        treatmentLabel: '120 Minutes into Treatment',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        information: isGood
          ? 'Prior to discharge the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.'
          : 'Prior to discharge the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
        discharge: false,
      }
    case VitalTime.Minutes120:
      !isGood && setCurrentTimeSlot(VitalTime.Minutes135)
      return {
        disable: isGood,
        showMessage: true,
        treatmentLabel: isGood
          ? '120 Minutes into Treatment'
          : '135 Minutes into Treatment',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        information: isGood
          ? 'Prior to discharge the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.'
          : 'Prior to discharge the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
        discharge: true,
      }
    case VitalTime.Minutes135:
      !isGood && setCurrentTimeSlot(VitalTime.Minutes150)
      return {
        disable: isGood,
        showMessage: true,
        treatmentLabel: isGood
          ? '135 Minutes into Treatment'
          : '150 Minutes into Treatment',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        information: isGood
          ? '135 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.'
          : '135 minutes into treatment the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
        discharge: isGood,
      }

    case VitalTime.Minutes150:
      !isGood && setCurrentTimeSlot(VitalTime.Minutes165)
      return {
        disable: isGood,
        showMessage: true,
        treatmentLabel: isGood
          ? '150 Minutes into Treatment'
          : '165 Minutes into Treatment',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        information: isGood
          ? '150 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.'
          : '150 minutes into treatment the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
        discharge: isGood,
      }
    case VitalTime.Minutes165:
      !isGood && setCurrentTimeSlot(VitalTime.Minutes180)
      return {
        disable: isGood,
        showMessage: true,
        treatmentLabel: isGood
          ? '165 Minutes into Treatment'
          : '180 Minutes into Treatment',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        information: isGood
          ? '165 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.'
          : '165 minutes into treatment the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
        discharge: isGood,
      }
    case VitalTime.Minutes180:
      !isGood && setCurrentTimeSlot(VitalTime.Minutes180)
      return {
        disable: true,
        showMessage: true,
        treatmentLabel: '180 Minutes into Treatment',
        treatmentStatus: isGood
          ? TREATMENT_STATUS.Success
          : TREATMENT_STATUS.Error,
        information: isGood
          ? '180 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.'
          : '180 minutes into treatment the patient’s vital signs were assessed and their BP remains elevated. An internal medicine follow-up is recommended, and future treatment will not continue until BP is stabilized.',
        discharge: isGood,
      }
  }
  return {
    disable: false,
    showMessage: false,
    treatmentLabel: 'Prior to Treatment',
    discharge: false,
  }
}
