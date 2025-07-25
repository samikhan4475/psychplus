import toast from 'react-hot-toast'
import { create } from 'zustand'
import { saveWidgetAction } from '@/actions/save-widget'
import {
  DiagnosisIcd10Code,
  FavouriteDiagnosisData,
  QuickNoteSectionItem,
} from '@/types'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { getFavouriteDiagnosis } from './diagnosis/actions/get-favorites-diagnosis'
import { getIcd10Diagnosis } from './diagnosis/actions/get-service-diagnosis'
import { getQuickNotesWorkingDiagnosis } from './diagnosis/actions/get-working-diagnosis'
import { markDiagnosisFavorite } from './diagnosis/actions/mark-diagnosis-favorite'
import { unmarkFavoriteDiagnosis } from './diagnosis/actions/unmark-diagnosis-favorite'

interface Store {
  loadingServicesDiagnosis: boolean
  loadingFavouriteDiagnosis: boolean
  loadingWorkingDiagnosis: boolean
  favouriteDiagnosisData: FavouriteDiagnosisData[]
  workingDiagnosisData: DiagnosisIcd10Code[]
  fetchWorkingDiagnosis: (patientId: string) => void
  updateWorkingDiagnosisData: (data: DiagnosisIcd10Code[]) => void
  deleteWorkingDiagnosis: (item: DiagnosisIcd10Code) => void
  serviceDiagnosisData: DiagnosisIcd10Code[]
  fetchServiceDiagnosis: (patientId: string) => void
  fetchFavouriteDiagnosis: (value?: string) => void
  markDiagnosisFavorites: (
    item: DiagnosisIcd10Code | FavouriteDiagnosisData,
    icd10Code: string,
    markFavourite?: boolean,
  ) => void
  encodeId: (id: string) => string
  saveWorkingDiagnosis: (
    patientId: string,
    setWidgetsData: (data: QuickNoteSectionItem[]) => void,
    showToast?: boolean,
    appointmentId?:string
  ) => Promise<void>
  updateFavoritesDiagnosis: (data: FavouriteDiagnosisData[]) => void
}

const useStore = create<Store>((set, get) => ({
  workingDiagnosisData: [],
  favouriteDiagnosisData: [],
  loadingServicesDiagnosis: false,
  loadingFavouriteDiagnosis: false,
  loadingWorkingDiagnosis: false,
  serviceDiagnosisData: [],

  encodeId: (id: string) => id.replace(/\./g, '%2E'),
  fetchWorkingDiagnosis: async (patientId: string) => {
    set({ loadingWorkingDiagnosis: true });
  
    const quickNotesResponse = await getQuickNotesWorkingDiagnosis({ patientId });
  
    if (quickNotesResponse.state === 'error') {
      toast.error('Failed to fetch working diagnosis');
      set({ loadingWorkingDiagnosis: false });
      return;
    }
  
    const allSectionItemValues = quickNotesResponse.data
      ?.map(item => item.sectionItemValue)
      .filter(Boolean);
  
    const rawCodes = allSectionItemValues
      .flatMap(value => value.split(','))
      .map(code => code.trim()) 
      .filter(code => code && code !== 'empty'); 
  
    const DiagnosisCodes = [...new Set(rawCodes)];
  
    if (DiagnosisCodes.length === 0) {
      set({ loadingWorkingDiagnosis: false, workingDiagnosisData: [] });
      return;
    }
  
    const response = await getIcd10Diagnosis({ DiagnosisCodes });
  
    set({ loadingWorkingDiagnosis: false });
  
    if (response.state === 'error') return;
  
    const sortedData = response.data.toSorted((a, b) => {
      return DiagnosisCodes.indexOf(a.code) - DiagnosisCodes.indexOf(b.code);
    });
    set({ workingDiagnosisData: sortedData });
  },
  
  updateWorkingDiagnosisData: async (data) => {
    set({ workingDiagnosisData: data })
  },

  saveWorkingDiagnosis: async (patientId, setWidgetsData, showToast = true,appointmentId) => {
    const codes = get()
      .workingDiagnosisData.map((item) => item.code)
      .filter((code) => code !== 'empty')
    const response = await saveWidgetAction({
      patientId,
      ...(appointmentId && {appointmentId}),
      data: [
        {
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
          sectionItem: 'diagnosis',
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
          sectionName: QuickNoteSectionName.QuickNoteSectionDiagnosis,
          sectionItem: 'diagnosis',
          sectionItemValue: codes.toString() || 'empty',
        },
      ])
    }
  },

  deleteWorkingDiagnosis: async (item) => {
    const { workingDiagnosisData } = get()
    const updatedData = workingDiagnosisData.filter(
      (diagnose) => diagnose.code !== item.code,
    )
    set({ workingDiagnosisData: updatedData })
  },

  fetchServiceDiagnosis: async (value: string) => {
    set({ serviceDiagnosisData: [] })
    if (value.length < 3) return
    set({ loadingServicesDiagnosis: true })
    const response = await getIcd10Diagnosis({
      CodeOrDescription: value,
    })

    if (response.state === 'error') {
      toast.error('Failed to fetch service diagnosis')
      set({ loadingServicesDiagnosis: false })
      return
    }

    set({
      serviceDiagnosisData: response.data,
      loadingServicesDiagnosis: false,
    })
  },

  markDiagnosisFavorites: async (item, icd10Code, markFavourite) => {
    const { favouriteDiagnosisData, encodeId } = get()
    const encodedIcd10CodeId = encodeId(icd10Code)

    if (markFavourite) {
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

      const response = await markDiagnosisFavorite(encodedIcd10CodeId)
      if (response.state === 'error') {
        toast.error('Failed to mark as favorite')
        return
      }
      toast.success('Saved!')
    } else {
      const updatedFavorites = favouriteDiagnosisData.filter(
        (item) => item.icd10Code !== icd10Code,
      )
      set({ favouriteDiagnosisData: updatedFavorites })
      const response = await unmarkFavoriteDiagnosis(encodedIcd10CodeId)
      if (response.state === 'error') {
        toast.error('Failed to mark as favorite')
        return
      }
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

  updateFavoritesDiagnosis: async (data) => {
    set({ favouriteDiagnosisData: data })
  },
}))

export { useStore }
