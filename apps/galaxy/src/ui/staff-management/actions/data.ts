import { SelectOptionType } from '@/types'
import { OrganizationOptions, OrganizationOptionsResponse } from '../types'

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

export { transformInOptions }
