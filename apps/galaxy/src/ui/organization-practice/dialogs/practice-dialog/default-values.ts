import { Organization } from '../../types'

const defaultValues = (data?: Organization) => {
  const { street1, street2, city, state, postalCode } =
    data?.organizationAddress ?? {}
  return {
    organizationId: data?.id ?? '',
    sameAsOrganizationAddress: true,
    sameAsPrimaryAddress: true,
    address1: street1 ?? '',
    address2: street2 ?? '',
    city: city ?? '',
    state: state ?? '',
    zip: postalCode ?? '',
    payer: {
      street1: street1 ?? '',
      street2: street2 ?? '',
      city: city ?? '',
      state: state ?? '',
      postalCode: postalCode ?? '',
    },
  }
}

export { defaultValues }
