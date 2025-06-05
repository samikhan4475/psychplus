import { create } from 'zustand'
import { LabOrderResponseList, LabOrders, LabResult, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getLabOrdersAction } from '../actions'
import { LabOrdersTabs } from '../constant'
import { LabOrderPayload } from '../types'

interface StoreState {
  data: LabOrderResponseList
  loading: boolean
  error?: string
  payload?: LabOrderPayload
  activeTab: string
  isQuickNoteView?: boolean
  viewedTabs: Set<string>
  sort?: Sort
  fetch: (
    appointmentId: string | null,
    payload: LabOrderPayload,
    page?: number,
    reset?: boolean,
  ) => void
  refetch: () => void
  setActiveTab: (tab: string) => void
  setIsQuickNoteView: (isQuickNoteView: boolean) => void
  addLabResult: (labResult: LabResult) => void
  setLabResult: (labeResult: LabResult) => void
  selectedTestId?: string
  setSelectedTestId: (testId?: string) => void
  editAbleLabResults?: LabResult
  setEditAbleLabResults: (labResult: LabResult | undefined) => void
  testLabResult: LabResult[]
  setTestLabResult: (labResult: LabResult[]) => void
  updateLabOrdersList: (labOrder: LabOrders) => void
  deleteLabOrder: (labOrder: LabOrders) => void
  updateLabOrderTestList: (orderId: string, testId: string) => void
  deleteLabOrders: (labOrder: LabResult) => void
  pageCache: Record<number, LabOrderResponseList>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  setAppointmentId: (appointmentId: string | null) => void
  page: number
  appointmentId: string | null
  fetchLabOrderByIds: (appointmentId: string, payload: LabOrderPayload) => void
  setSelectedRows: (value: LabOrders[]) => void
  selectedRows: LabOrders[]
  sortData: (column: string) => void
}

