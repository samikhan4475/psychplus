import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { PenLine } from 'lucide-react'
import toast from 'react-hot-toast'
import { LabOrders } from '@/types'
import {
  editLabOrderApi,
  getLabOrderRequisition,
  placeLabOrderApi,
} from '../add-lab-order/api'
import { LabOrderStatusEnum } from '../add-lab-order/blocks/types'
import { useStore } from './store'

const ReviewAllButton = () => {
  const [loading, setLoading] = useState(false)
  const { selectedRows, fetch, payload } = useStore((state) => ({
    selectedRows: state.selectedRows,
    fetch: state.fetch,
    payload: state.payload ?? {},
  }))

  const placeOrder = async (order: LabOrders) => {
    const requisitionResponse = await getLabOrderRequisition(order?.id ?? '');
  
    if (requisitionResponse.state === 'error') {
      toast.error(requisitionResponse?.error ?? 'Error while placing order');
      return; 
    }
  
    const placeOrderResponse = await placeLabOrderApi(order?.id ?? '');
    if (placeOrderResponse.state === 'error') {
      toast.error(placeOrderResponse?.error ?? 'Error while placing order');
    }
  };

  const editLabStatus = async (order: LabOrders) => {
    const orderId = order?.id ?? ''
    const { metadata, orderStatus, orderingLab, ...rest } = order
    const result = await editLabOrderApi(orderId, {
      orderStatus: LabOrderStatusEnum.Signed,
      orderingLab: {
        name: orderingLab?.name ?? '',
        locationId: orderingLab?.id ?? '',
      },
      ...rest,
    })
    if (result.state === 'error') {
      toast.error(result?.error ?? 'Error while placing order');
    }
  }

  const onClickReviewAll = async () => {
    if (selectedRows.length > 0) {
      setLoading(true)
      await Promise.all(
        selectedRows.map((order) => {
          if (order?.orderingLab?.name === 'Quest') {
            return placeOrder(order)
          } else {
            return editLabStatus(order)
          }
        }),
      )
      fetch(null, payload)
      setLoading(false)
    }
  }

  return (
    <Button
      size="1"
      loading={loading}
      disabled={loading || selectedRows.length === 0}
      highContrast
      type="button"
      onClick={onClickReviewAll}
    >
      <PenLine width={13} height={13} />
      Review All Selected
    </Button>
  )
}

export { ReviewAllButton }
