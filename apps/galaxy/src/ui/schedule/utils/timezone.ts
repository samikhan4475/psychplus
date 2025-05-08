import { SharedCode } from '@/types'
import { TIMEZONE_TYPES } from '../constants'

const getTimeZoneAbbreviation = (
  timeZone: string,
  codesets: SharedCode[],
): string | null => {
  const match = codesets?.find((code) => timeZone === code.value)
  return match ? match.display : null
}

const getPreferredTimezone = (
  timezoneSelected: TIMEZONE_TYPES,
  locationTimezoneId: string,
  providerPreferredTimezone?: string,
) => {
  //* Returns provider timezone if selected and set; otherwise, returns location timezone.
  const timeZoneId =
    timezoneSelected === TIMEZONE_TYPES.LOCATION_PREFERRED
      ? locationTimezoneId
      : providerPreferredTimezone

  return timeZoneId ?? locationTimezoneId
}

export { getTimeZoneAbbreviation, getPreferredTimezone }
