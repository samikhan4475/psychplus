import { format } from 'date-fns'
import { SnomedCode } from '@psychplus/health-concerns'
import { OptionType } from '..'

const transformSnomedData = (data: SnomedCode[]) => {
  const transformedData = data
    .map((item, index) => ({
      ...item,
      description: item.displayName, // Update displayName to description
      id: (index + 1), // Add a new key "id" with the index + 1
    }))
    .map(({ displayName, ...item }) => item) // Remove displayName from each object

  return transformedData
}

const TIMES: OptionType[] = []

for (let i = 0; i < 24; i++) {
  const hour = i % 12 || 12 // Convert to 12-hour format (12 instead of 0)
  const minute = '00'
  const ampm = i < 12 ? 'AM' : 'PM'
  TIMES.push({
    value: `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`,
    label: `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`,
  })
}

const formatDateTime = (date: string, time: string): string => {
  const [hourString, minute, ampm] = time.split(/[: ]/)
  let hour = parseInt(hourString, 10)

  if (ampm === 'PM' && hour !== 12) {
    hour += 12
  } else if (ampm === 'AM' && hour === 12) {
    hour = 0
  }

  // Create a new Date object and explicitly set the time components (assuming UTC)
  const dateObject = new Date(date)
  dateObject.setUTCHours(hour)
  dateObject.setUTCMinutes(parseInt(minute, 10))
  dateObject.setUTCSeconds(0)

  // Directly convert to ISO string with 'Z' for UTC (no timezone conversion needed)
  const formattedDateTime = format(dateObject, "yyyy-MM-dd'T'HH:mm:ss'Z'")

  return formattedDateTime
}

export { transformSnomedData, TIMES, formatDateTime }
