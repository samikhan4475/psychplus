const getUserInitials = ({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) => firstName.charAt(0) + lastName.charAt(0)

const getUserFullName = (
  {
    firstName,
    middleName,
    lastName,
  }: {
    firstName: string
    middleName?: string
    lastName: string
  },
  includeMiddlename = false,
) =>
  middleName && includeMiddlename
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`

export { getUserInitials, getUserFullName }
