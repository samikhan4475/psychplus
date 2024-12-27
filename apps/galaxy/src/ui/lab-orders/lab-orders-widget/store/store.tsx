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
  setLabResult: (labResult: LabResult) => void
  updateLabOrdersList: (labOrder: LabOrders) => void
  updateLabOrderTestList: (orderId: string, testId: string) => void
}

const useStore = create<StoreState>((set, get) => ({
  data: [],
  loading: true,
  error: undefined,
  payload: undefined,
  activeTab: LabOrdersTabs.LAB_ORDERS,
  viewedTabs: new Set([LabOrdersTabs.LAB_ORDERS]),

  setLabResult: async (labResult: LabResult) => {
    const { data } = get()

    const labOrderIndex = data?.findIndex(
      (labOrder) => labOrder.id === labResult.orderId,
    )
    if (labOrderIndex !== undefined && labOrderIndex !== -1 && data) {
      const updatedLabResults = data[labOrderIndex].labResults.map((result) =>
        result.id === labResult.id ? { ...result, ...labResult } : result,
      )
      const updatedData = [...data]
      updatedData[labOrderIndex] = {
        ...data[labOrderIndex],
        labResults: updatedLabResults,
      }

      set({
        data: updatedData,
      })
    }
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
