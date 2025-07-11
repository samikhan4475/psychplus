import { UserSettingName } from '@psychplus-v2/constants'
import { UserSettings } from '@psychplus-v2/types'

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

const getFullLegalName = (
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

const extractUserSetting = (
  userSettings: UserSettings[] | undefined,
  settingName: UserSettingName,
) => {
  const settingObj = userSettings?.find((item) => item.name === settingName)

  if (settingObj)
    return { ...settingObj, content: JSON.parse(settingObj.content) }

  return null
}

export {
  getUserInitials,
  getUserFullName,
  extractUserSetting,
  getFullLegalName,
}
