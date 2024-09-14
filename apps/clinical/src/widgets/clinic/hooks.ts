import memoize from 'micro-memoize'
import { CODE_NOT_SET, type CodeSetIndex } from '@psychplus/codeset'
import { AuthorityCodeSets } from '@psychplus/patient-info'
import { useStore } from './store'
import { Provider } from './types'

const CODE_SET_SERVICES_OFFERED = 'ServicesOffered'
const CODE_SET_GENDER = 'Gender'
const CODE_SET_SPECIALIST_TYPE = 'SpecialistType'

const computeServiceOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_SERVICES_OFFERED]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeUsStatesOptions = memoize(
  (codeSet: AuthorityCodeSets) =>
    codeSet.codes
      .filter((code) => code.code !== CODE_NOT_SET)
      .map((code) => ({
        value: code.code,
        label: code.displayName,
      })) ?? [],
)

const computeLanguageOptions = memoize(
  (codeSet: AuthorityCodeSets) =>
    codeSet.codes
      .filter((code) => code.code !== CODE_NOT_SET)
      .map((code) => ({
        value: code.code,
        label: code.displayName,
      })) ?? [],
)

const computeGenderOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_GENDER]?.filter(
      (code) => code.code !== CODE_SET_GENDER,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeSpecialistTypeOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_SPECIALIST_TYPE]?.filter(
      (code) => code.code !== CODE_SET_SPECIALIST_TYPE,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeProviderOptions = memoize((providers: Provider[]) =>
  providers.map((provider) => ({
    label: `${provider.legalName.firstName} ${provider.legalName.lastName}`,
    value: `${provider.id}`,
  })),
)

const useServiceOptions = () =>
  computeServiceOptions(useStore((state) => state.codeSetIndex))

const useUsStatesOptions = () =>
  computeUsStatesOptions(useStore((state) => state.usStatesCodeSets))

const useGenderOptions = () =>
  computeGenderOptions(useStore((state) => state.codeSetIndex))

const useSpecialistTypeOptions = () =>
  computeSpecialistTypeOptions(useStore((state) => state.codeSetIndex))

const useLanguageOptions = () =>
  computeLanguageOptions(useStore((state) => state.languageCodeSets))

const useProviderOptions = () =>
  computeProviderOptions(useStore((state) => state.providers))

export {
  useServiceOptions,
  useUsStatesOptions,
  useGenderOptions,
  useSpecialistTypeOptions,
  useLanguageOptions,
  useProviderOptions,
}
