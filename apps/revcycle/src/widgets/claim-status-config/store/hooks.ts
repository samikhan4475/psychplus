import {
  getCodeAttribute,
  getCodeMetadata,
  type Code,
} from '@psychplus/codeset'
import { type ClaimStatus } from '../types'
import { useStore } from './combined'

const CODE_SET_CLAIM_STATUS = 'ClaimStatus'

const useClaimStatuses = (): ClaimStatus[] =>
  useStore(
    (state) =>
      state.codeSetIndex[CODE_SET_CLAIM_STATUS]?.map((code) => ({
        ...convertCodeToClaimStatus(code),
        ...state.claimStatusDiff?.[code.code],
      })) ?? [],
  )

const convertCodeToClaimStatus = (code: Code): ClaimStatus => ({
  id: code.code,
  name: code.display,
  dueTo: getCodeAttribute(code, 'DueTo'),
  createdBy: getCodeMetadata(code, 'createdByFullName'),
  isActive: getCodeAttribute(code, 'IsActive') === 'True',
})

export { useClaimStatuses }
