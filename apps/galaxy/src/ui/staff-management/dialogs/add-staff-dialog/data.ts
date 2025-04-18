import {
  deepSanitizeFormData,
  getPaddedDateString,
  sanitizeFormData,
} from '@/utils'
import { Staff } from '../../types'
import { SchemaType } from './schema'

const transformOut = ({
  mailingAddress,
  homeAddress,
  contactInfo: { isMailingAddressSameAsPrimary, ...contactInfo },
  dateOfBirth,
  ...data
}: SchemaType): Partial<Staff> => {
  const addresses = [
    sanitizeFormData({ ...homeAddress, type: 'Home' }),
    sanitizeFormData({
      ...(isMailingAddressSameAsPrimary ? homeAddress : mailingAddress),
      type: 'Mailing',
    }),
  ]
  return deepSanitizeFormData({
    ...data,
    contactInfo: deepSanitizeFormData({
      isMailingAddressSameAsPrimary,
      addresses,
      ...contactInfo,
    }),
    dateOfBirth: dateOfBirth ? getPaddedDateString(dateOfBirth) : null,
    virtualRoomLink:
      data?.isVirtualRoomLink === true ? data?.virtualRoomLink : undefined,
  })
}

export { transformOut }
