import { SharedCode, State } from '@/types'
import { getCalendarDate } from '@/utils'
import {
  GetLicensesResponse,
  License,
  LicenseStatus,
  LicenseType,
  RecordStatus,
} from './types'

function transformData({
  states,
  statusFilter,
  licenses,
  licenseType,
  stateCodes,
  providerStaffId,
}: {
  states: State[]
  statusFilter?: LicenseStatus
  licenseType: LicenseType
  licenses: GetLicensesResponse[]
  stateCodes?: SharedCode[]
  providerStaffId: number
}): License[] {
  const transformedData = states.map((state) => {
    const stateCode = stateCodes?.find(
      (c) =>
        c.value === state.stateCode &&
        c.attributes?.find(
          (attribute) => attribute.name === 'CDS' && attribute.value === 'true',
        ),
    )
    const license = licenses.find(
      (l) => l.stateCode === state.stateCode,
    ) as GetLicensesResponse
    return {
      ...license,
      licenseType,
      isCDSState: !!stateCode,
      id: license?.id ?? '',
      stateName: state.stateName,
      stateCode: state.stateCode ?? '',
      stateId: state.id ?? '',
      startDate: license?.startDate
        ? getCalendarDate(license?.startDate)
        : undefined,
      endDate: license?.endDate ? getCalendarDate(license?.endDate) : undefined,
      providerStaffId: license?.providerStaffId ?? providerStaffId,
      licenseNumber: license?.licenseNumber ?? '',
      status: license?.status ?? LicenseStatus.Na,
      isAlertCheck: license?.isAlertCheck ?? false,
      recordStatus: license?.recordStatus ?? RecordStatus.Active,
    }
  })

  return transformedData
    .filter((data) => data !== null)
    .filter(
      (data) => (statusFilter && data.status === statusFilter) || !statusFilter,
    )
}

export { transformData }
