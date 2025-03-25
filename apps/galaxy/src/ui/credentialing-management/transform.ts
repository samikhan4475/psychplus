import { sanitizeFormData } from '@/ui/visit/utils'
import { getCalendarDate, getCalendarDateLabel } from '@/utils'
import { SchemaType } from './schema'
import { Filters, GetLicensesResponse, License, LicenseType } from './types'

function transformData({ data }: { data: GetLicensesResponse }): License[] {
  return data.map((license) => {
    return {
      ...license,
      startDate: license?.startDate
        ? getCalendarDate(license?.startDate)
        : undefined,
      endDate: license?.endDate ? getCalendarDate(license?.endDate) : undefined,
      staffId: license.staffId,
      userId: license.userId,
      legalName: license.legalName,
    }
  })
}

const transformFilters = (
  data: SchemaType,
  licenseType: LicenseType,
): Filters => {
  const {
    startDate,
    endDate,
    isAlert,
    status,
    state,
    licenseNumber,
    providerStaffId,
  } = data
  const payload = {
    licenseNumber: licenseNumber,
    providerStaffId: providerStaffId !== 'NotSet' ? providerStaffId : undefined,
    stateCodes: state && state !== 'NotSet' ? [state] : undefined,
    statuses: status && status !== 'NotSet' ? [status] : undefined,
    startDate: startDate ? getCalendarDateLabel(startDate) : undefined,
    isAlert: ['Yes', 'No'].includes(isAlert || '')
      ? isAlert === 'Yes'
      : undefined,
    endDate: endDate ? getCalendarDateLabel(endDate) : undefined,
    licenseTypes: [licenseType],
  }

  const sanitizedData = sanitizeFormData(payload)
  return sanitizedData
}

export { transformData, transformFilters }
