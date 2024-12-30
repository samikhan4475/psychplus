import { create } from 'zustand'
import { LabOrders, LabResult } from '@/types'
import { getLabOrdersAction } from '../actions'
import { LabOrdersTabs } from '../constant'
import { GetLabOrdersParams } from '../types'

interface StoreState {
  data: LabOrders[]
  loading: boolean
  error?: string
  payload?: GetLabOrdersParams
  activeTab: string
  viewedTabs: Set<string>
  fetch: (payload: GetLabOrdersParams) => void
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
}

const useStore = create<StoreState>((set, get) => ({
  data: [],
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
    const updatedData = data?.map((labOrder) => {
      if (labOrder.id === labResult.orderId) {
        return {
          ...labOrder,
          labResults: [...labOrder.labResults, labResult],
        }
      }
      return labOrder
    })

    set({
      data: updatedData,
      testLabResult: [
        ...testLabResult.filter((labResult) => labResult.id),
        labResult,
      ],
      editAbleLabResults: undefined,
    })
  },

  setLabResult: async (labResult: LabResult) => {
    const { data, testLabResult } = get()
    const updatedData = data?.map((labOrder) => {
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
      data: updatedData,
      testLabResult: testLabResult.map((result) =>
        result.id === labResult.id ? labResult : result,
      ),
      editAbleLabResults: undefined,
    })
  },
  fetch: async (payload: GetLabOrdersParams) => {
    set({ error: undefined, loading: true, payload })
    const result = await getLabOrdersAction(payload)

    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
      })
    } else {
      set({
        data: result.data,
        loading: false,
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
    const index = data?.findIndex((item) => item.id === labOrder.id) ?? 0

    if (index === -1) {
      const newData = [labOrder, ...data]
      set({
        data: newData,
      })
    } else {
      const newData = [...data]
      newData[index] = { ...newData[index], ...labOrder }
      set({
        data: newData,
      })
    }
  },
  updateLabOrderTestList: (orderId, testId) => {
    const { data } = get()
    const index = data.findIndex((e) => e.id === orderId)
    const newLabTests = data[index]?.labTests.map((item) => {
      if (item.id === testId) {
        return {
          ...item,
          recordStatus: 'Deleted',
        }
      }
      return item
    })
    const newData = [...data]
    newData[index] = {
      ...newData[index],
      labTests: [...newLabTests],
    }
    set({
      data: [...newData],
    })
  },
}))

export { useStore }
