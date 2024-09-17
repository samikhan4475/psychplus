'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import { AddCustomChargeDialog } from './add-custom-charge-dialog'
import { PaymentButton } from './payment-button'
import { PaymentHeader } from './payment-header'
import { PaymentHistoryTable } from './payment-history-table'
import { useStore } from './store'

const TAB_TITLE = 'Payment History'

const PaymentHistoryTab = () => {
  const { fetchPatientPaymentHistories, loading } = useStore((state) => ({
    loading: state.loading,
    fetchPatientPaymentHistories: state.fetchPatientPaymentHistories,
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
          <PaymentButton />
        </Flex>
      </TabContentHeading>
      <ScrollArea>
        <PaymentHeader />
        <PaymentHistoryTable />
      </ScrollArea>
    </Flex>
  )
}

export { PaymentHistoryTab }
