import { AppointmentType } from '@psychplus-v2/constants'
import {
  AppointmentsCacheEntry,
  LocationProvidersFilterState,
} from '@psychplus-v2/types'

const getAppointmentCacheKey = ({
  appointmentType,
  providerType,
  startingDate,
  zipCode = 'none',
  location,
  state,
  maxDistanceInMiles = '20',
}: LocationProvidersFilterState) => {
  const locationKey = location ? 'location' : 'none'
  const maxDistanceKey =
    appointmentType === AppointmentType.InPerson ? maxDistanceInMiles : 'none'
  return `${appointmentType}:${providerType}:${startingDate}:${zipCode}:${locationKey}:${state}:${maxDistanceKey}`
}

function isAppointmentsFreshEntry<T>(
  entry: AppointmentsCacheEntry<T> | undefined,
  maxAgeMs: number,
): entry is AppointmentsCacheEntry<T> {
  if (entry === undefined) return false

  return Date.now() - entry.timestamp < maxAgeMs
}

export { getAppointmentCacheKey, isAppointmentsFreshEntry }
