import { parseDate } from '@internationalized/date'
import { LabOrders } from '@/types'
import { formatDate, formatUTCDate, getTimeLabel } from '@/utils'
import { LabOrderSchemaType } from './lab-order-schema'

const transformIn = (labOrderData: Partial<LabOrders>) => {
  return {
    diagnosis: [],
    testLabs: labOrderData
      ? labOrderData?.labTests?.filter((item) => item.recordStatus === 'Active')
      : [],
    labBillingType: labOrderData ? labOrderData.billType : 'Client',
    labOrderStatus: labOrderData ? labOrderData.orderStatus : 'Draft',
    isFasting: labOrderData?.isFasting ? 'yes' : 'no',
    isPSCHold: labOrderData?.isPscHold ? 'yes' : 'no',
    orderDate: parseDate(formatDate(labOrderData?.labOrderDate ?? new Date())),
    orderTime: getTimeLabel(
      formatUTCDate(labOrderData?.labOrderDate ?? new Date().toLocaleString()),
      false,
    ),
    labOrderId: labOrderData?.id,
    labLocationData: labOrderData ? labOrderData.orderingLab : undefined,
    labLocation: labOrderData ? labOrderData?.orderingLab?.id : '',
    specimenList: [],
    labOrderNumber: labOrderData?.labOrderNumber,
    orderingStaffName: labOrderData?.orderingStaffName,
  } as LabOrderSchemaType
}

export { transformIn }
