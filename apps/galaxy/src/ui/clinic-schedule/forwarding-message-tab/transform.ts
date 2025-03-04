import { SelectOptionType, StaffResource } from '@/types'
import { getUtcDateTimeIsoString } from '@/ui/vacation/add-vacation/utils'
import { getPatientFullName, sanitizeFormData } from '@/utils'
import { ForwardingSchemaType } from './forwarding-dialog/forwarding-form'
import { ForwardingMessage } from './types'
import { getDuration, getMessageForwardingRecipients } from './utils'

const transformInStaffOptions = (data: StaffResource[]): SelectOptionType[] => {
  return data.map((item) => {
    const label = getPatientFullName(item?.legalName)
    return {
      label,
      value: String(item?.userId),
    }
  })
}

const transformInForwardings = (data: ForwardingMessage[] = []) =>
  data?.map((vacation) => ({
    ...vacation,
    duration: Number(getDuration(vacation.startDateTime, vacation.endDateTime)),
  }))

const transformOutForwarding = (
  {
    durationInDays,
    fromTime,
    toTime,
    startDateTime,
    endDateTime,
    messageForwardingRecipients,
    ...data
  }: ForwardingSchemaType,
  forwardingMessage?: ForwardingMessage,
): Partial<ForwardingMessage> =>
  sanitizeFormData({
    id: forwardingMessage?.id ?? undefined,
    startDateTime:
      getUtcDateTimeIsoString(fromTime, startDateTime) ?? undefined,
    endDateTime: getUtcDateTimeIsoString(toTime, endDateTime) ?? undefined,
    durationInDays: Number(durationInDays),
    messageForwardingRecipients: getMessageForwardingRecipients(
      messageForwardingRecipients,
      forwardingMessage?.messageForwardingRecipients,
      forwardingMessage?.id,
    ),
    ...data,
  })

export {
  transformOutForwarding,
  transformInStaffOptions,
  transformInForwardings,
}
