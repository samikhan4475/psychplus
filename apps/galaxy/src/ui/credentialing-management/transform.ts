import { getCalendarDate } from '@/utils'
import { GetLicensesResponse, License } from './types'

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

export { transformData }
