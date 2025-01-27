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
  },
  includeMiddlename = false,
) =>
  user?.middleName && includeMiddlename
    ? `${user?.firstName} ${user?.middleName} ${user?.lastName}`
    : `${user?.firstName} ${user?.lastName}`

export { getUserInitials, getUserFullName }
