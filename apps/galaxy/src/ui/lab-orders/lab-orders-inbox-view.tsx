'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { LabOrderStatusEnum } from './add-lab-order/blocks/types'
import { AddLabOrdersButton } from './lab-orders-widget/add-lab-orders-button'
import { LabOrderTablePagination } from './lab-orders-widget/lab-order-pagination-table'
import { LabOrderTable } from './lab-orders-widget/lab-order-table'
import { LabOrdersFilterForm } from './lab-orders-widget/lab-orders-filter-form'
import { ReviewAllButton } from './lab-orders-widget/review-all-button'
import { useStore } from './lab-orders-widget/store'

const labOrderPayload = {
  orderStatus: LabOrderStatusEnum.Unsigned,
  IsOrderSendStatus: false,
  resourceStatusList: ['Active'],
}

const LabOrdersInboxView = () => {
  const { fetch, setAppointmentId, data } = useStore((state) => ({
    fetch: state.fetch,
    setAppointmentId: state.setAppointmentId,
    data: state.data,
  }))

  const fetchData = () => {
    setAppointmentId(null)
    fetch(null, labOrderPayload)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <WidgetContainer
        title={`Lab Orders (${data?.total ?? 0})`}
        headerRight={
          <Flex direction="row" gap="3">
            <AddLabOrdersButton onRefresh={fetchData} />
            <ReviewAllButton />
          </Flex>
        }
      >
        <LabOrdersFilterForm isInboxLabOrder defaultPayload={labOrderPayload} />
        <LabOrderTable isInboxLabOrder />
        <LabOrderTablePagination />
      </WidgetContainer>
    </>
  )
}

export { LabOrdersInboxView }
