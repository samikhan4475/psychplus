import { TherapySchemaType } from '../therapy-schema'

const getInitialValues = (): TherapySchemaType => ({
  therapyTimeSpent: '',
  timeRangeOne: '',
  timeRangeTwo: '',
  timeRangeThree: '',
  therapySessionParticipants: '',
  patientOther: '',
  therapyDetailsModality: [],
  therapyDetailsInterventions: [],
  additionalTherapyDetail: '',
})

const SESSION_PARTICIPANT_OPTIONS = [
  { label: 'Patients', value: 'Patients' },
  {
    label: 'Patient with Patient/Guardian',
    value: 'PatientwithPatient/Guardian',
  },
  { label: 'Patient & Partner', value: 'Patient&Partner' },
  { label: 'Patient & Family', value: 'Patient&Family' },
  { label: 'Patient and Other', value: 'Patient&Other' },
]

export { getInitialValues, SESSION_PARTICIPANT_OPTIONS }
