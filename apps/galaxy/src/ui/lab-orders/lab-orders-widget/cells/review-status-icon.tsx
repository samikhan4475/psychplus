import { Tooltip, Text } from '@radix-ui/themes'
import { CheckCircle2, Hourglass } from 'lucide-react'
import { LabOrders } from '@/types'
import { formatDate } from '@/utils'

export const reviewStatusIcon = (order: LabOrders, appointmentId?: string) => {
  if (!appointmentId || appointmentId === '0') return null

  const isResultSigned = order?.isResultSigned

  const fullName =
    order?.resultSignedByStaffName?.firstName || order?.resultSignedByStaffName?.lastName
      ? `${order?.resultSignedByStaffName?.firstName ?? ''} ${order?.resultSignedByStaffName?.lastName ?? ''}`.trim()
      : ''

  const tooltipContent = (
    <Text className="select-text">
      Reviewed By {fullName}{' '}
      {order?.resultSignedDate ? formatDate(order.resultSignedDate) : ''}
    </Text>
  )

  if (isResultSigned) {
    return (
      <Tooltip content={tooltipContent}>
        <CheckCircle2 size={18} className="ml-1 text-green-10" />
      </Tooltip>
    )
  }

  return <Hourglass size={14} className="text-yellow-700 ml-1" />
}
