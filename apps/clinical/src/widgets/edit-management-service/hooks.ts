import memoize from 'micro-memoize'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { AuthorityCodeSets } from '@psychplus/patient-info'
import { useStore } from './store'

const computeUsStatesOptions = memoize(
  (codeSet: AuthorityCodeSets) =>
    codeSet.codes
      .filter((code) => code.code !== CODE_NOT_SET)
      .map((code) => ({
        value: code.code,
        label: code.displayName,
      })) ?? [],
)

const useUsStatesOptions = () =>
  computeUsStatesOptions(useStore((state) => state.usStatesCodeSets))

export { useUsStatesOptions }
