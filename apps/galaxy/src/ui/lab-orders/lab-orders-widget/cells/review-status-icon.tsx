import { Box, Flex, Text, Tooltip } from '@radix-ui/themes'
import { CheckCircle2, CircleX, EyeIcon, Hourglass } from 'lucide-react'
import { LabOrders } from '@/types'
import { formatDate } from '@/utils'
import { LabOrderStatusEnum } from '../../add-lab-order/blocks/types'
import { OrderStatus } from '../types'

export const reviewStatusIcon = (order: LabOrders) => {
  const isResultSigned = order?.isResultSigned
  const fullName =
    order?.resultSignedByStaffName?.firstName ||
    order?.resultSignedByStaffName?.lastName
      ? `${order?.resultSignedByStaffName?.firstName ?? ''} ${
          order?.resultSignedByStaffName?.lastName ?? ''
        }`
      : ''

  const tooltipContent = (
    <Text className="select-text">
      Reviewed By {fullName}{' '}
      {order?.resultSignedDate ? formatDate(order.resultSignedDate) : ''}
    </Text>
  )

  const icons = []

  if (isResultSigned && order.orderStatus == OrderStatus.ResultReceived) {
    icons.push(
      <Tooltip key="resultSigned" content={tooltipContent}>
        <CheckCircle2 size={18} className="ml-1 text-green-10" />
      </Tooltip>,
    )
  }

  if (
    order.orderStatus === LabOrderStatusEnum.SignedNotSent &&
    order.labValidation
  ) {
    icons.push(
      <Tooltip key="labValidation" content={order.labValidation}>
        <CircleX size={18} className="ml-1 text-red-10" />
      </Tooltip>,
    )
  }

  if (icons.length > 0) {
    return <Flex gap="2">{icons}</Flex>
  }

  return <Hourglass size={14} className="text-yellow-700 ml-1" />
}
