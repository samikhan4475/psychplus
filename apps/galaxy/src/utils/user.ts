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
) =>
  user?.middleName && includeMiddlename
    ? `${user?.firstName} ${user?.middleName} ${user?.lastName}, ${user?.honors}`
    : `${user?.firstName} ${user?.lastName}, ${user?.honors}`

export { getUserInitials, getUserFullName }
