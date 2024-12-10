import { SelectOptionType } from '@/types'
import { getStaffRolesOrganizationAction } from './actions/get-organization-staff-roles'
import {
  OrganizationOptions,
  OrganizationOptionsResponse,
  Staff,
  StaffSearchParams,
} from './types'
import { createOptionsLookup } from './utils'

const transformInOptions = (
  data: OrganizationOptionsResponse[],
): OrganizationOptions => {
  const staffLookup: Record<string, SelectOptionType> = {}
  const roleLookup: Record<string, SelectOptionType> = {}
  const organizationLookup: Record<string, SelectOptionType> = {}
  const practiceLookup: Record<string, SelectOptionType> = {}

  data.forEach(({ displayName, id, users, practices }) => {
    organizationLookup[id] = { label: displayName, value: id }

    practices.forEach(({ displayName, id }) => {
      practiceLookup[id] = { label: displayName, value: id }
    })

    users.forEach(({ userRoles }) => {
      userRoles.forEach(({ displayName, actorCategory, id }) => {
        staffLookup[id] = { label: actorCategory, value: id }
        roleLookup[id] = { label: displayName, value: id }
      })
    })
  })

  return {
    staffs: Object.values(staffLookup),
    organizations: Object.values(organizationLookup),
    roles: Object.values(roleLookup),
    practices: Object.values(practiceLookup),
  }
}

const transformInStaffList = async (staffList: Staff[]): Promise<Staff[]> => {
  const result = await getStaffRolesOrganizationAction()
  if (result.state === 'success') {
    const { organizations, practices, roles } = result.data
    const organizationLookup = createOptionsLookup(organizations)
    const practiceLookup = createOptionsLookup(practices)
    const roleLookup = createOptionsLookup(roles)
    return staffList.map((staff) => ({
      ...staff,
      organizationIds: staff.organizationIds.map(
        (id) => organizationLookup[id]?.label || id,
      ),
      practiceIds: staff.practiceIds.map(
        (id) => practiceLookup[id]?.label || id,
      ),
      providerAttributions: staff.providerAttributions.map(
        (id) => practiceLookup[id]?.label || id,
      ),
      staffUserRoleIds: staff.staffUserRoleIds.map(
        (id) => roleLookup[id]?.label || id,
      ),
    }))
  } else {
    return staffList
  }
}

const transformOut = (data: Partial<StaffSearchParams>) => {
  const arrayKeys: Array<keyof typeof data> = [
    'locationIds',
    'organizationsIds',
    'practicesIds',
    'providerAttributionCodes',
    'roleCodes',
    'spokenLanguages',
    'statuses',
    'staffUserRoleIds',
    'staffIds',
  ]

  const { firstName, lastName, ...rest } = data
  const transformedData: any = { ...rest }

  if (firstName || lastName)
    transformedData.name = `${firstName || ''} ${lastName || ''}`.trim()

  arrayKeys.forEach((key) => {
    if (Array.isArray(data[key]) && data[key][0] === '') {
      delete transformedData[key]
    }
  })
  return transformedData
}

export { transformOut, transformInStaffList, transformInOptions }
