import { getCalendarDateLabel } from '@/utils'
import { BillingFilterSchemaType } from './filter-form'
import { BillingHistoryParams } from './types'

const transformOut = (
  data: Partial<BillingFilterSchemaType>,
): BillingHistoryParams => {
  const { fromDate, endDate, locationId, ...rest } = data
  return {
    ...rest,
    ...(fromDate ? { fromDate: getCalendarDateLabel(fromDate) } : {}),
    ...(endDate ? { endDate: getCalendarDateLabel(endDate) } : {}),
    ...(locationId ? { locationId: [locationId] } : {}),
  }
}

export { transformOut }
