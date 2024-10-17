import toast from 'react-hot-toast'
import { create } from 'zustand'

import { getPaymentDetail } from './actions'
import { PaymentListTypes } from './types'
import { InsurancePayment } from '../types'

interface Store {
  data?: InsurancePayment
  error?: string
  loading?: boolean
  paymentListType?: PaymentListTypes
  fetchPaymentDetail: (patientId: string) => void
  setPaymentListType: (paymentListType: PaymentListTypes) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  paymentListType: PaymentListTypes.All,
  fetchPaymentDetail: async (checkId: string) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getPaymentDetail(checkId)
    if (result.state === 'error') {
      toast.error(result.error)
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      data: result.data,
      loading: false,
    })
  },
  setPaymentListType: (paymentListType) => set({ paymentListType }),
}))

export { useStore }
