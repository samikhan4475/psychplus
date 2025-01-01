import {
  FamilyTherapySchemaType,
  TherapySessionParticipantsEnum,
} from '../therapy-schema'

const getFamilyInitialValues = (): FamilyTherapySchemaType => ({
  therapyTimeSpent: 'timeRangeOne',
  timeRangeOne: '40',
  therapySessionParticipants: TherapySessionParticipantsEnum.Values.FamilyWithOutPatientPresent,
  therapyDetailsModality: [],
  therapyDetailsInterventions: [],
  additionalTherapyDetail: '',
})

const FAMILY_SESSION_PARTICIPANT_OPTIONS = [
  {
    label: 'Family with OUT patient present',
    value: 'FamilyWithOutPatientPresent',
  },
  {
    label: 'Family WITH patient present',
    value: 'FamilyWithPatientPresent',
  },
]

export { getFamilyInitialValues, FAMILY_SESSION_PARTICIPANT_OPTIONS }
