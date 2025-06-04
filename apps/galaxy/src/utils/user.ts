import { SelectOptionType } from "@/types"

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

const getUserStatus = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export { getUserInitials, getUserFullName, getNameInitials, getUserStatus }
