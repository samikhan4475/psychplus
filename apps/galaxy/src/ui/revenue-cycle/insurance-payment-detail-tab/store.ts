import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getClaimPaymentsAction } from '../actions'
import { ClaimPayment, InsurancePayment } from '../types'
import { PaymentListTypes } from './types'

interface Store {
  isLoading?: boolean
  claimPayments: ClaimPayment[]
  paymentListType: PaymentListTypes
  paymentDetail?: InsurancePayment
  setPaymentListType: (paymentListType: PaymentListTypes) => void
  setPaymentDetail: (paymentDetail: InsurancePayment) => void
  fetchClaimPayments: () => void
}

const useStore = create<Store>((set, get) => ({
  isLoading: false,
  claimPayments: [],
  paymentListType: PaymentListTypes.All,
  paymentDetail: undefined,
  setPaymentListType: (paymentListType) => set({ paymentListType }),
  setPaymentDetail: (paymentDetail) => set({ paymentDetail }),
  fetchClaimPayments: async () => {
    const { paymentListType, paymentDetail } = get()
    if (!paymentDetail) return

    set({ isLoading: true })

    const includeUnlinked =
      paymentListType === PaymentListTypes.Unlinked ? true : undefined
    const result = await getClaimPaymentsAction(
      paymentDetail.id,
      includeUnlinked,
    )
    if (result.state === 'success') {
      const filteredClaimPayments =
        paymentListType === PaymentListTypes.All
          ? result.data?.filter((payment) => payment.recordStatus !== 'Deleted')
          : result.data?.filter(
              (payment) =>
                (includeUnlinked || payment.status === paymentListType) &&
                payment.recordStatus !== 'Deleted',
            )
      set({ claimPayments: filteredClaimPayments ?? [] })
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
    set({ isLoading: false })
  },
}))

export { useStore }
