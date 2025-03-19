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
import { AddSelfUserSettingBody, Appointment, UserSetting } from '@/types'
import { sanitizeFormData } from '@/utils'
import {
  addSelfUserSettings,
  getSelfUserSettings,
  getUnitsGroupsAction,
  updateSelfUserSetting,
} from '../client-actions'
import { CategoryValue, PROVIDER_CODING_VIEW_FILTERS_KEY } from '../constants'
import { AppointmentDate } from '../scheduler-view/types'
import { AppointmentParams, GetUnitsGroupsResponse } from '../types'
import {
  getCalendarDateFromUtc,
  getStringifiedValue,
  getUtcDateWithoutTime,
} from '../utils'
import { getAppointmentsAction } from './actions/get-appointments'
import { transformSettingToParams } from './transform'
import { DayString, MergedRecord, WeekDay, WeekdayData } from './types'
import { extractWeekDay } from './util'

interface Store {
  data?: MergedRecord[]
  error?: string
  loading?: boolean
  isSettingsSaving?: boolean
  tableFilters: string[]
  currentWeekDays: WeekDay[]
  dates: AppointmentDate[]
  unitsandgroupslist: GetUnitsGroupsResponse
  formData: AppointmentParams
  persistedFormData?: AppointmentParams
  setting?: UserSetting
  settingMap: Map<string, UserSetting>
  fetchProviderCodingView: (formValues?: AppointmentParams) => void
  generateCurrentWeekDays: (value: Date) => void
  setDates: (value: Date) => void
  fetchUnitsAndGroups: (arg: string[]) => void
  setFormData: (data: AppointmentParams) => void
  fetchUserSetting: () => Promise<Map<string, UserSetting> | undefined>
  fetchAppointmentsWithSettings: (map: Map<string, UserSetting>) => void
  updateUserFilterSettings: (params: AppointmentParams) => void
  setPersistedFormData: (params: AppointmentParams) => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      data: [],
      error: undefined,
      loading: false,
      isSettingsSaving: false,
      formData: {},
      settingMap: new Map<string, UserSetting>(),
      tableFilters: [],
      currentWeekDays: [],
      dates: [],
      unitsandgroupslist: {
        serviceGroups: [],
        serviceUnits: [],
        serviceRooms: [],
      },

      generateCurrentWeekDays: (startDate) => {
        const weekDays = []
        const firstDayOfWeek = new Date(startDate)
        const dayOfWeek = firstDayOfWeek.getDay()
        const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
        firstDayOfWeek.setDate(startDate.getDate() + offset)
        for (let i = 0; i < 7; i++) {
          const date = new Date(firstDayOfWeek)
          date.setDate(firstDayOfWeek.getDate() + i)
          const dayLabel = date.toLocaleString('default', {
            weekday: 'short',
          }) as DayString
          const formattedDate = `${dayLabel} ${
            date.getMonth() + 1
          }/${date.getDate()}`

          weekDays.push({ id: formattedDate, label: formattedDate })
        }
        set({ currentWeekDays: weekDays })
      },

      fetchProviderCodingView: async (formValues) => {
        const dates = get().dates
        const startDateUtc = dates[0].date.toISOString()
        const {
          startingDate,
          lastCoverageDateStart,
          lastCoverageDateEnd,
          ...rest
        } = formValues ?? {}
        const startDate = startingDate ?? startDateUtc
        const lcdStartDateOnly = getUtcDateWithoutTime(
          getCalendarDateFromUtc(lastCoverageDateStart),
        )
        const lcdEndDateOnly = getUtcDateWithoutTime(
          getCalendarDateFromUtc(lastCoverageDateEnd),
        )
        const payload = {
          startingDate: startDate,
          includePatientTransactions: true,
          lastCoverageDateStart: lcdStartDateOnly,
          lastCoverageDateEnd: lcdEndDateOnly,
          ...rest,
        }
        set({
          error: undefined,
          loading: true,
          formData: formValues,
        })

        const result = await getAppointmentsAction(sanitizeFormData(payload))
        if (result.state === 'error') {
          toast.error(
            result.error || 'Error while fetching Provider coding view',
          )
          return set({
            error: result.error,
            loading: false,
          })
        }
        set({
          data: mergeDataByFacilityAdmissionId(result.data),
          loading: false,
        })
      },

