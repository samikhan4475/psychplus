import { ClearingHouseReceiver } from '../../types'

const defaultValues = (data?: ClearingHouseReceiver | null) => {
  return {
    id: data?.id ?? '',
    clearingHouseName: data?.clearingHouseName ?? '',
    receiverId: data?.receiverId ?? '',
    receiverName: data?.receiverName ?? '',
    phone: data?.phone ?? '',
    fax: data?.fax ?? '',
    email: data?.email ?? '',
    website: data?.website ?? '',
    submissionMethod: data?.submissionMethod
      ? data?.submissionMethod.toLocaleLowerCase()
      : '',
    submissionUrl: data?.submissionUrl ?? '',
    submissionPort: data?.submissionPort ? data?.submissionPort.toString() : '',
    submissionDirectory: data?.submissionDirectory ?? '',
    batchResponseDirectory: data?.batchResponseDirectory ?? '',
    chResponseDirectory: data?.chResponseDirectory ?? '',
    claimResponseDirectory: data?.claimResponseDirectory ?? '',
    eraResponseDirectory: data?.eraResponseDirectory ?? '',
    isa01: data?.isa01 ?? '',
    isa03: data?.isa03 ?? '',
    isa05: data?.isa05 ?? '',
    isa07: data?.isa07 ?? '',
    isa08: data?.isa08 ?? '',
    gs03: data?.gs03 ?? '',
    nm140ReceiverName: data?.nm140ReceiverName ?? '',
    nm140ReceiverId: data?.nm140ReceiverId ?? '',
    address1: data?.address1 ?? '',
    address2: data?.address2 ?? '',
    city: data?.city ?? '',
    state: data?.state ?? '',
    zip: data?.zip ?? '',
    isSupportMultipleDirectory: data?.isSupportMultipleDirectory ? 'yes' : 'no',
  }
}

export { defaultValues }
