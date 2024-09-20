'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import { AddCustomChargeDialog } from './add-custom-charge-dialog'
import { FilterForm } from './filter-form'
import { PaymentButton } from './payment-button'
import { PaymentHeader } from './payment-header'
import { PaymentHistoryTable } from './payment-history-table'
import { useStore } from './store'

const TAB_TITLE = 'Payment Hx'
interface PaymentHistoryTabProps {
  stripeApiKey: string
  patientId: string
}
const PaymentHistoryTab = ({
  stripeApiKey,
  patientId,
}: PaymentHistoryTabProps) => {
  const { data, fetchPatientPaymentHistories, loading } = useStore((state) => ({
    loading: state.loading,
    fetchPatientPaymentHistories: state.fetchPatientPaymentHistories,
    data: state.data,
  }))

  useEffect(() => {
    fetchPatientPaymentHistories()
  }, [])

  if (loading) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title={TAB_TITLE}>
        <Flex gap="2" align="center" className="flex-1" justify="end">
          <AddCustomChargeDialog />
          <PaymentButton stripeApiKey={stripeApiKey} patientId={patientId} />
        </Flex>
      </TabContentHeading>
      <ScrollArea>
        <PaymentHeader />
        <Flex direction="column" gap="1" className="bg-white w-full px-2 py-1">
          <FilterForm />
          <PaymentHistoryTable data={data?.paymentHistories ?? []} />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { PaymentHistoryTab }
