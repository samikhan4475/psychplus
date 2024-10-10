import { getCalendarDateLabel, sanitizeFormData } from '@/utils'
import { SchemaType } from './filter-form'
import { GetPatientPaymentHistoryParams } from './types'

const transformOut = (
  data: Partial<SchemaType>,
): GetPatientPaymentHistoryParams => {
  const payload: GetPatientPaymentHistoryParams = sanitizeFormData({
    patientIds: data.patientIds,
    endDate: data.endDate ? getCalendarDateLabel(data.endDate) : '',
    startDate: data.startDate ? getCalendarDateLabel(data.startDate) : '',
    transactionTypes: data.chargeType ? [data.chargeType] : [],
    preferredPartnerIds: data.preferredPartnerIds,
  })

  return payload
}

export { transformOut }
