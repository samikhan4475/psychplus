import {
  TherapySchemaType,
  TherapySessionParticipantsEnum,
} from '../therapy-schema'

const getInitialValues = (): TherapySchemaType => ({
  therapyTimeSpent: '',
  timeRangeOne: '',
  timeRangeTwo: '',
  timeRangeThree: '',
  therapySessionParticipants:
    TherapySessionParticipantsEnum.Values.PatientsOnly,
  patientOther: '',
  therapyDetailsModality: [],
  therapyDetailsInterventions: [],
  additionalTherapyDetail: '',
})

const SESSION_PARTICIPANT_OPTIONS = [
  { label: 'Patients Only', value: 'PatientsOnly' },
  {
    label: 'Patient with Parent/Guardian',
    value: 'PatientwithPatient/Guardian',
  },
  { label: 'Patient and Other', value: 'Patient&Other' },
]

export { getInitialValues, SESSION_PARTICIPANT_OPTIONS }
