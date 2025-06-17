interface AppointmentsCacheEntry<T> {
  data: T
  timestamp: number
}
type AppointmentsCacheMap<T> = Record<string, AppointmentsCacheEntry<T>>
export type { AppointmentsCacheEntry, AppointmentsCacheMap }
