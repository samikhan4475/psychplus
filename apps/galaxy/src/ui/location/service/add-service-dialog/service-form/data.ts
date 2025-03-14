import { Question } from '../../types'

const questions: Question[] = [
  {
    label: 'PsychPlus Policy Required',
    name: 'isPolicyRequired',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    label: 'EHR Use Preferences',
    name: 'billingUsageType',
    options: [
      { label: 'EHR + Coding', value: 'EHRCoding' },
      { label: 'Coding Only', value: 'CodingOnly' },
    ],
  },
  {
    label: 'Send provider reminder for notes',
    name: 'isReminderForNotes',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    label: 'Send patient reminder for visits',
    name: 'isReminderForVisit',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    label: 'Are patients potentially seen every day on this service',
    name: 'isPatientSeenEveryDay',
    locationType: 'Facility',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    label: 'Automatically bill for this service',
    name: 'isAutomaticBilling',
    disabled: true,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
]

export { questions }
