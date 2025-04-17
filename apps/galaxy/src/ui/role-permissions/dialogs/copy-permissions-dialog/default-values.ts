import { Role } from '@/types'

const defaultValues = (data?: any) => {
  return {
    id: data?.id ?? '',
    firstName: data?.firstname ?? '',
    lastName: data?.lastname ?? '',
    address1: data?.address1 ?? '',
    address2: data?.address2 ?? '',
    city: data?.city ?? '',
    state: data?.state ?? '',
    zip: data?.zip ?? '',
    status: data?.status ?? '',
    isMailingAddressSameAsHome: 'no',
  }
}

export { defaultValues }
