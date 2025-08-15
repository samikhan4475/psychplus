import { parseDate } from '@internationalized/date'
import { LabOrders } from '@/types'
import {
  formatDate,
  formatUTCDate,
  getLocalCalendarDate,
  getTimeLabel,
} from '@/utils'
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
    isRecurrentOrder: labOrderData?.isRecurrentOrder ? 'yes' : 'no',

    repeatStartDate: labOrderData?.repeatStartDate
      ? getLocalCalendarDate(labOrderData?.repeatStartDate)
      : undefined,
    repeatEndDate: labOrderData?.repeatEndDate
      ? getLocalCalendarDate(labOrderData?.repeatEndDate)
      : undefined,

    recurrenceType: labOrderData?.recurrenceType,
  } as LabOrderSchemaType
}

export { transformIn }
