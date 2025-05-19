import {
  DiagnosisIcd10Code,
  QuickNoteSectionItem,
  VisitSequenceTypes,
} from '@/types'
import { isHospitalCareVisit } from '@/utils'

const NON_INSURANCE_DIAGNOSIS_CODE_SET = ['F72', 'F73', 'F79']

const QUESTIONNAIRE_DIAGNOSIS_CODE_SET = ['F01', 'F02', 'F03']

const shouldDisableDiagnosisActions = (
  visitType: string,
  visitSequence: string,
): boolean => {
  if (!isHospitalCareVisit(visitType)) return false

  return visitSequence === VisitSequenceTypes.Discharge
}

const getFilteredDiagnosesByCodes = (
  diagnoses: DiagnosisIcd10Code[] = [],
  newDiagnoses: DiagnosisIcd10Code,
  baseCodes: string[] = ['F2', 'F3'],
): DiagnosisIcd10Code[] => {
  const filterCode = baseCodes.find((code) =>
    newDiagnoses?.code?.startsWith(code),
  )
  if (!filterCode) return diagnoses
  return diagnoses?.filter((d) => !d?.code?.startsWith(filterCode))
}

const getFirstSectionValue = (
  items: QuickNoteSectionItem[] = [],
): string | undefined => {
  const val = items[0]?.sectionItemValue
  return val && val !== 'empty' ? val : undefined
}

const extractCodePrefix = (code: string): string =>
  code?.match(/^[^.]+/)?.[0] ?? ''

const isDiagnosisCodeExist = (code: string, baseCodes: string[]): boolean =>
  baseCodes.includes(extractCodePrefix(code))

const hasNonInsuranceDiagnosis = (
  data: QuickNoteSectionItem[] = [],
  includeQuestionnaireDx = true,
  prefixes?: string[],
): boolean => {
  const v = getFirstSectionValue(data)
  if (!v) return false
  const diagPrefixes =
    prefixes ??
    (includeQuestionnaireDx
      ? [
          ...NON_INSURANCE_DIAGNOSIS_CODE_SET,
          ...QUESTIONNAIRE_DIAGNOSIS_CODE_SET,
        ]
      : NON_INSURANCE_DIAGNOSIS_CODE_SET)
  return v.split(',').some((c) => isDiagnosisCodeExist(c, diagPrefixes))
}

const isPsychoanalysisConditionMet = (
  items: QuickNoteSectionItem[] = [],
): boolean => {
  const therapyOn =
    items.find((i) => i.sectionItem === 'therapy')?.sectionItemValue === 'true'
  const psycho = items.find(
    (i) => i.sectionItem === 'therapyPsychoanalysis',
  )?.sectionItemValue
  return therapyOn && psycho !== 'neither'
}

const isMOCAQuestionnaireRequired = (
  dxData: QuickNoteSectionItem[] = [],
  addOnData: QuickNoteSectionItem[] = [],
): boolean =>
  hasNonInsuranceDiagnosis(dxData, false, QUESTIONNAIRE_DIAGNOSIS_CODE_SET) &&
  isPsychoanalysisConditionMet(addOnData)

const serializeList = (items: string[]): string => {
  const filtered = items.filter((item) => item !== 'empty')
  return filtered.length ? filtered.join(',') : 'empty'
}

const buildDiagnosisQuickNoteItems = (
  patientId: string,
  sectionName: string,
  diagnoses: DiagnosisIcd10Code[],
  appId?: string,
): QuickNoteSectionItem[] => {
  const codes = diagnoses.map((d) => d.code)
  return [
    {
      pid: +patientId,
      sectionName: sectionName,
      sectionItem: 'diagnosis',
      sectionItemValue: serializeList(codes),
      ...(appId ? { appId: +appId } : {}),
    },
  ]
}
export {
  shouldDisableDiagnosisActions,
  getFilteredDiagnosesByCodes,
  NON_INSURANCE_DIAGNOSIS_CODE_SET,
  QUESTIONNAIRE_DIAGNOSIS_CODE_SET,
  hasNonInsuranceDiagnosis,
  extractCodePrefix,
  isDiagnosisCodeExist,
  getFirstSectionValue,
  isMOCAQuestionnaireRequired,
  buildDiagnosisQuickNoteItems,
}
