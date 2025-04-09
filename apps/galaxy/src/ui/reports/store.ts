import toast from 'react-hot-toast'
import { create } from 'zustand'
import {
  getInsurancePayersOptionsAction,
  getProvidersOptionsAction,
} from '@/actions'
import { Code, SelectOptionType, StaffResource } from '@/types'
import {
  getPatientsOptionsAction,
  getReportParametersTypeAction,
  getReportsAction,
  getRunReportAction,
  getStaffAction,
  getTemplatesAction,
} from './actions'
import {
  GeneratedReportParams,
  Parameter,
  ReportFilterParameters,
  StaffDataOptions,
  Template,
} from './types'

interface Store {
  reports: Code[]
  loading: boolean
  fetchTemplateLoading: boolean
  generateReportLoading: boolean
  error: string | null
  templates: Template[]
  templateFilters: Parameter | null
  selectedReport: Code | null
  selectedTemplate: Template | null
  generatedReport: string | null
  totalRecords: number
  filtersData: ReportFilterParameters[] | null
  staffData: StaffDataOptions[] | null
  insuranceData: SelectOptionType[] | null
  patientData: SelectOptionType[] | null
  cosignerData: SelectOptionType[] | null
  page: number
  pageCache: Record<number, string>
  payload: GeneratedReportParams
  fetchReportsAndTemplates: () => void
  fetchTemplates: () => void
  setSelectedReport: (code: Code) => void
  setSelectedTemplate: (template: Template | null) => void
  setGeneratedReport: (report: string | null) => void
  fetchStaffData: () => void
  setFiltersData: (data: ReportFilterParameters[] | null) => void
  search: (
    payload: GeneratedReportParams,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  resetData: () => void
}

const useStore = create<Store>((set, get) => ({
  reports: [],
  error: null,
  templates: [],
  templateFilters: null,
  loading: false,
  fetchTemplateLoading: false,
  generateReportLoading: false,
  selectedReport: null,
  selectedTemplate: null,
  generatedReport: null,
  filtersData: null,
  staffData: null,
  insuranceData: null,
  patientData: null,
  cosignerData: null,
  payload: {
    templateId: '',
    reportType: '',
    data: [],
  },
  page: 1,
  pageCache: {},
  totalRecords: 0,
  search: async (payload: GeneratedReportParams, page = 1, reset = false) => {
    set({
      error: undefined,
      generateReportLoading: true,
      payload: payload,
    })
    const result = await getRunReportAction({
      payload,
      page,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to generate report:')
      return set({
        error: result.error,
        generateReportLoading: false,
      })
    }
    set({
      generatedReport: result.data.report,
      totalRecords: result.data.total,
      generateReportLoading: false,
      pageCache: reset
        ? { [page]: result.data.report }
        : { ...get().pageCache, [page]: result.data.report },
    })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        generatedReport: get().pageCache[page],
        page,
      })
    }

    get().search(get().payload, page)
    set({ page })
  },
  prev: () => {
    const page = get().page - 1

    set({
      generatedReport: get().pageCache[page],
      page,
    })
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        generatedReport: get().pageCache[page],
        page,
      })
    }
    set({ page })
    get().search(get().payload, page)
  },
  fetchReportsAndTemplates: async () => {
    set({ loading: true, error: null })

    const [reportsResult, templatesResult, codeParametersResult] =
      await Promise.all([
        getReportsAction(),
        getTemplatesAction(),
        getReportParametersTypeAction(),
      ])
    if (
      reportsResult.state === 'success' &&
      templatesResult.state === 'success' &&
      codeParametersResult.state === 'success'
    ) {
      set({
        reports: reportsResult.data?.codes || [],
        templates: templatesResult.data || [],
        templateFilters: codeParametersResult.data || null,
        loading: false,
      })
    } else {
      set({
        error: 'Failed to fetch data',
        loading: false,
      })
    }
  },
  fetchTemplates: async () => {
    set({ fetchTemplateLoading: true })

    const templatesResult = await getTemplatesAction()
    if (templatesResult.state === 'success') {
      set({
        templates: templatesResult.data || [],
        fetchTemplateLoading: false,
      })
    } else {
      toast.error(templatesResult.error ?? 'Failed to fetch data')
      set({
        fetchTemplateLoading: false,
      })
    }
  },

  fetchStaffData: async () => {
    set({ error: null })

    const [staffResult, insuranceResult, patientResult, cosignerResult] =
      await Promise.all([
        getStaffAction(),
        getInsurancePayersOptionsAction(),
        getPatientsOptionsAction(),
        getProvidersOptionsAction(),
      ])

    if (
      staffResult.state === 'success' &&
      insuranceResult.state === 'success' &&
      patientResult.state === 'success' &&
      cosignerResult.state === 'success'
    ) {
      const transformedStaffData = staffResult?.data.map(
        (staff: StaffResource) => ({
          value: String(staff.id),
          label: `${staff.legalName.firstName} ${staff.legalName.lastName}`,
        }),
      )

      set({
        staffData: transformedStaffData || null,
        insuranceData: insuranceResult.data || null,
        patientData: patientResult.data || null,
        cosignerData: cosignerResult.data || null,
      })
    } else {
      set({
        error: 'Failed to fetch parameters options data',
      })
    }
  },

  setSelectedReport: (code: Code) => {
    set({ selectedReport: code })
  },

  setSelectedTemplate: (template: Template | null) => {
    set({ selectedTemplate: template })
  },

  setGeneratedReport: (report: any) => {
    set({ generatedReport: report })
  },

  setFiltersData: (data: any) => {
    set({ filtersData: data })
  },
  resetData: () => {
    set({ generatedReport: null, page: 1, pageCache: {}, totalRecords: 0 })
  },
}))

export { useStore }
