import { Organization } from '../../types'

const defaultValues = (data?: Partial<Organization>) => {
  const { street1, street2, city, state, postalCode, postalPlus4Code } =
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
    postalPlus4Code: postalPlus4Code ?? '',
    recordStatus: data?.recordStatus ?? 'Active',
    practicePaymentAddress: {
      street1: street1 ?? '',
      street2: street2 ?? '',
      city: city ?? '',
      state: state ?? '',
      postalCode: postalCode ?? '',
      postalPlus4Code: postalPlus4Code ?? '',
    },
  }
}

export { defaultValues }
