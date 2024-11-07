import { getCalendarDate } from '@/utils'
import { PatientTransaction } from '../types'

const toTwoDecimalString = (value?: number): string =>
  value !== undefined && value !== null ? value.toFixed(2) : ''

const getInitialValues = (transaction?: Partial<PatientTransaction>) => ({
  type: transaction?.type ?? '',
  description: transaction?.description ?? '',
  chargeDate: transaction?.chargeDate
    ? getCalendarDate(transaction.chargeDate)
    : undefined,
  chargeTime: transaction?.chargeTime ?? '',

  balanceDue: toTwoDecimalString(transaction?.balanceDue),
  balancePreferredPartner: toTwoDecimalString(
    transaction?.balancePreferredPartner,
  ),
  balancePaid: toTwoDecimalString(transaction?.balancePaid),

  coPayDue: toTwoDecimalString(transaction?.coPayDue),
  coPayPaid: toTwoDecimalString(transaction?.coPayPaid),
  coPayPreferredPartner: toTwoDecimalString(transaction?.coPayPreferredPartner),

  coInsuranceDue: toTwoDecimalString(transaction?.coInsuranceDue),
  coInsurancePaid: toTwoDecimalString(transaction?.coInsurancePaid),
  coInsurancePreferredPartner: toTwoDecimalString(
    transaction?.coInsurancePreferredPartner,
  ),

  appointmentId: transaction?.appointmentId,
  transactionNumber: transaction?.transactionNumber ?? '',
})

export { toTwoDecimalString, getInitialValues }
