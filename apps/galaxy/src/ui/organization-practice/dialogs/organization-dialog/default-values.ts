import { Organization } from '../../types'

const defaultValues = (data?: Organization) => {
  return {
    id: data?.id ?? '',
    shortName: data?.shortName ?? '',
    displayName: data?.displayName ?? '',
    recordStatus: data?.recordStatus ?? '',
    address1: data?.address1 ?? '',
    address2: data?.address2 ?? '',
    city: data?.city ?? '',
    state: data?.state ?? '',
    zip: data?.zip ?? '',
    email: data?.email ?? '',
    phone: data?.phone ?? '',
    contactName: data?.contactName ?? '',
    status: data?.status ?? '',
  }
}

export { defaultValues }
