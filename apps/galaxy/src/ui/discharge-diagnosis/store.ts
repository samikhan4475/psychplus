import toast from 'react-hot-toast'
import { create } from 'zustand'
import { saveWidgetAction } from '@/actions/save-widget'
import {
  DiagnosisIcd10Code,
  FavouriteDiagnosisData,
  QuickNoteSectionItem,
} from '@/types'
import { QuickNoteSectionName } from '../quicknotes/constants'
import {
  addfavoriteDiagnosis,
  deleteFavoriteDiagnosis,
  getFavouriteDiagnosis,
  getIcd10Diagnosis,
  getQuickNotesWorkingDischargeDiagnosis,
} from './actions'

interface Store {
  loadingServicesDiagnosis: boolean
  loadingFavouriteDiagnosis: boolean
  loadingWorkingDiagnosis: boolean
  favouriteDiagnosisData: FavouriteDiagnosisData[]
  workingDischargeDiagnosisData: DiagnosisIcd10Code[]
  fetchDiagnosis: (patientId: string, appointmentId: string) => void
  updateWorkingDischargeDiagnosisData: (data: DiagnosisIcd10Code[]) => void
  deleteWorkingDisrchargeDiagnosis: (item: DiagnosisIcd10Code) => void
  serviceDiagnosisData: DiagnosisIcd10Code[]
  fetchServiceDiagnosis: (patientId: string) => void
  fetchFavouriteDiagnosis: (value?: string) => void
  markDiagnosisFavorites: (
    item: DiagnosisIcd10Code | FavouriteDiagnosisData,
    icd10Code: string,
    markFavourite?: boolean,
  ) => void
  encodeId: (id: string) => string
  saveWorkingDischargeDiagnosis: (
    patientId: string,
    appId: string,
    setWidgetsData: (data: QuickNoteSectionItem[]) => void,
    showToast?: boolean,
  ) => Promise<void>
  updateFavoritesDiagnosis: (data: FavouriteDiagnosisData[]) => void
}

const useStore = create<Store>((set, get) => ({
  workingDischargeDiagnosisData: [],
  favouriteDiagnosisData: [],
  loadingServicesDiagnosis: false,
  loadingFavouriteDiagnosis: false,
  loadingWorkingDiagnosis: false,
  serviceDiagnosisData: [],

  encodeId: (id: string) => id.replace(/\./g, '%2E'),
  fetchDiagnosis: async (patientId, appointmentId) => {
    set({ loadingWorkingDiagnosis: true })
    const quickNotesResponse = await getQuickNotesWorkingDischargeDiagnosis({
      patientId,
      appointmentId,
    })

    if (quickNotesResponse.state === 'error') {
      toast.error('Failed to fetch working diagnosis')
      set({ loadingWorkingDiagnosis: false })
      return
    }
    const { sectionItemValue } = quickNotesResponse.data?.[0] || {}
    const DiagnosisCodes = sectionItemValue?.split(',') || []
    if (sectionItemValue === 'empty' || DiagnosisCodes?.length === 0) {
      set({ loadingWorkingDiagnosis: false, workingDischargeDiagnosisData: [] })
    } else {
      const response = await getIcd10Diagnosis({
        DiagnosisCodes,
      })
      set({ loadingWorkingDiagnosis: false })
      if (response.state === 'error') return
      const sortedData = response.data.toSorted((a, b) => {
        return DiagnosisCodes.indexOf(a.code) - DiagnosisCodes.indexOf(b.code)
      })
      set({ workingDischargeDiagnosisData: sortedData })
    }
  },

  updateWorkingDischargeDiagnosisData: async (data) => {
    set({ workingDischargeDiagnosisData: data })
  },

  saveWorkingDischargeDiagnosis: async (
    patientId,
    appId,
    setWidgetsData,
    showToast = true,
  ) => {
    const { workingDischargeDiagnosisData } = get()
    const codes = workingDischargeDiagnosisData
      .reduce((acc: string[], item) => {
        if (item.code !== 'empty') acc.push(item.code)
        return acc
      }, [])
      .filter((code) => code !== 'empty')
    const response = await saveWidgetAction({
      patientId,
      data: [
        {
          pid: Number(patientId),
          sectionName:
            QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis,
          sectionItem: 'diagnosis',
          appId: Number(appId),
          sectionItemValue: codes.toString() || 'empty',
        },
      ],
    })
    if (response.state === 'error') {
      toast.error(response.error)
    } else {
      if (showToast) {
        toast.success('Saved!')
      }
      setWidgetsData([
        {
          pid: Number(patientId),
          sectionName:
            QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis,
          sectionItem: 'diagnosis',
          appId: Number(appId),
          sectionItemValue: codes.toString() || 'empty',
        },
      ])
    }
  },
  deleteWorkingDisrchargeDiagnosis: async ({ code }) => {
    set({
      workingDischargeDiagnosisData:
        get().workingDischargeDiagnosisData?.filter(
          (diagnose) => diagnose?.code !== code,
        ),
    })
  },

  fetchServiceDiagnosis: async (CodeOrDescription: string) => {
    set({ serviceDiagnosisData: [] })
    if (CodeOrDescription.length < 3) return
    set({ loadingServicesDiagnosis: true })
    const response = await getIcd10Diagnosis({
      CodeOrDescription,
    })
    if (response.state === 'error') {
      set({ loadingServicesDiagnosis: false })
      return toast.error('Failed to fetch service diagnosis')
    }
    set({
      serviceDiagnosisData: response.data,
      loadingServicesDiagnosis: false,
    })
  },

  markDiagnosisFavorites: async (item, icd10Code, markFavourite) => {
    const favouriteDiagnosisData = get().favouriteDiagnosisData
    const encodedIcd10CodeId = get().encodeId(icd10Code)
    if (!markFavourite) {
      const updatedFavorites = favouriteDiagnosisData.filter(
        (item) => item.icd10Code !== icd10Code,
      )
      set({ favouriteDiagnosisData: updatedFavorites })
      const response = await deleteFavoriteDiagnosis(encodedIcd10CodeId)
      if (response.state === 'error') {
        return toast.error('Failed to mark as favorite')
      }
      toast.success('Saved!')
    } else {
      const updatedFavorites = [
        ...favouriteDiagnosisData,
        {
          id: item?.id,
          icd10Code: icd10Code,
          description: `${icd10Code} ${item.description}`,
          isFavourite: true,
        },
      ]
      set({ favouriteDiagnosisData: updatedFavorites })
      const response = await addfavoriteDiagnosis(encodedIcd10CodeId)
      if (response.state === 'error') {
        return toast.error('Failed to mark as favorite')
      }
      toast.success('Saved!')
    }
  },
  fetchFavouriteDiagnosis: async (value?: string) => {
    set({ favouriteDiagnosisData: [], loadingFavouriteDiagnosis: true })
    const response = await getFavouriteDiagnosis(value)
    if (response.state === 'error') {
      set({ loadingFavouriteDiagnosis: false })
      return toast.error('Failed to fetch favorite diagnosis')
    }
    const optionsData = response.data.map(
      ({ description, icd10Code, isFavourite, id }) => ({
        description: `${icd10Code} ${description}`,
        id,
        isFavourite,
        icd10Code,
      }),
    )
    set({
      favouriteDiagnosisData: optionsData,
      loadingFavouriteDiagnosis: false,
    })
  },
  updateFavoritesDiagnosis: async (data) => {
    set({ favouriteDiagnosisData: data })
  },
}))

export { useStore }
