import { addDays, eachDayOfInterval, format } from 'date-fns'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  CategoryCode,
  LevelCode,
  NULL_CONTENT,
  SettingStatusCode,
} from '@/constants'
import { AddSelfUserSettingBody, UserSetting } from '@/types'
import { sanitizeFormData } from '@/utils'
import {
  addSelfUserSettings,
  getSelfUserSettings,
  updateSelfUserSetting,
} from '../client-actions'
import { CategoryValue, SCHEDULER_VIEW_FILTERS_KEY } from '../constants'
import { AvailableSlotsParams } from '../types'
import { getStringifiedValue } from '../utils'
import { searchAppointmentsAction } from './actions/search-appointments'
import { mergeRecords, transformSettingToParams } from './transform'
import { AppointmentAvailability, AppointmentDate } from './types'

interface Store {
  loading?: boolean
  error?: string
  isSettingsSaving?: boolean
  data: AppointmentAvailability[]
  formData?: AvailableSlotsParams & { intervalCount?: number }
  persistedFormData?: AvailableSlotsParams
  dates: AppointmentDate[]
  settingMap: Map<string, UserSetting>
  setDays?: (arg: Date) => void
  fetchAppointments: (params?: AvailableSlotsParams) => void
  setDates: (value: Date, noOfDays?: number) => AppointmentDate[]
  fetchUserSettings: () => Promise<Map<string, UserSetting> | undefined>
  fetchDataWithSettings: (map: Map<string, UserSetting>) => void
  updateUserFilterSettings: (params: AvailableSlotsParams) => void
  setPersistedFormData: (data: AvailableSlotsParams) => void
  fetchNextSlotsOnNavigation: (startDate: string) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      loading: undefined,
      error: undefined,
      isSettingsSaving: false,
      data: [],
      lastAppliedFilters: undefined,
      lastAppliedDateTimeFilters: undefined,
      formData: undefined,
      persistedFormData: undefined,
      dates: [],
      settingMap: new Map(),
      fetchAppointments: async (params) => {
        set({
          error: undefined,
          loading: true,
          formData: params,
        })
        const result = await searchAppointmentsAction(params ?? {})
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to retrieve available slots')
          return set({
            error: result.error,
            loading: false,
          })
        }

        set({
          data: result.data || [],
          loading: false,
        })
      },
      setDates: (startDate, noOfDays = 13) => {
        set({
          dates: createDays(startDate, noOfDays),
        })
        return createDays(startDate, noOfDays)
      },
      fetchUserSettings: async () => {
        const result = await getSelfUserSettings(CategoryValue.SchedulerView)
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
        delete params.endingDate
        get().fetchAppointments(params)
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
              categoryValue: CategoryValue.SchedulerView,
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
          toast.success('Filters selection saved')
        }
        for (const result of settingsResult) {
          if (result.state === 'error') {
            toast.error(result.error || 'Failed to save selected filters')
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
      fetchNextSlotsOnNavigation: async (startDate) => {
        set({
          error: undefined,
          loading: true,
        })
        const params = { ...(get().formData ?? {}) }
        const intervalCount = params.intervalCount ?? 1
        const result = await searchAppointmentsAction({
          ...params,
          maxDaysOutToLook: 90,
          startingDate: startDate,
        })
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to retrieve available slots')
          return set({
            error: result.error,
            loading: false,
          })
        }

        set({
          data: mergeRecords([...get().data, ...(result.data || [])]),
          loading: false,
          formData: { ...params, intervalCount: intervalCount + 1 },
        })
      },
    }),
    {
      name: SCHEDULER_VIEW_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        persistedFormData: state.persistedFormData,
      }),
      skipHydration: true,
    },
  ),
)

const createDays = (startDate: Date, noOfDays = 13): AppointmentDate[] => {
  const dates = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, noOfDays),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

export { useStore }
