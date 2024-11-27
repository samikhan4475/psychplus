import { Staff } from '../../types'

const transformOut = (data: Partial<Staff>): Partial<Staff> => {
  if (
    data?.contactInfo?.isMailingAddressSameAsPrimary &&
    data?.contactInfo.addresses?.length > 0
  ) {
    const { street1, city, state, postalCode, country } =
      data.contactInfo.addresses[0]
    data.contactInfo.addresses[1] = {
      type: 'Mailing',
      country,
      street1,
      city,
      state,
      postalCode,
    }
  }
  return data
}

export { transformOut }
