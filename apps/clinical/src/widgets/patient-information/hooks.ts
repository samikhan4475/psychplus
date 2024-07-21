import memoize from 'micro-memoize'
import {
  CODE_NOT_SET,
  getCodeAttributeBoolean,
  type CodeSetIndex,
} from '@psychplus/codeset'
import { useStore } from '@psychplus/patient-info'
import {AuthorityCodeSets, type AuthorityCodesetsIndex } from '@psychplus/patient-info'

const CODE_SET_SERVICES_OFFERED = 'ServicesOffered'
const CODE_SET_SERVICES_STATUS = 'ServicesStatus'
const CODE_SET_CONTACT_MADE_STATUS = 'ContactMadeStatus'
const CODE_SET_RESOURCE_STATUS = 'ResourceStatus'
const CODE_SET_VERIFICATION_STATUS = 'VerificationStatus'
const CODE_SET_CUSTOMER_STATUS = 'CustomerStatus'
const CODE_SET_PATIENT_CONSENT_POLICY_TYPE = 'PatientConsentPolicyType'
const CODE_SET_INSURANCE_POLICY_PRIORITY = 'InsurancePolicyPriority'
const CODE_SET_PATIENT_RACE = 'race'
const CODE_SET_PATIENT_ETHNICITY = 'ethnicity'
const CODE_SET_GENDER = 'Gender'
const CODE_SET_GENDER_ORIENTATION = 'GenderOrientation'
const CODE_SET_GENDER_EXPRESSION = 'GenderExpression'
const CODE_SET_GENDER_PRONOUNS = 'GenderPronoun'
const CODE_SET_LANGUAGE = 'Language'
const CODE_SET_RELGIONS = 'ReligiousAffiliation'
const CODE_SET_LANGUAGE_ABILITY = 'LanguageAbilityMode'
const CODE_SET_LANGUAGE_PROFICIENCY = 'LanguageAbilityProficiency'

const computeContactStatusOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_CONTACT_MADE_STATUS]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
      disabled: !getCodeAttributeBoolean(code, 'IsUserSelectable'),
    })) ?? [],
)

const computeReferralStatusOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_RESOURCE_STATUS]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeServiceOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_SERVICES_OFFERED]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeContactStatusFilterOptions = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_CONTACT_MADE_STATUS]?.map((code) => ({
      value: code.code,
      label: code.code === CODE_NOT_SET ? 'Not Contacted' : code.display,
    })) ?? [],
)

const computeServiceLabel = memoize(
  (codeSetIndex: CodeSetIndex, service: string) =>
    codeSetIndex[CODE_SET_SERVICES_OFFERED]?.find(
      (code) => code.code === service,
    )?.display ?? 'N/A',
  { maxSize: 20 },
)

const computeStatusLabel = memoize(
  (codeSetIndex: CodeSetIndex, status: string) =>
    codeSetIndex[CODE_SET_SERVICES_STATUS]?.find((code) => code.code === status)
      ?.display ?? 'N/A',
  { maxSize: 10 },
)

// Patient info options
const computeVerificationStatus = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_VERIFICATION_STATUS]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computeCustomerStatus = memoize(
  (codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_CUSTOMER_STATUS]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
      value: code.code,
      label: code.display,
    })) ?? [],
)

const computePatientPolicyType = memoize(
  (codeSetIndex: CodeSetIndex) => 
    codeSetIndex[CODE_SET_PATIENT_CONSENT_POLICY_TYPE]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
        value: code.code,
        label: code.attributes?.[0]?.value,
    }))
)

const computeInsurancePolicyPriority = memoize(
  (codeSetIndex: CodeSetIndex) => 
  codeSetIndex[CODE_SET_INSURANCE_POLICY_PRIORITY]?.filter(
    (code) => code.code !== CODE_NOT_SET,
  ).map((code) => ({
      value: code.code,
      label: code.display,
  }))?? []
)

const computeGenderOptions = memoize(
    (codeSetIndex: CodeSetIndex) => 
    codeSetIndex[CODE_SET_GENDER]?.filter(
      (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
        value: code.code,
        label: code.display,
    }))?? []
  )

const computeGenderOrientations = memoize(
(codeSetIndex: CodeSetIndex) => 
codeSetIndex[CODE_SET_GENDER_ORIENTATION]?.filter(
    (code) => code.code !== CODE_NOT_SET,
).map((code) => ({
    value: code.code,
    label: code.display,
}))?? []
)

const computeGenderExpressions = memoize(
 (codeSetIndex: CodeSetIndex) => 
 codeSetIndex[CODE_SET_GENDER_EXPRESSION]?.filter(
     (code) => code.code !== CODE_NOT_SET,
 ).map((code) => ({
     value: code.code,
     label: code.display,
 }))?? []
)

 const computeGenderPronouns = memoize(
    (codeSetIndex: CodeSetIndex) => 
    codeSetIndex[CODE_SET_GENDER_PRONOUNS]?.filter(
        (code) => code.code !== CODE_NOT_SET,
    ).map((code) => ({
        value: code.code,
        label: code.display,
    }))?? []
 )

const computeLanguageOptions = memoize(
(codeSetIndex: CodeSetIndex) =>
    codeSetIndex[CODE_SET_LANGUAGE]?.filter(
        code => code.code !== CODE_NOT_SET
    ).map(code => ({
        value: code.code,
        label: code.display,
    }))?? []
)

