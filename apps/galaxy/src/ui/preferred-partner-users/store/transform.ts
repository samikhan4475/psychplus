import { PreferredPartnerFiltersPayload } from '@/types'
import { getOptionalDateString, sanitizeFormData } from '@/utils'
import { PreferredPartnerFiltersSchemaType } from '../blocks/schema'

export const transformOut = (
  filters: Partial<PreferredPartnerFiltersSchemaType> = {},
): PreferredPartnerFiltersPayload => {
  const payload = {
    userName: filters.userName,
    mrn: filters.mrn,
    dateFrom: getOptionalDateString(filters.dateFrom),
    dateTo: getOptionalDateString(filters.dateTo),
  }
  return sanitizeFormData(payload)
}
