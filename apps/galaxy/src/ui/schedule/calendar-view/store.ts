import { DateValue } from '@internationalized/date'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  CategoryCode,
  LevelCode,
  NULL_CONTENT,
  SettingStatusCode,
} from '@/constants'
import { AddSelfUserSettingBody, Appointment, UserSetting } from '@/types'
import { sanitizeFormData } from '@/utils'
import { getBookedAppointmentsAction, getUserSettingsAction } from '../actions'
import {
  addSelfUserSettings,
  getSelfUserSettings,
  updateSelfUserSetting,
} from '../client-actions'
import { CALENDAR_VIEW_FILTERS_KEY, CategoryValue } from '../constants'
import { AppointmentParams, AvailableSlotsEvent } from '../types'
import {
  convertToZonedDate,
  getCurrentWeekStartDate,
  getDateString,
  getNextWeekStart,
  getPreviousWeekStart,
  getStringifiedValue,
} from '../utils'
import { transformSettingToParams } from './transform'
import { UserSetting as GlobalUserSetting } from '../types'
import { format } from 'date-fns'

interface Store {
  data: AvailableSlotsEvent<Appointment>[]
  appointmentsMap: Map<string, AvailableSlotsEvent<Appointment>[]>
  weekStartDate: DateValue
  error?: string
  loading?: boolean
  isSettingsSaving?: boolean
  formData?: AppointmentParams
  persistedFormData?: AppointmentParams
  setting?: UserSetting
  preferredSettings?: GlobalUserSetting
  settingMap: Map<string, UserSetting>
  fetchData: (body?: AppointmentParams) => void
  fetchWeekOnNavigate: (start: DateValue, end: DateValue) => void
  addWeek: () => void
  subtractWeek: () => void
  setStartDate: (date: DateValue) => void
  fetchUserSetting: () => Promise<Map<string, UserSetting> | undefined>
  fetchDataWithSettings: (map: Map<string, UserSetting>) => void
  updateUserFilterSettings: (params: AppointmentParams) => void
  setPersistedFormData: (data: AppointmentParams) => void
  fetchUserSettings: () => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      data: [],
      lastAppliedFilters: undefined,
      appointmentsMap: new Map(),
      error: undefined,
      loading: undefined,
      isSettingsSaving: false,
      formData: undefined,
      persistedFormData: undefined,
      setting: undefined,
      preferredSettings: undefined,
      settingMap: new Map<string, UserSetting>(),
      weekStartDate: getCurrentWeekStartDate(),
      fetchUserSettings: async () => {
        const result = await getUserSettingsAction()
        if (result.state === 'error') {
          return toast.error(result.error)
        }
        const preferredTimezone = result?.data.find(setting => setting.name === 'TimeZoneId')
        set({ preferredSettings: preferredTimezone })
      },
      fetchData: async (body) => {
        set({
          error: undefined,
          loading: true,
          formData: body,
        })
        const { preferredSettings, weekStartDate, appointmentsMap } = get()
        if (!preferredSettings) {
          await get().fetchUserSettings()
        }
        const updatedPreferredSettings = get().preferredSettings
        const startingDate = getDateString(weekStartDate)
        const endingDate = getDateString(weekStartDate.add({ days: 7 }))
        const params = { startingDate, endingDate, ...(body ?? {}) }
        const result = await getBookedAppointmentsAction({
          ...params,
          isServiceTimeDependant: true,
          isShowActiveVisits: true,
        })
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to retrieve appointments')
          return set({
            error: result.error,
            loading: false,
          })
        }
        // revalidate cache on filter
        appointmentsMap.clear()
        const key = `${startingDate}-${endingDate}`
        const transformedData = transformInBookedAppointments(result.data, updatedPreferredSettings?.content)
        appointmentsMap.set(key, transformedData)
        set({
          loading: false,
          data: transformInBookedAppointments(result.data, updatedPreferredSettings?.content),
        })
      },
      fetchWeekOnNavigate: async (start, end) => {
        set({
          error: undefined,
          loading: true,
        })
        const startingDate = getDateString(start)
        const endingDate = getDateString(end)
        const { formData, appointmentsMap, preferredSettings } = get()
        const key = `${startingDate}-${endingDate}`
        if (appointmentsMap.has(key)) {
          return set({
            loading: false,
            data: appointmentsMap.get(key),
          })
        }
        const result = await getBookedAppointmentsAction({
          startingDate,
          endingDate,
          isServiceTimeDependant: true,
          isShowActiveVisits: true,
          ...(formData ?? {}),
        })
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to retrieve appointments')
          return set({
            error: result.error,
            loading: false,
          })
        }
        const transformedData = transformInBookedAppointments(result.data, preferredSettings?.content)
        appointmentsMap.set(key, transformedData)
        set({
          loading: false,
          data: transformedData,
        })
      },
      addWeek: () => {
        const { weekStartDate: currentStartDate, fetchWeekOnNavigate } = get()
        const nextWeekStart = getNextWeekStart(currentStartDate)
        set({
          weekStartDate: nextWeekStart,
        })
        fetchWeekOnNavigate(nextWeekStart, nextWeekStart.add({ days: 7 }))
      },
      subtractWeek: () => {
        const { weekStartDate: currentStartDate, fetchWeekOnNavigate } = get()
        const previousWeekStart = getPreviousWeekStart(currentStartDate)
        set({
          weekStartDate: previousWeekStart,
        })
        fetchWeekOnNavigate(
          previousWeekStart,
          previousWeekStart.add({ days: 7 }),
        )
      },
      setStartDate: (date: DateValue) => {
        set({
          weekStartDate: date,
        })
      },
      fetchUserSetting: async () => {
        const result = await getSelfUserSettings(CategoryValue.CalendarView)
        const map = new Map<string, UserSetting>()
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to fetch user settings')
          return
        }
        result.data.forEach((setting) => {
          map.set(setting.name, setting)
        })
        set({
          settingMap: map,
        })
        return map
      },
      fetchDataWithSettings: (map) => {
        const params = transformSettingToParams(map)
        get().fetchData(params)
      },
      updateUserFilterSettings: async (params) => {
        set({
          isSettingsSaving: true,
        })
        const newSettings: AddSelfUserSettingBody[] = []
        const settingsToUpdate: UserSetting[] = []
        let allSettings: UserSetting[] = []
        const map = get().settingMap
        const sanitizedData = sanitizeFormData(params)
        const modifiedFields = Object.entries(sanitizedData)

        modifiedFields.forEach(([key, value]) => {
          if (map.has(key)) {
            const setting = map.get(key) as UserSetting
            settingsToUpdate.push({
              ...setting,
              content: getStringifiedValue(value),
            })
          } else {
            newSettings.push({
              settingStatusCode: SettingStatusCode.Active,
              levelCode: LevelCode.User,
              categoryCode: CategoryCode.FilterDefault,
              categoryValue: CategoryValue.CalendarView,
              name: key,
              content: getStringifiedValue(value),
            })
          }
        })

        map.forEach((setting, key) => {
          if (key in sanitizedData) return
          settingsToUpdate.push({
            ...setting,
            content: NULL_CONTENT,
          })
        })

        const settingsUpdated = updateSelfUserSetting(settingsToUpdate)
        const settingsCreated = addSelfUserSettings(newSettings)
        const settingsResult = await Promise.all([
          settingsUpdated,
          settingsCreated,
        ])
        const isSuccessful = settingsResult.every(
          (result) => result.state === 'success',
        )
        if (isSuccessful) {
          toast.success('Filters selections saved')
        }

        for (const result of settingsResult) {
          if (result.state === 'error') {
            toast.error(result.error || 'Failed to saved selected filters')
            break
          }
          allSettings = [...allSettings, ...result.data]
        }
        allSettings.forEach((setting) => {
          map.set(setting.name, setting)
        })
        set({
          isSettingsSaving: false,
        })
      },
      setPersistedFormData: (data) => {
        set({
          persistedFormData: data,
        })
      },
    }),
    {
      name: CALENDAR_VIEW_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        persistedFormData: state.persistedFormData,
      }),
      skipHydration: true,
    },
  ),
)

const transformInBookedAppointments = (data: Appointment[], preferredTimezone?: string) =>
  data.map((appointment) => {
    const duration = appointment.appointmentDuration ?? 20
    const start = convertToZonedDate(
      appointment.appointmentDate,
      preferredTimezone ? preferredTimezone : appointment.locationTimezoneId,
    )
    const locationStartTime = convertToZonedDate(
      appointment.appointmentDate,
      appointment.locationTimezoneId,
    )
    const formattedLocationStartTime = format(new Date(locationStartTime), 'HH:mm')

    const end = new Date(start.getTime() + duration * 60000)
    const locationEndDate = new Date(locationStartTime.getTime() + duration * 60000)
    const formattedLocationEndTime = format(new Date(locationEndDate), 'HH:mm')

    const title = `${appointment.name} (${appointment.visitType}) Location Time: ${formattedLocationStartTime} - ${formattedLocationEndTime}`

    return {
      start,
      end,
      title,
      data: {
        ...appointment,
      },
    }
  })

export { useStore }
