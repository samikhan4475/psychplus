import { ContactMadeStatuses } from '@/types'

const getDefaultPayload = () => ({
  contactStatusList: [
    ContactMadeStatuses.NotSet,
    ContactMadeStatuses.Pending,
    ContactMadeStatuses.AuthInProcess,
    ContactMadeStatuses.AttemptedContact,
    ContactMadeStatuses.Refused,
    ContactMadeStatuses.Scheduled,
    ContactMadeStatuses.Cancelled,
    ContactMadeStatuses.Admitted,
    ContactMadeStatuses.SecondAttempt,
    ContactMadeStatuses.ThirdAttempt,
  ],
})

export { getDefaultPayload }
