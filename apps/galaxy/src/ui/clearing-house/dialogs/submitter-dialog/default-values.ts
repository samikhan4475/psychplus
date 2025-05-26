import { ClearingHouseSubmitter } from '../../types'

const defaultValues = (
  data?: ClearingHouseSubmitter | null,
  practiceId?: string | undefined,
) => {
  return {
    id: data?.id ?? '',
    name: data?.name ?? '',
    phone: data?.phone ?? '',
    fax: data?.fax ?? '',
    email: data?.email ?? '',
    city: data?.city ?? '',
    state: data?.state ?? '',
    zip: data?.zip ?? '',
    zipLast4: data?.zipLast4 ?? '',
    username: data?.username ?? '',
    password: data?.password ?? '',
    submitterId: data?.submitterId ?? '',
    contactPerson: data?.contactPerson ?? '',
    practiceId: data?.practiceId ?? practiceId,
    receiverId: data?.receiverId ?? '',
    address1: data?.addressLine1 ?? '',
    address2: data?.addressLine2 ?? '',
  }
}

export { defaultValues }
