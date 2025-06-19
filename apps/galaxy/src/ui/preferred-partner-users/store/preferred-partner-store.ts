import { z } from 'zod'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PreferredPartnerUser, Sort } from '@/types'
import {
  activatePreferredPartnerUserAction,
  deactivatePreferredPartnerUserAction,
  linkPreferredPartnerUserPatientAction,
  searchPreferredPartnerUsersAction,
  updatePreferredPartnerUserAction,
} from '../actions'
import { preferredPartnerFiltersSchema } from '../blocks/schema'
import { preferredPartnerWorklistFiltersSchema } from '../blocks/worklist-schema'
import { transformOut } from './transform'
import { transformWorklistOut } from './worklist-transform'

export type PreferredPartnerFilters = z.infer<
  typeof preferredPartnerFiltersSchema
>

export type PreferredPartnerWorklistFilters = z.infer<
  typeof preferredPartnerWorklistFiltersSchema
>

const PREFERRED_PARTNER_FILTERS_KEY = 'preferred-partner-filters'

interface Store {
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  showFilters: boolean
  formValues?: Partial<PreferredPartnerFilters>
  pageCache: Record<number, PreferredPartnerUser[]>
  editMode: string | null
  tempEditData: Record<string, Partial<PreferredPartnerUser>>

  activeUsersData: PreferredPartnerUser[]
  activeUsersPage: number
  activeUsersPageCache: Record<number, PreferredPartnerUser[]>
  activeUsersLoading?: boolean
  activeUsersError?: string
  activeUsersTotal: number

  worklistData: PreferredPartnerUser[]
  worklistPage: number
  worklistPageCache: Record<number, PreferredPartnerUser[]>
  worklistLoading?: boolean
  worklistError?: string
  worklistFormValues?: Partial<PreferredPartnerWorklistFilters>
  worklistTotal: number

  totalCounts: {
    totalUsers: number
    totalFamilies: number
    totalCouples: number
    totalIndividuals: number
  }

  searchActiveUsers: (
    partnerId: string,
    formValues?: Partial<PreferredPartnerFilters>,
    page?: number,
    reset?: boolean,
  ) => Promise<void>
  searchWorklist: (
    partnerId: string,
    formValues?: Partial<PreferredPartnerWorklistFilters>,
    page?: number,
    reset?: boolean,
  ) => Promise<void>
  activateUser: (partnerId: string, userId: string) => Promise<void>
  deactivateUser: (partnerId: string, userId: string) => Promise<void>
  linkUser: (
    partnerId: string,
    userId: string,
    patientId: string,
  ) => Promise<void>
  updateUser: (
    partnerId: string,
    userId: string,
    data: PreferredPartnerUser,
  ) => Promise<void>
  toggleFilters: () => void
  setEditMode: (userId: string | null) => void
  updateTempData: (userId: string, field: string, value: string | Date) => void
  commitTempChanges: (partnerId: string, userId: string) => Promise<void>
  discardTempChanges: (userId: string) => void
  getTempUserData: (userId: string) => PreferredPartnerUser | undefined
  updateBothUserArrays: (incomingUsers: PreferredPartnerUser[]) => void
  updateSingleUserInBothArrays: (
    userId: string,
    userData: PreferredPartnerUser,
  ) => void
  calculateTotalCounts: (users: PreferredPartnerUser[]) => {
    totalUsers: number
    totalFamilies: number
    totalCouples: number
    totalIndividuals: number
  }
}

