import { parseDate } from '@internationalized/date'
import { LabOrders } from '@/types'
import { formatDate, formatUTCDate, getTimeLabel } from '@/utils'
import { LabOrderStatusEnum } from './blocks/types'
import { LabOrderSchemaType } from './lab-order-schema'

const transformIn = (labOrderData: Partial<LabOrders>) => {
  return {
    diagnosis: [],
    testLabs: labOrderData
      ? labOrderData?.labTests?.filter((item) => item.recordStatus === 'Active')
      : [],
    labBillingType: labOrderData?.billType,
    labOrderStatus: labOrderData?.orderStatus ?? LabOrderStatusEnum.Unsigned,
    isFasting: labOrderData?.isFasting ? 'yes' : 'no',
    orderDate: parseDate(
      formatDate(labOrderData?.labOrderDate ?? new Date(), 'yyyy-MM-dd'),
    ),
    orderTime: getTimeLabel(
      formatUTCDate(labOrderData?.labOrderDate ?? new Date().toLocaleString()),
      false,
    ),
    labOrderId: labOrderData?.id,
    labLocationData: labOrderData ? labOrderData.orderingLab : undefined,
    labLocation: labOrderData ? labOrderData?.orderingLab?.id : '',
    specimenList: [],
    labOrderNumber: labOrderData?.labOrderNumber,
  } as LabOrderSchemaType
}

export { transformIn }
