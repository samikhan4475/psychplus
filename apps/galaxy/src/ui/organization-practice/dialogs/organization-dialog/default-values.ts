import { Organization } from '../../types'

const defaultValues = (data?: Organization) => {
  return {
    id: data?.id ?? '',
    name: data?.shortName ?? '',
    displayName: data?.displayName ?? '',
    recordStatus: data?.recordStatus ?? '',
    address1: data?.organizationAddress.street1 ?? '',
    address2: data?.organizationAddress.street2 ?? '',
    city: data?.organizationAddress.city ?? '',
    state: data?.organizationAddress.state ?? '',
    zip: data?.organizationAddress.postalCode ?? '',
    email: data?.email ?? '',
    phone: data?.phone ?? '',
    contactName: data?.contactName ?? '',
  }
}

export { defaultValues }
