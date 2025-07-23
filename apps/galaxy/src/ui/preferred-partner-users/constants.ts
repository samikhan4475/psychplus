export const PREFERRED_PARTNER_TABLE_PAGE_SIZE = 20
export const PREFERRED_PARTNER_FILTERS_KEY = 'preferred-partner-filters'

export const PP_USER_TYPES = {
  INDIVIDUAL: 'Individual',
  COUPLE: 'Couple',
  FAMILY: 'Family',
} as const

export const USER_STATUS = {
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
} as const

export const PP_USER_TYPE_OPTIONS = [
  { value: PP_USER_TYPES.INDIVIDUAL, label: 'Individual' },
  { value: PP_USER_TYPES.COUPLE, label: 'Couple' },
  { value: PP_USER_TYPES.FAMILY, label: 'Family' },
]

export type PPUserType = (typeof PP_USER_TYPES)[keyof typeof PP_USER_TYPES]
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]
