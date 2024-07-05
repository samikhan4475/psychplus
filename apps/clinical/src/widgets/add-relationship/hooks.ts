import memoize from 'micro-memoize'
import { CODE_NOT_SET, type RelationshipCodeSet } from '@psychplus/codeset'
import { useStore } from './store'

interface GuardianRelationshipCode {
  value: string
  label: string
}
const computeGuardianRelationship = memoize((codeSet: RelationshipCodeSet) =>
  codeSet.codes.reduce((acc, code) => {
    if (code.code !== CODE_NOT_SET) {
      acc.push({ label: code.displayName, value: code.code })
    }
    return acc
  }, [] as GuardianRelationshipCode[]),
)

const useGuardianRelationshipOptions = () =>
  computeGuardianRelationship(useStore((state) => state.relationshipsCodeset))

export { useGuardianRelationshipOptions }
