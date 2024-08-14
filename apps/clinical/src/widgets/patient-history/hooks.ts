import { useEffect } from 'react'
import memoize from 'micro-memoize'
import { CODE_NOT_SET, CodeSetIndex } from '@psychplus/codeset'
import {
  AuthorityCodeSets,
  AuthorityCodesetsIndex,
} from '@psychplus/patient-info'
import { usePubsub } from '@psychplus/utils/event'
import { getPatientHistory } from './api.client'
import { useStore } from './store'
import { EVENT_PATIENT_HISTORY_UPDATED } from '@psychplus/widgets/events'

const CODE_SET_CUSTOMER_STATUS = 'CustomerStatus'
const CODE_SET_PATIENT_RACE = 'race'
const CODE_SET_PATIENT_ETHNICITY = 'ethnicity'
const CODE_SET_RELGIONS = 'ReligiousAffiliation'
const CODE_SET_LANGUAGE_ABILITY = 'LanguageAbilityMode'
const CODE_SET_LANGUAGE_PROFICIENCY = 'LanguageAbilityProficiency'

type CodesetIndex = { [key: string]: string }
const computeCustomerStatusIndex = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_CUSTOMER_STATUS]?.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.display }
    }, {} as CodesetIndex) ?? {},
)

const computeRaceIndex = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
    codeSetIndex[CODE_SET_PATIENT_RACE]?.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const computeEthnicityIndex = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
    codeSetIndex[CODE_SET_PATIENT_ETHNICITY]?.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const computeUsStatesIndex = memoize(
  (codeSet: AuthorityCodeSets) =>
    codeSet.codes.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const computeDegreeIndex = memoize(
  (codeSet: AuthorityCodeSets) =>
    codeSet.codes.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const computeReligionIndex = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
    codeSetIndex[CODE_SET_RELGIONS]?.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const computeLanguageAbilityIndex = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
    codeSetIndex[CODE_SET_LANGUAGE_ABILITY]?.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const computeLanguageProficiencyIndex = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
    codeSetIndex[CODE_SET_LANGUAGE_PROFICIENCY]?.reduce((acc, code) => {
      if (code.code === CODE_NOT_SET) return acc
      return { ...acc, [code.code]: code.displayName }
    }, {} as CodesetIndex) ?? {},
)

const useCustomerStatusIndex = () =>
  computeCustomerStatusIndex(useStore((state) => state.codeSetIndex))

const useRaceIndex = () =>
  computeRaceIndex(useStore((state) => state.raceAndEthnicityCodeSetIndex))

const useEthnicityIndex = () =>
  computeEthnicityIndex(useStore((state) => state.raceAndEthnicityCodeSetIndex))

const useUsStatesIndex = () =>
  computeUsStatesIndex(useStore((state) => state.usStatesCodeSets))

const useDegreeIndex = () =>
  computeDegreeIndex(useStore((state) => state.degreeCodeSets))

const useReligionIndex = () =>
  computeReligionIndex(useStore((state) => state.hlv3CodeSetsIndex))

const useLanguageAbilityIndex = () =>
  computeLanguageAbilityIndex(useStore((state) => state.hlv3CodeSetsIndex))

const useLanguageProficiencyIndex = () =>
  computeLanguageProficiencyIndex(useStore((state) => state.hlv3CodeSetsIndex))

const useRefetchHistory = () => {
  const { subscribe } = usePubsub()
  const patientProfile = useStore((state) => state.patient)
  const updateHistory = useStore((state) => state.setPatientHistory)

  useEffect(() => {
    return subscribe(EVENT_PATIENT_HISTORY_UPDATED, async () => {
      const updatedHistory = await getPatientHistory({
        patientId: patientProfile?.id as number,
        body: { historyCreatedFrom: '2024-05-20T01:24:08.290Z' },
      })
      updateHistory(updatedHistory)
    })
  }, [subscribe])
}

export {
  useCustomerStatusIndex,
  useRaceIndex,
  useEthnicityIndex,
  useUsStatesIndex,
  useDegreeIndex,
  useReligionIndex,
  useLanguageAbilityIndex,
  useLanguageProficiencyIndex,
  useRefetchHistory,
}
