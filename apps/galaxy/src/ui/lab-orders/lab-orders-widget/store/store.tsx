import { create } from 'zustand'
import { LabOrders, LabResult } from '@/types'
import { getLabOrdersAction } from '../actions'
import { LabOrdersTabs } from '../constant'
import { GetLabOrdersParams } from '../types'

interface StoreState {
  data?: LabOrders[]
  loading: boolean
  error?: string
  payload?: GetLabOrdersParams
  activeTab: string
  viewedTabs: Set<string>
  fetch: (payload: GetLabOrdersParams) => void
  setActiveTab: (tab: string) => void
  setLabResult: (labResult: LabResult) => void
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
}))

export { useStore }
