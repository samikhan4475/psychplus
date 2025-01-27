import { parseZonedDateTime } from '@internationalized/date'
import { FieldValues } from 'react-hook-form'
import { Cosigner } from '@/types'
import { SharedCode } from '@/types/codeset'

export function mapToUTCString(date: string): string {
  const parsedDateTime = parseZonedDateTime(date)
  return parsedDateTime.toAbsoluteString()
}

export const formatDateTime = (data: FieldValues) => {
  if (!data?.date || !data?.time) return ''
  const date = data.date
  const time = data.time

  if (!date || !time) return ''
  const { year, month, day } = date
  const { hour, minute, second, millisecond } = time

  const formattedDate = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second, millisecond),
  )

  return formattedDate.toISOString()
}

export const formatValue = (value?: string): string => {
  const regex = /\(([^()]+)\)/
  const match = regex.exec(value || '')
  if (!match) return value || ''

  const extracted = match[1]

  const formatted = extracted
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  return formatted
}

export const getDisplayByValue = (
  value: string,
  data: SharedCode[],
): string | undefined => {
  const foundItem = data.find((item) => item.value === value)
  return foundItem?.display
}

export const filterDefaultCosigner = (cosigners: Cosigner[]) => {
  return cosigners.find((item) => item?.isDefaultCosigner === true)
}

export const getFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}
