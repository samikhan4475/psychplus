import type { ConfirmationNote } from '@/widgets/schedule-appointment-list/types'

export const VERSION = '1.0.0'

export const confirmationNotes: ConfirmationNote[] = [
  {
    appointmentType: 'In-Person',
    notes: [
      'Our appointment actually start on time, so please arrive 5 minutes prior to your scheduled appointment.',
      'If you need to reschedule or cancel your appointment, please do so at least 24 hours in advance online, on the app or by phone.',
      'No-show appointments may be charged a cancellation fee.',
    ],
  },
  {
    appointmentType: 'Virtual',
    notes: [
      'Our appointment start on time, so please join your virtual call 5 minutes prior to your scheduled appointment.',
      'If you need to reschedule or cancel your appointment, please do so at least 24 hours in advance online, on the app or by phone.',
      'No-show appointments may be charged a cancellation fee.',
      'You will receive an email with a link to join the virtual call at the time of your appointment.',
    ],
  },
]
