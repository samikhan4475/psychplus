import { EdiItem } from '../../types'

const defaultValues = (data?: EdiItem) => {
  return {
    id: data?.id ?? '',
    receiverId: data?.receiverId ?? '',
    insurancePlanId: data?.insurancePlanId ?? '',
    payerId: data?.payerId ?? '',
    isEligibility: data?.isEligibility,
    isElectronic: data?.isElectronic,
    isInstitutional: data?.isInstitutional,
    isDental: data?.isDental,
    isPaperCms1500: data?.isPaperCms1500,
    isPaperUb04: data?.isPaperUb04,
  }
}

export { defaultValues }
