import { FieldValues } from 'react-hook-form'

export const formatDateTime = (data: FieldValues) => {
  const { year, month, day } = data.date
  const [hours, minutes] = data.time.split(':').map(Number)
  const formattedDate = new Date(Date.UTC(year, month - 1, day, hours, minutes))

  return formattedDate.toISOString()
}

export const formatValue = (value: string): string => {
  const regex = /\(([^()]+)\)/
  const match = regex.exec(value)
  if (!match) return value

  const extracted = match[1]

  const formatted = extracted
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  return formatted
}
