import { differenceInMinutes, format, parseISO } from 'date-fns'
import { DateValue } from 'react-aria-components'
import { SelectOptionType } from '@/types'
import { getLocalCalendarDate, sanitizeFormData } from '@/utils'
import { ForwardingSchemaType } from './forwarding-dialog'
import {
  ForwardingMessage,
  MessageForwardingRecipient,
  RecordStatus,
} from './types'

const generateTimeIntervals = (): SelectOptionType[] =>
  Array.from({ length: 72 }, (_, i) => {
    const minutes = i * 20
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    return { label: time, value: time }
  })

const getDuration = (
  fromDateTimeISO?: string,
  toDateTimeISO?: string,
): string => {
  if (!fromDateTimeISO || !toDateTimeISO) return 'N/A'
  const fromDateTime = parseISO(fromDateTimeISO)
  const toDateTime = parseISO(toDateTimeISO)
  const totalMinutes = differenceInMinutes(toDateTime, fromDateTime)
  const totalHours = totalMinutes / 60
  const days = Math.floor(totalHours / 24)
  const hours = (totalHours % 24).toFixed(0)
  return `${days}.${hours}`
}

const getCalculatedDuration = (
  startDateTime?: DateValue,
  endDateTime?: DateValue,
  fromTime?: string,
  toTime?: string,
) => {
  if (!startDateTime || !endDateTime || !fromTime || !toTime) return null
  const fromDateTime = parseISO(`${startDateTime}T${fromTime}`)
  const toDateTime = parseISO(`${endDateTime}T${toTime}`)
  const totalMinutes = differenceInMinutes(toDateTime, fromDateTime)
  const totalHours = totalMinutes / 60
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24
  return {
    value: parseFloat(`${days}.${hours.toFixed(2)}`),
  }
}

const getIsoStringtoUtcDateTime = (forwardingData?: ForwardingMessage) => {
  if (!forwardingData) {
    return undefined
  }
  const getDateTime = (isoDate: string) => ({
    date: getLocalCalendarDate(isoDate),
    time: format(parseISO(isoDate), 'HH:mm'),
  })
  const startDateTime = getDateTime(forwardingData.startDateTime)
  const endDateTime = getDateTime(forwardingData.endDateTime)
  return { startDateTime, endDateTime }
}

const getMessageForwardingRecipients = (
  messageForwardingRecipients: string[] = [],
  forwardingMessages: MessageForwardingRecipient[] = [],
  messageForwardingId?: string,
) =>
  messageForwardingRecipients?.map((recipients) =>
    sanitizeFormData({
      id:
        forwardingMessages?.find(
          (item) => item.recipientUserId === Number(recipients),
        )?.id ?? undefined,
      messageForwardingId: messageForwardingId ?? undefined,
      recipientUserId: Number(recipients),
    }),
  )

const getInitialValues = (
  forwardingData: ForwardingMessage | undefined,
  userId: number,
): Partial<ForwardingSchemaType> => {
  const dateValues = getIsoStringtoUtcDateTime(forwardingData)
  return {
    userId: forwardingData?.userId ?? userId,
    messageForwardingRecipients:
      forwardingData?.messageForwardingRecipients?.map((item) =>
        String(item?.recipientUserId),
      ) ?? [],
    startDateTime: dateValues?.startDateTime?.date ?? undefined,
    endDateTime: dateValues?.endDateTime?.date ?? undefined,
    fromTime: dateValues?.startDateTime.time ?? '',
    toTime: dateValues?.endDateTime.time ?? '',
    durationInDays: forwardingData?.duration ?? 0,
    recordStatus: forwardingData?.recordStatus ?? RecordStatus.Active,
  }
}

export {
  generateTimeIntervals,
  getCalculatedDuration,
  getDuration,
  getIsoStringtoUtcDateTime,
  getInitialValues,
  getMessageForwardingRecipients,
}
