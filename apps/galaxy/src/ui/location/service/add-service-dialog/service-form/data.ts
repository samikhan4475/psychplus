import { SelectOptionType } from '@/types'
import { Question, Services } from '../../types'

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

const maxBookingFrequencyMap: Record<Services, string> = {
  [Services.Psychiatry]: '3',
  [Services.Therapy]: '1',
  [Services.CouplesFamilyTherapy]: '1',
  [Services.GroupTherapy]: '10',
}

const maxBookingDataMap: Record<
  Services,
  {
    options: SelectOptionType[]
    isDisabled?: boolean
  }
> = {
  [Services.Psychiatry]: {
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
    ],
  },
  [Services.Therapy]: {
    options: [{ label: '1', value: '1' }],

    isDisabled: true,
  },
  [Services.CouplesFamilyTherapy]: {
    options: [{ label: '1', value: '1' }],

    isDisabled: true,
  },
  [Services.GroupTherapy]: {
    options: [
      { label: '3', value: '3' },
      { label: '10', value: '10' },
    ],
  },
}

export { questions, maxBookingDataMap, maxBookingFrequencyMap }
