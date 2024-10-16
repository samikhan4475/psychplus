import toast from 'react-hot-toast'
import { create } from 'zustand'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionItem } from '@/types'
import { getServiceDiagnosis } from './diagnosis/api/get-service-diagnosis'
import { getQuickNotesWorkingDiagnosis } from './diagnosis/api/get-working-diagnosis'

interface Store {
  loadingServicesDiagnosis: boolean
  workingDiagnosisData: QuickNoteSectionItem[]
  fetchWorkingDiagnosis: (patientId: string) => void
  setWorkingDiagnosisData: (
    workingDiagnosisData: QuickNoteSectionItem[],
  ) => void
  updateWorkingDiagnosisData: (
    patientId: string,
    data: QuickNoteSectionItem[],
  ) => void
  deleteWorkingDiagnosis: (patientId: string, value: number) => void
  serviceDiagnosisData: { label: string; value: string }[]
  fetchServiceDiagnosis: (patientId: string) => void
}

const useStore = create<Store>((set, get) => ({
  workingDiagnosisData: [],
  loadingServicesDiagnosis: false,
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
  updateWorkingDiagnosisData: async (
    patientId: string,
    data: QuickNoteSectionItem[],
  ) => {
    const dataCopy = get().workingDiagnosisData
    const payload = data.map((item, index) => ({
      ...item,
      sectionItem: `${index + 1}`,
    }))
    set({ workingDiagnosisData: data })
    const response = await saveWidgetAction({ patientId, data: payload })
    if (response.state === 'error') {
      toast.error('Failed to save!')
      set({ workingDiagnosisData: dataCopy })
    } else {
      toast.success('Saved!')
    }
  },
  deleteWorkingDiagnosis: (patientId: string, value: number) => {
    const { workingDiagnosisData, updateWorkingDiagnosisData } = get()
    const updatedData = workingDiagnosisData.filter((_, i) => i !== value)
    updateWorkingDiagnosisData(patientId, updatedData)
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
}))

export { useStore }
