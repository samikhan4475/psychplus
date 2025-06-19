import { PreferredPartnerFiltersPayload } from '@/types'
import { getOptionalDateString, sanitizeFormData } from '@/utils'
import { PreferredPartnerWorklistFiltersSchemaType } from '../blocks/worklist-schema'

export const transformWorklistOut = (
  filters: Partial<PreferredPartnerWorklistFiltersSchemaType> = {},
): PreferredPartnerFiltersPayload => {
  const payload = {
    userName: filters.userName,
    ssn: filters.ssn,
    dateFrom: getOptionalDateString(filters.dateFrom),
    dateTo: getOptionalDateString(filters.dateTo),
    customerStatuses: filters.userStatus ? [filters.userStatus] : undefined,
  }
  return sanitizeFormData(payload)
}
