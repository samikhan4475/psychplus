import { ConfirmationNote } from '../types'

const CONFIRMATION_NOTES: ConfirmationNote[] = [
  {
    appointmentType: 'InPerson',
    notes: [
      'Our appointment actually start on time, so please arrive 5 minutes prior to your scheduled appointment.',
      'If you need to reschedule or cancel your appointment, please do so at least 24 hours in advance online, on the app or by phone.',
      'No-show appointments may be charged a cancellation fee.',
    ],
  },
  {
    appointmentType: 'TeleVisit',
    notes: [
      'Our appointment start on time, so please join your virtual call 5 minutes prior to your scheduled appointment.',
      'If you need to reschedule or cancel your appointment, please do so at least 24 hours in advance online, on the app or by phone.',
      'No-show appointments may be charged a cancellation fee.',
      'You will receive an email with a link to join the virtual call at the time of your appointment.',
    ],
  },
]

const CALENDER_ITEMS = [
  { google: 'Google' },
  { outlookcom: 'Outlook' },
  { apple: 'Apple' },
  { yahoo: 'Yahoo!' },
]

const INSURANCE_DEPENDENT_DIAGNOSIS = ['F72', 'F73', 'F79']

export { CONFIRMATION_NOTES, CALENDER_ITEMS, INSURANCE_DEPENDENT_DIAGNOSIS }
