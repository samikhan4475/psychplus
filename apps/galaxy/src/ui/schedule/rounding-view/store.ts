import { getLocalTimeZone, today } from '@internationalized/date'
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
import { getBookedAppointmentsAction } from '../actions'
import {
  addSelfUserSettings,
  getSelfUserSettings,
  getUnitsGroupsAction,
  updateSelfUserSetting,
} from '../client-actions'
import {
  CategoryValue,
  ROUNDING_VIEW_COLUMNS,
  ROUNDING_VIEW_FILTERS_KEY,
} from '../constants'
import { AppointmentParams, GetUnitsGroupsResponse } from '../types'
import {
  getCalendarDateFromUtc,
  getDateString,
  getStringifiedValue,
  getUtcDateWithoutTime,
} from '../utils'
import { transformSettingToParams } from './transform'

interface Store {
  columnsStore: string[]
  appointments: Appointment[]
  data: GetUnitsGroupsResponse
  error?: string
  loading?: boolean
  isSettingsSaving?: boolean
  formData?: AppointmentParams
  persistedFormData?: AppointmentParams
  setting?: UserSetting
  settingMap: Map<string, UserSetting>
  page: number
  totalRecords: number
  pageCache: Record<number, Appointment[]>
  setColumnsStore: (columns: string[]) => void
  fetchAppointments: (
    body?: AppointmentParams,
    page?: number,
    reset?: boolean,
  ) => void
  fetchUnitsAndGroups: (arg: string[]) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  fetchUserSetting: () => Promise<Map<string, UserSetting> | undefined>
  fetchAppointmentsWithSettings: (map: Map<string, UserSetting>) => void
  updateUserFilterSettings: (params: AppointmentParams) => void
  setPersistedFormData: (data: AppointmentParams) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      columnsStore: ROUNDING_VIEW_COLUMNS,
      appointments: [],
      data: { serviceGroups: [], serviceUnits: [], serviceRooms: [] },
      formData: undefined,
      persistedFormData: undefined,
      setting: undefined,
      settingMap: new Map<string, UserSetting>(),
      page: 1,
      totalRecords: 0,
      pageCache: {},
      error: undefined,
      loading: undefined,
      isSettingsSaving: false,
      setColumnsStore: (columns: string[]) => {
        set({
          columnsStore: columns,
        })
      },
      fetchAppointments: async (body, page = 1, reset = true) => {
        set({
          error: undefined,
          loading: true,
          formData: body,
        })
        const startingDate = body?.startingDate
          ? body.startingDate
          : getDateString(today(getLocalTimeZone()))
        const requestBody = {
          includePatientTransactions: true,
          isServiceTimeDependant: false,
          ...(body ?? {}),
        }
        const lastCoverageDateStart = getUtcDateWithoutTime(
          getCalendarDateFromUtc(requestBody.lastCoverageDateStart),
        )
        const lastCoverageDateEnd = getUtcDateWithoutTime(
          getCalendarDateFromUtc(requestBody.lastCoverageDateEnd),
        )
        const sanitizedBody = sanitizeFormData({
          ...requestBody,
          startingDate,
          lastCoverageDateStart,
          lastCoverageDateEnd,
        })
        const result = await getBookedAppointmentsAction(sanitizedBody, page)
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to retrieve appointments')
          return set({
            error: result.error,
            loading: false,
          })
        }

        set({
          appointments: result.data,
          loading: false,
          totalRecords: result.total,
          pageCache: reset
            ? { [page]: result.data }
            : { ...get().pageCache, [page]: result.data },
          page,
        })
      },
      fetchUnitsAndGroups: async (serviceIds) => {
        set({
          error: undefined,
        })
        const result = await getUnitsGroupsAction(serviceIds)
        if (result.state === 'error') {
          toast.error('Failed to retrieve units, groups, and rooms')
          return set({
            error: result.error,
          })
        }

        set({
          data: result.data,
        })
      },
      next: () => {
        const page = get().page + 1
        if (get().pageCache[page]) {
          return set({
            appointments: get().pageCache[page],
            page,
          })
        }
        get().fetchAppointments(get().formData, page, false)
      },
      prev: () => {
        const page = get().page - 1
        if (get().pageCache[page]) {
          return set({
            appointments: get().pageCache[page],
            page,
          })
        }
        get().fetchAppointments(get().formData, page, false)
      },
      jumpToPage: (page) => {
        if (page < 1) return
        if (get().pageCache[page]) {
          return set({
            appointments: get().pageCache[page],
            page,
          })
        }
        get().fetchAppointments(get().formData, page, false)
      },
      fetchUserSetting: async () => {
        const result = await getSelfUserSettings(CategoryValue.RoundingView)
        const map = new Map<string, UserSetting>()
        if (result.state === 'error') {
          toast.error(result.error || 'Failed to fetch user settings')
          return
        }
        result.data.forEach((setting) => {
          const key = setting.name
          map.set(key, setting)
        })

        set({
          settingMap: map,
        })
        return map
      },
      fetchAppointmentsWithSettings: (map) => {
        let shouldFetchData = false
        map.forEach((value) => {
          if (value.content !== NULL_CONTENT) {
            shouldFetchData = true
          }
        })
        if (shouldFetchData) {
          const filterValues = transformSettingToParams(map)
          get().fetchAppointments(filterValues)
        }
      },
      updateUserFilterSettings: async (params: AppointmentParams) => {
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
              categoryValue: CategoryValue.RoundingView,
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
    }),
    {
      name: ROUNDING_VIEW_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        persistedFormData: state.persistedFormData,
      }),
      skipHydration: true,
    },
  ),
)

export { useStore }