      updateTableFilters: (filters: string[]) => {
        set({
          tableFilters: filters,
        })
      },

      setDates: (startDate) => {
        set({
          dates: createDays(startDate),
        })
        get().generateCurrentWeekDays(startDate)
      },

      fetchUnitsAndGroups: async (serviceIds) => {
        set({
          error: undefined,
        })
        const result = await getUnitsGroupsAction(serviceIds)
        if (result.state === 'error') {
          toast.error('Failed to retrieve units and groups')
          return set({
            error: result.error,
          })
        }

        set({
          unitsandgroupslist: result.data,
        })
      },

      setFormData: (data) => {
        set({
          formData: data,
        })
      },

      fetchUserSetting: async () => {
        const result = await getSelfUserSettings(
          CategoryValue.ProviderCodingView,
        )
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

      fetchAppointmentsWithSettings: (map) => {
        const filterValues = transformSettingToParams(map)
        get().fetchProviderCodingView(filterValues)
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
              categoryValue: CategoryValue.ProviderCodingView,
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
      name: PROVIDER_CODING_VIEW_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        persistedFormData: state.persistedFormData,
      }),
      skipHydration: true,
    },
  ),
)

const createDays = (startDate: Date): AppointmentDate[] => {
  const dates = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 6),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

const mergeDataByFacilityAdmissionId = (
  data: Appointment[],
): MergedRecord[] => {
  const mergedData: MergedRecord[] = []
  const map = new Map<string, MergedRecord>()

  data.forEach((record) => {
    const {
      facilityAdmissionId,
      appointmentDate,
      diagnosis,
      visitMedium,
      visitSequence,
      visitStatus,
      visitType,
      noteSignedStatus,
      providerType,
      isPrimaryProviderType,
      cptCodes,
      appointmentId,
      ...otherFields
    } = record

    const timezone = otherFields.locationTimezoneId
    const weekdayName = extractWeekDay(appointmentDate, timezone)

    if (facilityAdmissionId === undefined) {
      return
    }

    const newRecord: MergedRecord = {
      facilityAdmissionId,
      appointmentDate,
      providerType,
      ...otherFields,
      weekDays: {
        [weekdayName]: {
          diagnosis: diagnosis ? [...diagnosis] : [],
          visitMedium,
          visitSequence,
          appointmentId,
          isPrimaryProviderType,
          visitStatus,
          visitType,
          noteSignedStatus,
          cptCodes: cptCodes || [],
        } as WeekdayData,
      },
    }
    const key = `${facilityAdmissionId}-${providerType}`
    if (!map.has(key)) {
      map.set(key, newRecord)
    } else {
      const existingRecord = map.get(key)

      if (existingRecord) {
        if (existingRecord.weekDays[weekdayName]) {
          existingRecord.weekDays[weekdayName].diagnosis.push(
            ...(diagnosis || []),
          )
          existingRecord.weekDays[weekdayName].visitMedium = visitMedium
          existingRecord.weekDays[weekdayName].visitSequence = visitSequence
          existingRecord.weekDays[weekdayName].appointmentId = appointmentId
          existingRecord.weekDays[weekdayName].visitStatus = visitStatus
          existingRecord.weekDays[weekdayName].isPrimaryProviderType =
            isPrimaryProviderType
          existingRecord.weekDays[weekdayName].visitType = visitType
          existingRecord.weekDays[weekdayName].noteSignedStatus =
            noteSignedStatus
          existingRecord.weekDays[weekdayName].cptCodes = cptCodes || []
        } else {
          existingRecord.weekDays[weekdayName] = {
            diagnosis: diagnosis ? [...diagnosis] : [],
            visitMedium,
            visitSequence,
            appointmentId,
            visitStatus,
            isPrimaryProviderType,
            visitType,
            noteSignedStatus,
            cptCodes: cptCodes || [],
          } as WeekdayData
        }
      }
    }
  })

  map.forEach((value) => {
    mergedData.push(value)
  })

  return mergedData
}

export { useStore }
