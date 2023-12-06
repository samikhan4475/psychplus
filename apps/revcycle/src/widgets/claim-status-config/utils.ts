import { Code, CodeSet } from '@psychplus/codeset'
import { editCodeSet } from '@psychplus/codeset/api.client'
import { ClaimStatus } from './types'

const toggleActivateClaimStatus = (
  claimStatus: ClaimStatus,
): Promise<CodeSet> => {
  const reqObj: Code = {
    code: claimStatus.id,
    display: claimStatus.name,
    attributes: [
      {
        name: 'IsActive',
        value: claimStatus.isActive ? 'True' : 'False',
      },
      {
        name: 'IsDeleted',
        value: claimStatus.isActive ? 'False' : 'True',
      },
    ],
  }

  return editCodeSet(reqObj, 'ClaimStatus', claimStatus.id)
}

export { toggleActivateClaimStatus }
