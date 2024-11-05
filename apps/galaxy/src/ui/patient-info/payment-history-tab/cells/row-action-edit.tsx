'use client'

import { IconButton } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import { formatValueWithDecimals } from '@/utils'
import { AddCustomChargeDialog } from '../add-custom-charge-dialog'
import { useStore } from '../store'
import type { PatientTransaction } from '../types'

const RowActionEdit = ({
  row: {
    original: transaction,
  },
}: PropsWithRow<PatientTransaction>) => {
  const { data, refetch } = useStore((state) => ({
    loading: state.loading,
    fetchPatientPaymentHistory: state.fetchPatientPaymentHistory,
    data: state.data?.paymentHistory,
    refetch: state.refetch,
  }))

  const handleCloseDialog = () => {
    refetch()
  }

  return (
    <AddCustomChargeDialog
      onClose={handleCloseDialog}
      patientId={String(transaction.patientId)}
      unappliedAmount={formatValueWithDecimals(data?.unappliedPayment)}
      transaction={transaction}
    >
      <IconButton
        size="1"
        variant="ghost"
        color="gray"
        className="text-black disabled:text-pp-gray-3"
      >
        <Pencil height={12} width={12} />
      </IconButton>
    </AddCustomChargeDialog>
  )
}

export { RowActionEdit }
