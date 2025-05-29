import { DateValue } from 'react-aria-components'
import { SharedCode } from '@/types'
import { formatDate, formatDateToISOString } from '@/utils'

const formatDateField = (date: DateValue): string =>
  date ? formatDate(formatDateToISOString(date) ?? '', 'yyyy-MM-dd') : ''

const isPreferredPartner = (code: SharedCode) =>
  (code.attributes ?? []).some(
    ({ name, value }) => name === 'Group' && value === 'PreferredPartner',
  )

const getPPStatuses = (
  paymentType: SharedCode[],
  membershipType: SharedCode[],
): SharedCode[] => {
  const preferredPayments = paymentType.filter(isPreferredPartner)

  return membershipType.toReversed().flatMap((member) =>
    preferredPayments.map((payment) => ({
      value: `${member.value}_${payment.value}`,
      display: `${member.display} + ${payment.display}`,
    })),
  )
}
export { formatDateField, getPPStatuses }
