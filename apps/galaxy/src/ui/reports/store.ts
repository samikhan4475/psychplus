import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Code, SelectOptionType } from '@/types'
import {
  getReportParametersTypeAction,
  getReportsAction,
  getRunReportAction,
  getScheduledReportsListAction,
  getTemplatesAction,
} from './actions'
import {
  GeneratedReportParams,
  GetScheduleReportListResponse,
  Parameter,
  ReportFilterParameters,
  ScheduleReportListParams,
  StaffDataOptions,
  Template,
  VIEW_TYPE,
} from './types'

interface Store {
  reports: Code[]
  loading: boolean
  fetchTemplateLoading: boolean
  generateReportLoading: boolean
  scheduleReportLoading: boolean
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
  scheduleReportPage: number
  pageCache: Record<number, string>
  scheduledReportPageCache: Record<number, GetScheduleReportListResponse>
  payload: GeneratedReportParams
  scheduledReportPayload: ScheduleReportListParams
  scheduleReports?: GetScheduleReportListResponse
  viewType: VIEW_TYPE.REPORT | VIEW_TYPE.SCHEDULE
  setViewType: (type: VIEW_TYPE.REPORT | VIEW_TYPE.SCHEDULE) => void
  fetchReportsAndTemplates: () => void
  fetchTemplates: () => void
  setSelectedReport: (code: Code) => void
  setSelectedTemplate: (template: Template | null) => void
  setScheduleReports: (
    scheduledReports: GetScheduleReportListResponse | undefined,
  ) => void
  setGeneratedReport: (report: string | null) => void
  resetPageCache: () => void
  resetScheduledReportPageCache: () => void
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
  searchScheduledReports: (
    scheduledReportPayload: ScheduleReportListParams,
    scheduleReportPage?: number,
    scheduleReportReset?: boolean,
  ) => void
  nextScheduledReport: () => void
  prevScheduledReport: () => void
  jumpToPageScheduleReport: (page: number) => void
}

const useStore = create<Store>((set, get) => ({
  reports: [],
  error: null,
  templates: [],
  templateFilters: null,
  loading: false,
  fetchTemplateLoading: false,
  generateReportLoading: false,
  scheduleReportLoading: false,
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
  scheduledReportPageCache: {},
  totalRecords: 0,
  viewType: VIEW_TYPE.REPORT,
  scheduleReports: undefined,
  scheduledReportPayload: {
    templateIds: [],
    jobIds: [],
  },
  scheduleReportPage: 1,
  setViewType: (type) => set({ viewType: type }),
  resetPageCache: () => {
    set({ pageCache: {}, page: 1 })
  },
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
  resetScheduledReportPageCache: () => {
    set({
      scheduledReportPageCache: {},
      scheduleReportPage: 1,
      scheduleReports: undefined,
    })
  },
  searchScheduledReports: async (
    scheduledReportPayload: ScheduleReportListParams,
    scheduleReportPage = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      scheduleReportLoading: true,
      scheduledReportPayload: scheduledReportPayload,
    })
    const result = await getScheduledReportsListAction({
      scheduledReportPayload,
      scheduleReportPage,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to get schedule reports')
      return set({
        error: result.error,
        scheduleReportLoading: false,
      })
    }
    set({
      scheduleReports: result.data,
      scheduleReportLoading: false,
      scheduledReportPageCache: reset
        ? { [scheduleReportPage]: result.data }
        : {
            ...get().scheduledReportPageCache,
            [scheduleReportPage]: result.data,
          },
    })
  },
  nextScheduledReport: () => {
    const scheduleReportPage = get().scheduleReportPage + 1

    if (get().scheduledReportPageCache[scheduleReportPage]) {
      return set({
        scheduleReports: get().scheduledReportPageCache[scheduleReportPage],
        scheduleReportPage,
      })
    }

    get().searchScheduledReports(
      get().scheduledReportPayload,
      scheduleReportPage,
    )
    set({ scheduleReportPage })
  },
  prevScheduledReport: () => {
    const scheduleReportPage = get().scheduleReportPage - 1

    set({
      scheduleReports: get().scheduledReportPageCache[scheduleReportPage],
      scheduleReportPage,
    })
  },
  jumpToPageScheduleReport: (scheduleReportPage: number) => {
    if (scheduleReportPage < 1) {
      return
    }

    if (get().scheduledReportPageCache[scheduleReportPage]) {
      return set({
        scheduleReports: get().scheduledReportPageCache[scheduleReportPage],
        scheduleReportPage,
      })
    }
    set({ scheduleReportPage })
    get().searchScheduledReports(
      get().scheduledReportPayload,
      scheduleReportPage,
    )
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
  setScheduleReports: (
    scheduleReports: GetScheduleReportListResponse | undefined,
  ) => {
    set({ scheduleReports: scheduleReports })
  },
}))

export { useStore }
