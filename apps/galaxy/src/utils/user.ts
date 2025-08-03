import { AdminType } from '@/enum'
import { Practice, SelectOptionType } from '@/types'

const getUserInitials = ({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) => firstName.charAt(0) + lastName.charAt(0)

const getUserFullName = (
  user: {
    firstName: string
    middleName?: string
    lastName: string
    honors?: string
  },
  includeMiddlename = false,
) => {
  const name =
    includeMiddlename && user.middleName
      ? `${user.firstName} ${user.middleName} ${user.lastName}`
      : `${user.firstName} ${user.lastName}`
  return user.honors ? `${name}, ${user.honors}` : name
}

const getNameInitials = (value?: string) => {
  if (!value) {
    return 'UK'
  }
  const initials = value
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
  return initials
}

const getAdminUserPracticeId = (practices: Practice[]) => {
  const practice = practices.find((practice) =>
    practice?.users?.[0]?.userRoles?.some(
      (role) => role.actorCategory === AdminType.PRACTICE_ADMIN,
    ),
  )

  return practice?.id ?? null
}

const getManagementLink = (
  organizationIds?: string[],
  staffPractice?: Practice[],
  staffTypes?: string[],
) => {
  if (staffTypes?.includes(AdminType.SUPER_ADMIN)) {
    return '/management'
  }
  if (staffTypes?.includes(AdminType.ORG_ADMIN)) {
    return `/management/organization-practice/organizations/${organizationIds?.[0]}/organization-profile`
  }
  if (staffTypes?.includes(AdminType.PRACTICE_ADMIN)) {
    return `/management/organization-practice/practices/${getAdminUserPracticeId(
      staffPractice as Practice[],
    )}/practices-profile`
  }
  return '/'
}

const getUserStatus = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export {
  getUserInitials,
  getUserFullName,
  getNameInitials,
  getUserStatus,
  getAdminUserPracticeId,
  getManagementLink,
}