const computeReligionOptions = memoize(
 (codeSetIndex: AuthorityCodesetsIndex) =>
  codeSetIndex[CODE_SET_RELGIONS]?.filter(
     code => code.code !== CODE_NOT_SET
  ).map(codeset => ({
     value: codeset.code,
     label: codeset.displayName,
  })) ?? []
)

const computeDegreeOptions = memoize(
  (codeSet: AuthorityCodeSets) =>
  codeSet.codes.filter(
      (code) => code.code !== CODE_NOT_SET,
  ).map(code => ({
      value: code.code,
      label: code.displayName,
  }))?? []
)

const computeLanguageAbilityOptions = memoize(
 (codeSetIndex: AuthorityCodesetsIndex) =>
  codeSetIndex[CODE_SET_LANGUAGE_ABILITY]?.filter(
    code => code.code !== CODE_NOT_SET
  ).map(codeset => ({
    value: codeset.code,
    label: codeset.displayName,
  }))?? []
)

const computeLanguageProficiency = memoize(
 (codeSetIndex: AuthorityCodesetsIndex) =>
  codeSetIndex[CODE_SET_LANGUAGE_PROFICIENCY]?.filter(
    code => code.code !== CODE_NOT_SET
  ).map(codeset => ({
    value: codeset.code,
    label: codeset.displayName,
  }))?? []
)

const computeRaceOptions = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
  codeSetIndex[CODE_SET_PATIENT_RACE]?.filter(
    (code) => code.code !== CODE_NOT_SET,
  ).map((code) => ({
    value: code.code,
    label: code.displayName,
  }))?? []
)

const computeEthnicityOptions = memoize(
  (codeSetIndex: AuthorityCodesetsIndex) =>
  codeSetIndex[CODE_SET_PATIENT_ETHNICITY]?.filter(
    (code) => code.code !== CODE_NOT_SET,
  ).map((code) => ({
    value: code.code,
    label: code.displayName,
  }))?? []
)

const computeUsStatesOptions = memoize(
    (codeSet: AuthorityCodeSets) =>
    codeSet.codes.filter(
        (code) => code.code !== CODE_NOT_SET,
    ).map(code => ({
        value: code.code,
        label: code.displayName,
    }))?? []
)

const useContactStatusOptions = () =>
  computeContactStatusOptions(useStore((state) => state.codeSetIndex))

const useContactStatusFilterOptions = () =>
  computeContactStatusFilterOptions(useStore((state) => state.codeSetIndex))

const useReferralStatusOptions = () =>
  computeReferralStatusOptions(useStore((state) => state.codeSetIndex))

const useVerificationStatusOptions = () => 
   computeVerificationStatus(useStore(state => state.codeSetIndex))

const useCustomerStatusOptions = () => 
  computeCustomerStatus(useStore(state => state.codeSetIndex))

const useConsentsPolicyTypeOptions = () => 
  computePatientPolicyType(useStore(state => state.codeSetIndex))

const useServiceOptions = () =>
  computeServiceOptions(useStore((state) => state.codeSetIndex))

const useInsurancePolicyPriorityOptions = () =>
 computeInsurancePolicyPriority(useStore(state => state.codeSetIndex))

const usePatientRaceOptions = () =>
  computeRaceOptions(useStore(state => state.raceAndEthnicityCodeSetIndex))

const usePatientEthnicityOptions = () =>
 computeEthnicityOptions(useStore(state => state.raceAndEthnicityCodeSetIndex))

const useUsStatesOptions = () =>
computeUsStatesOptions(useStore(state => state.usStatesCodeSets))

const useGenderOptions = () => 
  computeGenderOptions(useStore(state => state.codeSetIndex))

const useGenderOrientations = () =>
 computeGenderOrientations(useStore(state => state.codeSetIndex))

const useGenderExpressions = () =>
  computeGenderExpressions(useStore(state => state.codeSetIndex))

const useGenderPronouns = () =>
  computeGenderPronouns(useStore(state => state.codeSetIndex)) 

const useLanguageOptions = () =>
  computeLanguageOptions(useStore(state => state.codeSetIndex))

const useReligionOptions = () =>
  computeReligionOptions(useStore(state => state.hlv3CodeSetsIndex))

const useDegreeOptions = () =>
  computeDegreeOptions(useStore(state => state.degreeCodeSets))

const useLanguageAbilityOptions = () =>
  computeLanguageAbilityOptions(useStore(state => state.hlv3CodeSetsIndex))   

const useLanguageProficiencyOptions = () =>
  computeLanguageProficiency(useStore(state => state.hlv3CodeSetsIndex))

const useServiceLabel = (service: string) =>
  computeServiceLabel(
    useStore((state) => state.codeSetIndex),
    service,
  )

const useStatusLabel = (status: string) =>
  computeStatusLabel(
    useStore((state) => state.codeSetIndex),
    status,
  )


export {
  useContactStatusOptions,
  useContactStatusFilterOptions,
  useReferralStatusOptions,
  useServiceOptions,
  useServiceLabel,
  useStatusLabel,
  useVerificationStatusOptions,
  useCustomerStatusOptions,
  useConsentsPolicyTypeOptions,
  useInsurancePolicyPriorityOptions,
  usePatientRaceOptions,
  usePatientEthnicityOptions,
  useUsStatesOptions,
  useGenderOptions,
  useGenderOrientations,
  useGenderExpressions,
  useGenderPronouns,
  useLanguageOptions,
  useReligionOptions,
  useLanguageAbilityOptions,
  useLanguageProficiencyOptions,
  useDegreeOptions,
}
