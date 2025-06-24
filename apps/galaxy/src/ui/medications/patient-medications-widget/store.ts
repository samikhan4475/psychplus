import toast from 'react-hot-toast'
import { create } from 'zustand'
import {
  getScriptSureExternalPatient,
  getScriptSureSessionToken,
} from '@/actions'
import { saveWidgetAction } from '@/actions/save-widget'
import { DAWSYS } from '@/constants'
import {
  DiagnosisIcd10Code,
  DrugInfo,
  FavouriteDiagnosisData,
  Sort,
} from '@/types'
import { getFavouriteDiagnosis } from '@/ui/diagnosis/diagnosis/actions/get-favorites-diagnosis'
import { getIcd10Diagnosis } from '@/ui/diagnosis/diagnosis/actions/get-service-diagnosis'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getNewSortDir } from '@/utils'
import {
  addFavoriteMedication,
  fetchDrugs,
  getFavoriteMedications,
  getPatientMedicationsAction,
  removeFavoriteMedication,
} from './actions'
import {
  FavoriteMedication,
  PatientMedication,
  PatientMedicationFilterValues,
  PatientPrescriptionStatus,
  RecordStatus,
} from './types'

interface StoreState {
  patientId?: number
  data?: PatientMedication[]
  total: number
  formValues?: PatientMedicationFilterValues
  fetchPatientMedication: (
    formValues?: PatientMedicationFilterValues,
    page?: number,
    reset?: boolean,
    showOnlyActiveMedications?: boolean,
  ) => Promise<void>
  loading?: boolean
  diagnosisLoading?: boolean
  error?: string
  externalPatientId?: number
  isPmpReviewed: boolean
  errorStatus?: number
  scriptSureSessionToken?: string
  setPmpReviewed: (value: boolean) => void
  setScriptSureSessionToken: (token: string) => void
  fetchExternalScriptsurePatientId: (patientId: string) => void
  updateStatus: (updatedMedication: PatientMedication[]) => void
  fetchServiceDiagnosis: (patientId: string) => void
  loadingServicesDiagnosis: boolean
  serviceDiagnosisData: DiagnosisIcd10Code[]
  loadingWorkingDiagnosis: boolean
  loadingDrugs: boolean
  fetchDrugs: (value: string) => void
  drugsData?: DrugInfo[]
  saveIsPmpReviewedForMedication: (patientId: string) => Promise<void>
  fetchScriptSureSessionToken: () => Promise<void>
  pageCache: Record<number, PatientMedication[]>
  next: () => void
  prev: () => void
  sortData: (column: string) => void
  sort?: Sort
  refetch: (isQuickNoteSection?: boolean) => void
  jumpToPage: (page: number) => void
  page: number
  favouriteDiagnosisData: FavouriteDiagnosisData[]
  loadingFavouriteDiagnosis: boolean
  fetchFavouriteDiagnosis: (value?: string) => void
  workingDiagnosisData: DiagnosisIcd10Code[]
  updateWorkingDiagnosisData: (data: DiagnosisIcd10Code[]) => void
  setDiagnosisLoading: (value: boolean) => void
  loadingFavorites: boolean
  fetchFavoriteMedications: (value?: string) => void
  favoritesData?: FavoriteMedication[]
  markMedicationFavorites: (medicationName: string, id?: string) => void
  favoritesLoaded: boolean
}

