import { type StateCreator } from 'zustand'
import { CodeSetState, createCodeSetStore } from '@psychplus/codeset'
import { ProfessionalClaim } from '../types'

interface ProfessionalClaimState extends CodeSetState {
  professionalClaims: ProfessionalClaim[]
}

const DUMMY_PROFESSIONAL_CLAIMS: ProfessionalClaim[] = [
  {
    id: '1',
    claimId: '144940001',
    patient: 'Arce, Jacob',
    DOS: '09/22/2020',
    totalCharges: '$675',
    balance: '$0.00',
    status: 'PAID',
    type: 'Professional',
  },
  {
    id: '2',
    claimId: '144930056',
    patient: 'Leonard, Marquis',
    DOS: '10/24/20203',
    totalCharges: '$642',
    balance: '$0.00',
    status: 'PAID',
    type: 'Professional',
  },
]

const createProfessionalClaimStore: StateCreator<ProfessionalClaimState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  professionalClaims: DUMMY_PROFESSIONAL_CLAIMS,
})

export { createProfessionalClaimStore, type ProfessionalClaimState }