const usePreferredPartnerStore = create<Store>()(
  persist(
    (set, get) => ({
      error: undefined,
      loading: false,
      sort: undefined,
      page: 1,
      showFilters: true,
      formValues: undefined,
      pageCache: {},
      editMode: null,
      tempEditData: {},

      activeUsersData: [],
      activeUsersPage: 1,
      activeUsersPageCache: {},
      activeUsersLoading: false,
      activeUsersError: undefined,
      activeUsersTotal: 0,

      worklistData: [],
      worklistPage: 1,
      worklistPageCache: {},
      worklistLoading: false,
      worklistError: undefined,
      worklistFormValues: undefined,
      worklistTotal: 0,

      totalCounts: {
        totalUsers: 0,
        totalFamilies: 0,
        totalCouples: 0,
        totalIndividuals: 0,
      },
      toggleFilters: () => set({ showFilters: !get().showFilters }),

      setEditMode: (userId) => {
        if (userId === null) {
          set({ editMode: null, tempEditData: {} })
        } else {
          const currentUser =
            get().activeUsersData.find((user) => user.id === userId) ||
            get().worklistData.find((user) => user.id === userId)

          if (currentUser) {
            set({
              editMode: userId,
              tempEditData: { [userId]: { ...currentUser } },
            })
          }
        }
      },

      updateTempData: (userId, field, value) => {
        const currentTempData = get().tempEditData
        set({
          tempEditData: {
            ...currentTempData,
            [userId]: {
              ...currentTempData[userId],
              [field]: value,
            },
          },
        })
      },

      commitTempChanges: async (partnerId, userId) => {
        const tempData = get().tempEditData[userId]
        const originalUser =
          get().activeUsersData.find((user) => user.id === userId) ||
          get().worklistData.find((user) => user.id === userId)

        if (tempData && originalUser) {
          const completeUserData: PreferredPartnerUser = {
            ...originalUser,
            ...tempData,
          }

          await get().updateUser(partnerId, userId, completeUserData)
        }

        get().setEditMode(null)
      },

      discardTempChanges: (userId) => {
        const currentTempData = get().tempEditData
        const newTempData = { ...currentTempData }
        delete newTempData[userId]
        set({ editMode: null, tempEditData: newTempData })
      },

      getTempUserData: (userId) => {
        const tempData = get().tempEditData[userId]
        const originalUser =
          get().activeUsersData.find((user) => user.id === userId) ||
          get().worklistData.find((user) => user.id === userId)

        if (tempData && originalUser) {
          return { ...originalUser, ...tempData } as PreferredPartnerUser
        }

        return originalUser
      },

      updateBothUserArrays: (incomingUsers: PreferredPartnerUser[]) => {
        const updateUserArray = (existingData: PreferredPartnerUser[]) => {
          const updatedData = existingData.map((existingUser) => {
            const updatedUser = incomingUsers.find(
              (newUser: PreferredPartnerUser) => newUser.id === existingUser.id,
            )
            return updatedUser || existingUser
          })

          const existingUserIds = new Set(existingData.map((user) => user.id))
          const newUsers = incomingUsers.filter(
            (user) => !existingUserIds.has(user.id),
          )

          return [...updatedData, ...newUsers]
        }

        const finalActiveUsersData = updateUserArray(get().activeUsersData)
        const finalWorklistData = updateUserArray(get().worklistData)

        set({
          activeUsersData: finalActiveUsersData,
          worklistData: finalWorklistData,
        })
      },

      updateSingleUserInBothArrays: (
        userId: string,
        userData: PreferredPartnerUser,
      ) => {
        const updateArray = (data: PreferredPartnerUser[]) =>
          data.map((user) => (user.id === userId ? userData : user))

        set({
          activeUsersData: updateArray(get().activeUsersData),
          worklistData: updateArray(get().worklistData),
        })
      },

      calculateTotalCounts: (users: PreferredPartnerUser[]) => {
        const totalCounts = {
          totalUsers: 0,
          totalFamilies: 0,
          totalCouples: 0,
          totalIndividuals: 0,
        }

        users.forEach((user) => {
          totalCounts.totalUsers++
          switch (user.userType) {
            case 'Family':
              totalCounts.totalFamilies++
              break
            case 'Couple':
              totalCounts.totalCouples++
              break
            case 'Individual':
              totalCounts.totalIndividuals++
              break
          }
        })

        return totalCounts
      },
      activateUser: async (partnerId, userId) => {
        const result = await activatePreferredPartnerUserAction({
          partnerId,
          workListId: userId,
        })

        if (result.state === 'error') {
          throw new Error(result.error || 'Failed to activate user')
        }

        if (result.data.length > 0) {
          get().updateBothUserArrays(result.data)
        }
      },
      deactivateUser: async (partnerId, userId) => {
        const result = await deactivatePreferredPartnerUserAction({
          partnerId,
          workListId: userId,
        })

        if (result.state === 'error') {
          throw new Error(result.error || 'Failed to deactivate user')
        }

        if (result.data.length > 0) {
          get().updateBothUserArrays(result.data)
        }
      },
      linkUser: async (partnerId, userId, patientId) => {
        const result = await linkPreferredPartnerUserPatientAction({
          partnerId,
          worklistId: userId,
          patientId,
        })

        if (result.state === 'error') {
          throw new Error(result.error || 'Failed to link user')
        }

        if (result.data) {
          get().updateSingleUserInBothArrays(userId, result.data)
        }
      },

      searchActiveUsers: async (
        partnerId,
        formValues: Partial<PreferredPartnerFilters> = {},
        page = 1,
        reset = false,
      ) => {
        set({
          activeUsersError: undefined,
          activeUsersLoading: true,
          formValues: reset
            ? formValues
            : { ...get().formValues, ...formValues },
        })

        const result = await searchPreferredPartnerUsersAction({
          partnerId: partnerId,
          filters: transformOut(formValues),
          page,
          sort: get().sort,
          isIncludeOnlyActiveUsers: true,
        })

        if (result.state === 'error') {
          set({
            activeUsersError: result.error || 'An unknown error occurred',
            activeUsersLoading: false,
          })
          return
        }

        set({
          activeUsersData: result.data.users,
          activeUsersLoading: false,
          activeUsersPageCache: reset
            ? { [page]: result.data.users }
            : { ...get().activeUsersPageCache, [page]: result.data.users },
          activeUsersPage: page,
          activeUsersTotal: result.data.total,
          totalCounts: get().calculateTotalCounts(result.data.users),
        })
      },

      searchWorklist: async (
        partnerId,
        formValues: Partial<PreferredPartnerWorklistFilters> = {},
        page = 1,
        reset = false,
      ) => {
        set({
          worklistError: undefined,
          worklistLoading: true,
          worklistFormValues: reset
            ? formValues
            : { ...get().worklistFormValues, ...formValues },
        })

        const result = await searchPreferredPartnerUsersAction({
          partnerId: partnerId,
          filters: transformWorklistOut(formValues),
          page,
          sort: get().sort,
          isIncludeOnlyActiveUsers: false,
        })

        if (result.state === 'error') {
          set({
            worklistError: result.error || 'An unknown error occurred',
            worklistLoading: false,
          })
          return
        }

        set({
          worklistData: result.data.users,
          worklistLoading: false,
          worklistPageCache: reset
            ? { [page]: result.data.users }
            : { ...get().worklistPageCache, [page]: result.data.users },
          worklistPage: page,
          worklistTotal: result.data.total,
        })
      },
      updateUser: async (partnerId, userId, userData) => {
        const result = await updatePreferredPartnerUserAction({
          partnerId,
          workListId: userId,
          data: userData,
        })

        if (result.state === 'error') {
          throw new Error(result.error || 'Failed to update user')
        }

        get().updateSingleUserInBothArrays(userId, userData)

        const updatedActiveUsersData = get().activeUsersData
        const totalCounts = get().calculateTotalCounts(updatedActiveUsersData)

        set({ totalCounts })
      },
    }),
    {
      name: PREFERRED_PARTNER_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        formValues: state.formValues,
        showFilters: state.showFilters,
      }),
    },
  ),
)

export { usePreferredPartnerStore }
