import toast from 'react-hot-toast'
import { create } from 'zustand'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionItem } from '@/types'
import { getFavouriteDiagnosis } from './diagnosis/actions/get-favorites-diagnosis'
import { getServiceDiagnosis } from './diagnosis/actions/get-service-diagnosis'
import { getQuickNotesWorkingDiagnosis } from './diagnosis/actions/get-working-diagnosis'
import { markDiagnosisFavorite } from './diagnosis/actions/mark-diagnosis-favorite'
import { unmarkFavoriteDiagnosis } from './diagnosis/actions/unmark-diagnosis-favorite'

interface FavouriteDiagnosisData {
  id?: number | string
  icd10Code: string
  description: string
  isFavourite: boolean
}

interface Store {
  loadingServicesDiagnosis: boolean
  loadingFavouriteDiagnosis: boolean
  favouriteDiagnosisData: FavouriteDiagnosisData[]
  workingDiagnosisData: QuickNoteSectionItem[]
  fetchWorkingDiagnosis: (patientId: string) => void
  setWorkingDiagnosisData: (
    workingDiagnosisData: QuickNoteSectionItem[],
  ) => void
  updateWorkingDiagnosisData: (data: QuickNoteSectionItem[]) => void
  deleteWorkingDiagnosis: (patientId: string, value: number) => void
  serviceDiagnosisData: { label: string; value: string }[]
  fetchServiceDiagnosis: (patientId: string) => void
  fetchFavouriteDiagnosis: (value?: string) => void
  markDiagnosisFavorites: (
    icd10Code: string,
    item: QuickNoteSectionItem,
  ) => void
  unmarkDiagnosisFavorites: (icd10Code: string, id: number | string) => void
  encodeId: (id: string) => string
  saveWorkingDiagnosis: (patientId: string) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  workingDiagnosisData: [],
  favouriteDiagnosisData: [],
  loadingServicesDiagnosis: false,
  loadingFavouriteDiagnosis: false,
  encodeId: (id: string) => id.replace(/\./g, '%2E'),
  fetchWorkingDiagnosis: async (patientId: string) => {
    const { setWorkingDiagnosisData } = get()
    const response = await getQuickNotesWorkingDiagnosis({ patientId })
    if (response.state === 'error') {
      toast.error('Failed to fetch working diagnosis')
    }
    if (response.state === 'success') {
      const data = response.data.workingDiagnosisData
      data.sort((a, b) => parseInt(a.sectionItem) - parseInt(b.sectionItem))
      setWorkingDiagnosisData(data)
    }
  },
  setWorkingDiagnosisData: (workingDiagnosisData) => {
    set({ workingDiagnosisData })
  },
  updateWorkingDiagnosisData: async (data: QuickNoteSectionItem[]) => {
    set({ workingDiagnosisData: data })
  },

  saveWorkingDiagnosis: async (patientId: string) => {
    const { workingDiagnosisData } = get()
    const dataCopy = get().workingDiagnosisData
    const payload = workingDiagnosisData.map((item, index) => ({
      ...item,
      sectionItem: `${index + 1}`,
    }))

    const response = await saveWidgetAction({ patientId, data: payload })
    if (response.state === 'error') {
      toast.error('Failed to save!')
      set({ workingDiagnosisData: dataCopy })
    } else {
      toast.success('Saved!')
    }
  },

  deleteWorkingDiagnosis: async (patientId: string, value: number) => {
    const { workingDiagnosisData, updateWorkingDiagnosisData } = get()
    const updatedData = workingDiagnosisData.filter((_, i) => i !== value)
    await saveWidgetAction({ patientId, data: updatedData })
    updateWorkingDiagnosisData(updatedData)
  },

  serviceDiagnosisData: [],
  fetchServiceDiagnosis: async (value: string) => {
    set({ serviceDiagnosisData: [] })
    if (value.length < 3) return
    set({ loadingServicesDiagnosis: true })
    const response = await getServiceDiagnosis(value)

    if (response.state === 'error') {
      toast.error('Failed to fetch service diagnosis')
      set({ loadingServicesDiagnosis: false })
      return
    }

    const optionsData = response.data.serviceDiagnosisData.map(
      (item: { code: string; description: string }) => ({
        label: `${item.code} ${item.description}`,
        value: `${item.code} ${item.description}`,
      }),
    )
    set({ serviceDiagnosisData: optionsData, loadingServicesDiagnosis: false })
  },

  markDiagnosisFavorites: async (
    icd10Code: string,
    sectionItem: QuickNoteSectionItem,
  ) => {
    const { favouriteDiagnosisData, encodeId } = get()
    const updatedFavorites = [
      ...favouriteDiagnosisData,
      {
        id: sectionItem?.id,
        icd10Code: sectionItem.sectionItemValue.split(' ')[0],
        description: sectionItem.sectionItemValue,
        isFavourite: true,
      },
    ]
    set({ favouriteDiagnosisData: updatedFavorites })
    const encodedIcd10CodeId = encodeId(icd10Code)
    const response = await markDiagnosisFavorite(encodedIcd10CodeId)
    if (response.state === 'success') {
      toast.success('Saved!')
    } else {
      toast.error('Failed to mark as favorite')
    }
  },

  unmarkDiagnosisFavorites: async (icd10Code: string, id: number | string) => {
    const { favouriteDiagnosisData, encodeId } = get()
    const encodedIcd10CodeId = encodeId(icd10Code)
    const updatedFavorites = favouriteDiagnosisData.filter(
      (item) => item.id !== id,
    )
    set({ favouriteDiagnosisData: updatedFavorites })
    const response = await unmarkFavoriteDiagnosis(encodedIcd10CodeId)
    if (response.state === 'success') {
      toast.success('Saved!')
    }
  },

  fetchFavouriteDiagnosis: async (value?: string) => {
    set({ favouriteDiagnosisData: [] })
    set({ loadingFavouriteDiagnosis: true })
    const response = await getFavouriteDiagnosis(value)
    if (response.state === 'error') {
      toast.error('Failed to fetch favorite diagnosis')
      set({ loadingFavouriteDiagnosis: false })
      return
    }

    const optionsData = response.data.map(
      (item: {
        icd10Code: string
        description: string
        id: number
        isFavourite: boolean
      }) => ({
        description: `${item.icd10Code} ${item.description}`,
        id: item.id,
        isFavourite: item.isFavourite,
        icd10Code: item.icd10Code,
      }),
    )

    set({
      favouriteDiagnosisData: optionsData,
      loadingFavouriteDiagnosis: false,
    })
  },
}))

export { useStore }
