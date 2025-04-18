import { Organization, Practice, Staff, StaffSearchParams } from './types'

const getJoinedOrganizations = (organizations: Organization[]) => {
  return organizations.map((org) => org.displayName).join(', ')
}

const getJoinedPractices = (practices: Practice[]) => {
  return practices.map((org) => org.displayName).join(', ')
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
    'honors',
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

const getHomeAddress = (data: Staff) => {
  let address = ''
  if (data?.contactInfo?.addresses?.length > 0) {
    const { street1, city, country, postalCode } = data.contactInfo.addresses[0]
    address = `${street1 ?? ''}, ${country ?? ''}, ${city ?? ''},${
      postalCode ?? ''
    }`
  }
  return address
}

const uniqueStaffType = (staff: string[]) => {
  return staff?.filter((item, i, ar) => ar.indexOf(item) === i).join(', ')
}

export {
  getJoinedOrganizations,
  getJoinedPractices,
  transformOut,
  getHomeAddress,
  uniqueStaffType,
}