const useStore = create<StoreState>((set, get) => ({
  drugsData: [],
  favoritesData: [],
  serviceDiagnosisData: [],
  workingDiagnosisData: [],
  favouriteDiagnosisData: [],
  loadingFavouriteDiagnosis: false,
  loadingDrugs: true,
  favoritesLoaded: false,
  loadingWorkingDiagnosis: false,
  loadingServicesDiagnosis: false,
  loadingFavorites: false,
  externalPatiendId: undefined,
  patientId: undefined,
  data: undefined,
  loading: false,
  error: undefined,
  total: 20,
  page: 1,
  pageCache: {},
  isPmpReviewed: false,
  DiagnosisLoading: false,
  scriptSureSessionToken: undefined,
  setPmpReviewed: (value: boolean) => set({ isPmpReviewed: value }),
  updateStatus: (updatedMedication: PatientMedication[]) => {
    set({
      data: updatedMedication,
    })
  },
  setDiagnosisLoading: (loading: boolean) => set({ diagnosisLoading: loading }),
  updateWorkingDiagnosisData: async (data) => {
    set({ serviceDiagnosisData: data })
  },

  setScriptSureSessionToken: (token: string) =>
    set({ scriptSureSessionToken: token }),
  fetchExternalScriptsurePatientId: async (patientId: string) => {
    const response = await getScriptSureExternalPatient(patientId)

    if (response.state === 'error' && response.status === 401) {
      return
    }

    if (response.state === 'error') {
      return toast.error(response.error ?? 'Failed to Fetch Scriptsure Patient')
    }

    set({
      externalPatientId: response.data.externalPatientId,
    })
  },
  fetchPatientMedication: async (
    formValues,
    page = 1,
    reset = false,
    showOnlyActiveMedications,
  ) => {
    const patientId = formValues?.patientIds?.[0]
    set({
      error: undefined,
      loading: true,
      formValues,
      patientId,
      data: [],
      total: 0,
      pageCache: {},
    })
    const result = await getPatientMedicationsAction({
      page,
      formValues: {
        ...formValues,
        recordStatuses: formValues?.recordStatuses?.length
          ? formValues?.recordStatuses
          : [RecordStatus.Active, RecordStatus.InActive],
        medicationStatuses: showOnlyActiveMedications
          ? [
              PatientPrescriptionStatus.ACTIVE,
              PatientPrescriptionStatus.CURRENT_MEDICATION,
            ]
          : formValues?.medicationStatuses,
      },
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
        data: [],
        errorStatus: result.status,
      })
    }
    if (get().patientId !== patientId) {
      return
    }
    set({
      data: result?.data,
      total: result?.total,
      loading: false,
      pageCache: reset
        ? { [page]: result?.data }
        : { ...get().pageCache, [page]: result?.data },
      page,
    })
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

  fetchDrugs: async (value: string) => {
    if (value.length < 3) return
    set({ loadingDrugs: true })
    const response = await fetchDrugs(value)

    if (response.state === 'error') {
      toast.error('Failed to fetch drugs ')
      set({ loadingDrugs: false })
      return
    }
    set({
      loadingDrugs: false,
      drugsData: response.data,
    })
  },

  fetchScriptSureSessionToken: async () => {
    set({ scriptSureSessionToken: undefined, isPmpReviewed: false })
    const response = await getScriptSureSessionToken(DAWSYS)
    if (response.state === 'success') {
      set({ scriptSureSessionToken: response.data })
    }
  },

  saveIsPmpReviewedForMedication: async (patientId) => {
    const isPmpReviewed = get().isPmpReviewed
    const response = await saveWidgetAction({
      patientId,
      data: [
        {
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuicknoteSectionMedications,
          sectionItem: 'isPmpReviewed',
          sectionItemValue: isPmpReviewed ? 'Yes' : 'No',
        },
      ],
    })

    if (response.state === 'error') {
      toast.error(response.error)
    }
  },

  next: () => {
    const page = get().page + 1
    if (get().pageCache[page]) {
      return set({ data: get().pageCache[page], page })
    }
    get().fetchPatientMedication(get().formValues, page)
  },

  prev: () => {
    const page = get().page - 1
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({ data: get().pageCache[page], page })
    }
    get().fetchPatientMedication(get().formValues, page)
  },

  jumpToPage: (page: number) => {
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({ data: get().pageCache[page], page })
    }
    get().fetchPatientMedication(get().formValues, page)
  },

  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetchPatientMedication(get().formValues, 1, true)
  },

  refetch: (isQuickNoteSection) => {
    get().fetchPatientMedication(
      get().formValues,
      get().page,
      true,
      isQuickNoteSection,
    )
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
  fetchFavoriteMedications: async (value?: string) => {
    const { favoritesLoaded } = get()
    if (favoritesLoaded && !value) {
      return
    }

    set({ loadingFavorites: true })

    const response = await getFavoriteMedications(value)

    if (response.state === 'error') {
      toast.error('Failed to fetch drugs')
      set({ loadingFavorites: false })
      return
    }

    set({
      loadingFavorites: false,
      favoritesData: response.data,
      favoritesLoaded: !value,
    })
  },

  markMedicationFavorites: async (medicationName, id) => {
    const favouriteMedicationsData = get().favoritesData ?? []

    const alreadyExists = favouriteMedicationsData.find(
      (item) => item.medicationName === medicationName,
    )

    if (alreadyExists) {
      if (!id) {
        throw new Error('Invalid ID for removing favorite')
      }

      const response = await removeFavoriteMedication(id)
      if (!response || response.state === 'error') {
        throw new Error(response?.error || 'Failed to remove favorite')
      }

      const updatedFavorites = favouriteMedicationsData.filter(
        (item) => item.medicationName !== medicationName,
      )
      set({ favoritesData: updatedFavorites })

      return { action: 'removed' }
    }

    const response = await addFavoriteMedication(medicationName)
    if (!response || response.state === 'error') {
      throw new Error(response?.error || 'Failed to add favorite')
    }

    const updatedFavorites = [
      ...favouriteMedicationsData,
      {
        id: response.data?.id,
        medicationName,
      },
    ]

    set({ favoritesData: updatedFavorites })

    return { action: 'added' }
  },
}))

export { useStore }
