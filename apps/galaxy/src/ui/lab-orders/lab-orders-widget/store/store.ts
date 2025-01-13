import { create } from 'zustand'
import { LabOrderResponseList, LabOrders, LabResult } from '@/types'
import { getLabOrdersAction } from '../actions'
import { LabOrdersTabs } from '../constant'
import { LabOrderPayload } from '../types'

interface StoreState {
  data: LabOrderResponseList
  loading: boolean
  error?: string
  payload?: LabOrderPayload
  activeTab: string
  viewedTabs: Set<string>
  fetch: (
    appointmentId: string,
    payload: LabOrderPayload,
    page?: number,
    reset?: boolean,
  ) => void
  setActiveTab: (tab: string) => void
  addLabResult: (labResult: LabResult) => void
  setLabResult: (labeResult: LabResult) => void
  selectedTestId?: string
  setSelectedTestId: (testId?: string) => void
  editAbleLabResults?: LabResult
  setEditAbleLabResults: (labResult: LabResult | undefined) => void
  testLabResult: LabResult[]
  setTestLabResult: (labResult: LabResult[]) => void
  updateLabOrdersList: (labOrder: LabOrders) => void
  updateLabOrderTestList: (orderId: string, testId: string) => void
  deleteLabOrders: (labOrder: LabResult) => void
  pageCache: Record<number, LabOrderResponseList>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  setAppointmentId: (appointmentId: string) => void
  page: number
  appointmentId: string
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
  setTestLabResult: (labResult) => {
    set({
      testLabResult: labResult,
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
        const updatedLabResults = labOrder.labResults.map((result) =>
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
    const result = await getLabOrdersAction({ appointmentId, payload, page })

    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
      })
    } else {
      set({
        data: result.data,
        loading: false,
        pageCache: reset
          ? { [page]: result.data }
          : { ...get().pageCache, [page]: result.data },
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
  deleteLabOrders: (labResult) => {
    const { data, testLabResult } = get()

    const updatedData = data.labOrders.map((labOrder) => {
      if (labOrder.id === labResult.orderId) {
        return {
          ...labOrder,
          labResults: labOrder.labResults.filter(
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
    const newLabTests = data.labOrders[index]?.labTests.map((item) => {
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
      labTests: [...newLabTests],
    }
    const newData = {
      ...data,
      labOrders: [...newLabOrders],
    }

    set({
      data: newData,
    })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetch(get().appointmentId!, get().payload!, page)
  },
  prev: () => {
    const page = get().page - 1

    set({
      data: get().pageCache[page],
      page,
    })
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetch(get().appointmentId, get().payload!, page)
  },
  setAppointmentId: (appointmentId: string) => set({ appointmentId }),
}))

export { useStore }
