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
  switch (currentTimeSlot) {
    case VitalTime.PriorTreatment:
      if (isCurrentVitalsGood === VitalsStatus.GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes40)
        return {
          disable: false,
          showMessage: true,
          treatmentLabel: '40 Minutes into Treatment',
          information:
            "Prior to treatment, the patient's vital signs were assessed and it was determined safe to proceed with treatment.",
          treatmentStatus: TREATMENT_STATUS.Success,
          discharge: false,
        }
      }
      return {
        disable: false,
        showMessage: true,
        treatmentLabel: 'Prior to Treatment',
        information:
          'Prior to treatment, the patient’s vital signs were assessed and it was determined UNSAFE to proceed with treatment.',
        treatmentStatus: TREATMENT_STATUS.Error,
        discharge: false,
      }
    case VitalTime.Minutes40:
      if (isCurrentVitalsGood === VitalsStatus.NOT_GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes120)
        return {
          disable: false,
          showMessage: true,
          treatmentLabel: '120 Minutes into Treatment',
          information:
            'Prior to discharge the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
          treatmentStatus: TREATMENT_STATUS.Error,
          discharge: false,
        }
      } else {
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '40 Minutes into Treatment',
          treatmentStatus: TREATMENT_STATUS.Success,
          information:
            'Prior to discharge the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.',
          discharge: true,
        }
      }
    case VitalTime.Minutes120:
      if (isCurrentVitalsGood === VitalsStatus.NOT_GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes135)
        return {
          disable: false,
          showMessage: true,
          treatmentLabel: '135 Minutes into Treatment',
          information:
            'Prior to discharge the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
          treatmentStatus: TREATMENT_STATUS.Error,
          discharge: false,
        }
      } else {
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '120 Minutes into Treatment',
          treatmentStatus: TREATMENT_STATUS.Success,
          information:
            'Prior to discharge the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.',
          discharge: true,
        }
      }
    case VitalTime.Minutes135:
      if (isCurrentVitalsGood === VitalsStatus.NOT_GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes150)
        return {
          disable: false,
          showMessage: true,
          treatmentLabel: '150 Minutes into Treatment',
          information:
            '135 minutes into treatment the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
          treatmentStatus: TREATMENT_STATUS.Error,
          discharge: false,
        }
      } else {
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '135 Minutes into Treatment',
          treatmentStatus: TREATMENT_STATUS.Success,
          information:
            '135 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.',
          discharge: true,
        }
      }
    case VitalTime.Minutes150:
      if (isCurrentVitalsGood === VitalsStatus.NOT_GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes165)
        return {
          disable: false,
          showMessage: true,
          treatmentLabel: '165 Minutes into Treatment',
          information:
            '150 minutes into treatment the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
          treatmentStatus: TREATMENT_STATUS.Error,
          discharge: false,
        }
      } else {
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '150 Minutes into Treatment',
          treatmentStatus: TREATMENT_STATUS.Success,
          information:
            '150 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.',
          discharge: true,
        }
      }
    case VitalTime.Minutes165:
      if (isCurrentVitalsGood === VitalsStatus.NOT_GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes180)
        return {
          disable: false,
          showMessage: true,
          treatmentLabel: '180 Minutes into Treatment',
          information:
            '165 minutes into treatment the patient’s vital signs were assessed and it was determined NOT safe for the patient to be discharged.',
          treatmentStatus: TREATMENT_STATUS.Error,
          discharge: false,
        }
      } else {
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '165 Minutes into Treatment',
          treatmentStatus: TREATMENT_STATUS.Success,
          information:
            '165 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.',
          discharge: true,
        }
      }
    case VitalTime.Minutes180:
      if (isCurrentVitalsGood === VitalsStatus.NOT_GOOD) {
        setCurrentTimeSlot(VitalTime.Minutes180)
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '180 Minutes into Treatment',
          information:
            '180 minutes into treatment the patient’s vital signs were assessed and their BP remains elevated. An internal medicine follow-up is recommended, and future treatment will not continue until BP is stabilized.',
          treatmentStatus: TREATMENT_STATUS.Error,
          discharge: false,
        }
      } else {
        return {
          disable: true,
          showMessage: true,
          treatmentLabel: '180 Minutes into Treatment',
          treatmentStatus: TREATMENT_STATUS.Success,
          information:
            '180 minutes into treatment the patient’s vital signs were assessed and it was determined safe for the patient to be discharged.',
          discharge: true,
        }
      }
  }
  return {
    disable: false,
    showMessage: false,
    treatmentLabel: 'Prior to Treatment',
    discharge: false,
  }
}