const useStore = create<StoreState>((set, get) => ({
  appointmentId: '',
  page: 1,
  pageCache: {},
  data: {
    labOrders: [],
    total: 0,
  },
  testLabResult: [],
  selectedRow: undefined,
  selectedRows: [],
  setTestLabResult: (labResult) => {
    set({
      testLabResult: labResult,
    })
  },
  setIsQuickNoteView: (isQuickNoteView) => {
    set({
      isQuickNoteView: isQuickNoteView,
    })
  },
  selectedTestId: undefined,
  setSelectedTestId: (testId?: string) => {
    set({
      selectedTestId: testId,
    })
  },
  editAbleLabResults: undefined,
  setEditAbleLabResults: (labResult) => {
    set({
      editAbleLabResults: labResult,
    })
  },
  loading: true,
  error: undefined,
  payload: undefined,
  labOrderPayload: undefined,
  activeTab: LabOrdersTabs.LAB_ORDERS,
  viewedTabs: new Set([LabOrdersTabs.LAB_ORDERS]),
  addLabResult: (labResult) => {
    const { data, testLabResult } = get()
    const updatedData = data?.labOrders.map((labOrder) => {
      if (labOrder.id === labResult.orderId) {
        return {
          ...labOrder,
          labResults: [...(labOrder.labResults || []), labResult],
        }
      }
      return labOrder
    })

    set({
      data: {
        ...data,
        labOrders: updatedData,
      },
      testLabResult: [
        ...testLabResult.filter((labResult) => labResult.id),
        labResult,
      ],
      editAbleLabResults: undefined,
    })
  },

  setLabResult: async (labResult: LabResult) => {
    const { data, testLabResult } = get()

    const updatedLabOrders = data.labOrders.map((labOrder) => {
      if (labOrder.id === labResult.orderId) {
        const updatedLabResults = labOrder?.labResults?.map((result) =>
          result.id === labResult.id ? { ...result, ...labResult } : result,
        )
        return {
          ...labOrder,
          labResults: updatedLabResults,
        }
      }
      return labOrder
    })

    set({
      data: {
        ...data,
        labOrders: updatedLabOrders,
      },
      testLabResult: testLabResult.map((result) =>
        result.id === labResult.id ? labResult : result,
      ),
      editAbleLabResults: undefined,
    })
  },

  fetch: async (appointmentId, payload, page = 1, reset = false) => {
    set({ error: undefined, loading: true, payload })
    const result = await getLabOrdersAction({
      appointmentId,
      payload,
      page,
      sort: get().sort,
    })
    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
      })
    } else {
      const labOrders = result.data.labOrders

      const labOrdersData = {
        ...result.data,
        labOrders,
      }

      set({
        data: labOrdersData,
        loading: false,
        pageCache: reset
          ? { [page]: labOrdersData }
          : { ...get().pageCache, [page]: labOrdersData },
      })
    }
  },

  fetchLabOrderByIds: async (appointmentId, payload) => {
    set({ error: undefined })
    const result = await getLabOrdersAction({ appointmentId, payload })

    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
      })
    } else {
      const { data } = get()
      result.data.labOrders.forEach((labOrder) => {
        const index = data.labOrders.findIndex(
          (item) => item.id === labOrder.id,
        )

        if (index === -1) return

        const newLabOrders = [...data.labOrders]
        newLabOrders[index] = { ...labOrder }

        set({
          data: {
            ...data,
            labOrders: [...newLabOrders],
          },
        })
      })
    }
  },

  setActiveTab: (activeTab) => {
    const { viewedTabs } = get()
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
  updateLabOrdersList: (labOrder) => {
    const { data } = get()
    const index =
      data?.labOrders.findIndex((item) => item.id === labOrder.id) ?? 0

    if (index === -1) {
      const newData = {
        ...data,
        labOrders: [labOrder, ...data.labOrders],
      }
      set({
        data: newData,
      })
    } else {
      const newLabOrders = [...data.labOrders]
      newLabOrders[index] = { ...newLabOrders[index], ...labOrder }
      const newData = {
        ...data,
        labOrders: newLabOrders,
      }
      set({
        data: newData,
      })
    }
  },
  deleteLabOrder: (labOrder) => {
    const { data } = get()
    const index =
      data?.labOrders.findIndex((item) => item.id === labOrder.id) ?? 0

    if (index !== -1) {
      const newLabOrders = [...data.labOrders]
      newLabOrders.splice(index, 1)
      set({
        data: {
          ...data,
          labOrders: newLabOrders,
        },
      })
    }
  },
  deleteLabOrders: (labResult) => {
    const { data, testLabResult } = get()

    const updatedData = data.labOrders.map((labOrder) => {
      if (labOrder.id === labResult.orderId) {
        return {
          ...labOrder,
          labResults: labOrder?.labResults?.filter(
            (result) => result.id !== labResult.id,
          ),
        }
      }
      return labOrder
    })

    set({
      data: {
        ...data,
        labOrders: updatedData,
      },
      testLabResult: testLabResult.filter(
        (result) => result.id !== labResult.id,
      ),
      editAbleLabResults: undefined,
    })
  },

  updateLabOrderTestList: (orderId, testId) => {
    const { data } = get()
    const index = data.labOrders.findIndex((e) => e.id === orderId)
    const newLabTests = data?.labOrders[index]?.labTests?.map((item) => {
      if (item.id === testId) {
        return {
          ...item,
          recordStatus: 'Deleted',
        }
      }
      return item
    })
    const newLabOrders = [...data.labOrders]
    newLabOrders[index] = {
      ...newLabOrders[index],
      labTests: [...(newLabTests ?? [])],
    }
    const newData = {
      ...data,
      labOrders: [...newLabOrders],
    }

    set({
      data: newData,
    })
  },
  refetch: () => {
    const { appointmentId, payload, page, fetch } = get()
    if (appointmentId && payload) {
      fetch(appointmentId, payload, page, false)
    }
  },

  next: () => {
    const nextPage = get().page + 1

    set({ page: nextPage })

    if (get().pageCache[nextPage]) {
      set({
        data: get().pageCache[nextPage],
      })
    } else {
      get().fetch(get().appointmentId!, get().payload!, nextPage)
    }
  },
  prev: () => {
    const prevPage = get().page - 1
    if (prevPage >= 1) {
      set({ page: prevPage })
      if (get().pageCache[prevPage]) {
        set({
          data: get().pageCache[prevPage],
        })
      }
    }
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetch(get().appointmentId!, get().payload!, 1)
  },
  jumpToPage: (page: number) => {
    if (page < 1) return
    set({ page })
    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
      })
    } else {
      get().fetch(get().appointmentId, get().payload!, page)
    }
  },
  setAppointmentId: (appointmentId: string | null) => set({ appointmentId }),
  setSelectedRows: (orders: LabOrders[]) => set({ selectedRows: orders }),
}))

export { useStore }
