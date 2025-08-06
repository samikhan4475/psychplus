import { DateValue } from 'react-aria-components'
import { Gender } from '@/types'
import { formatDateManually, VisitTypeEnum } from '@/utils'
import { TemplateValues } from './types'

const getInitialValues = () => ({
  // Patient Description
  patientHeightCategory: '',
  patientFrameSize: '',
  patientBodyBuild: '',
  heightInches: '',
  heightFeet: '',
  patientWeight: '',
  // Fit for Duty
  referringOrganization: '',
  referringOrganizationOtherDetails: '',
  intervieweeRole: '',
  intervieweeRoleOtherDetails: '',
  // Patient Appointment
  wasOnTime: '',
  dressed: '',
  looked: '',
  rapportEstablished: '',
  eyeContact: '',
  speechArticulate: '',
  politeCooperative: '',
  relaxedConfident: '',
  spokeFreely: '',
  verbalSkills: '',
  affectAppropriate: '',
  presentationValid: '',
  thoughtStreamNormal: '',
  articulateThoughts: '',
  alertOriented: '',
  memoryImpairment: '',
  immediateRecall: '',
  concentrationAttention: '',
  psychDisturbance: '',
  suicidalIdeation: '',
  // Reason for Referral
  dateOfIncident: null as DateValue | null,
  sustainedInjury: '',
  injurySeverity: '',
  injuryLocation: '',
  onAdministrativeDuty: '',
  //Review of Records
  incidentDescription: '',
  //History
  relationshipStatus: '',
  currentCity: '',
  hasChildren: '',
  //Employment
  employedSinceMonth: '',
  employedSinceYear: '',
  priorPosition: '',
  positionDuration: '',
  hadDisciplinary: '',
  disciplinaryIncident: '',
  handgunDescription: '',
  //Military
  hasMilitaryExperience: '',
  militaryBranch: '',
  //Medical
  hasAnxietyHistory: '',
  hasDepressionHistory: '',
  hasHeadInjuryHistory: '',
  hasLifeThreateningInjuryHistory: '',
  //Legal
  hasLegalHistory: '',
  legalHistoryDetails: '',
  hasRestrainingOrder: '',
  restrainingOrderDetails: '',
  hasCivilLitigation: '',
  civilLitigationDetails: '',
  motorVehicleRecord: '',
  motorVehicleRecordDetails: '',
  //Family History
  familyHistoryDetails: '',
  //Education
  highSchoolPerformance: '',
  postHighSchoolEducation: '',
  //alcohol
  alcoholFrequency: '',
  drinksPerSitting: '',
  maxAlcoholConsumed: '',
  concernAboutDrinking: '',
  historyOfDrinkingProblems: '',
  alcoholTreatmentHistory: '',
  alcoholTreatmentProgram: '',
  useOfIllicitDrugs: '',
  marijuanaWhileEmployed: '',
  useOfEnhancingDrugs: '',
  //Collateral Interviews
  higherUpSummary: '',
  //Results of Interview
  incidentNarrative: '',
  //Summary and Recommendation
  summaryRecommendation: '',
  //Impulse Control'
  historyOfViolenceAsAdult: '',
  historyOfDomesticViolence: '',
  reportsImpulsivity: '',
  hasBankruptcyOrPoorCredit: '',
  //Conclusion
  isFitForDuty: '',
  hasPsychologicalDisorderAffectingFunction: '',
  isSuicidalRiskEvident: '',
  isWeaponMisuseThreat: '',
  hasReasonableAccommodation: '',
  recommendedAccommodations: '',
  providerGaveRecommendationsToSubject: '',
})
const formatValue = (
  value?: string,
  opts?: { upperCaseFirst?: boolean; lowerCase?: boolean },
): string => {
  if (!value) return ''

  if (value.includes('_')) {
    return value.replace(/_/g, ' ')
  }

  let spaced = value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')

  if (opts?.lowerCase) {
    spaced = spaced.toLowerCase()
  }

  if (opts?.upperCaseFirst) {
    spaced = spaced.replace(/\b\w/g, (c) => c.toUpperCase())
  }

  return spaced
}

const getFormattedValue = (
  value: string,
  details?: string,
  query?: string,
  opts?: { upperCaseFirst?: boolean },
) => {
  if (value?.toLowerCase() === query) {
    return details
  }
  return formatValue(value, opts)
}

const getPronoun = (gender: Gender) => {
  const g = gender?.toLowerCase()
  if (g === 'male') {
    return { he: 'He', his: 'His', she: 'he' }
  } else if (g === 'female') {
    return { he: 'She', his: 'Her', she: 'she' }
  } else {
    return { he: 'Subject', his: 'Subject', she: 'subject' }
  }
}

const formatPlainDate = (val?: DateValue | string | null): string => {
  if (!val) return ''

  if (typeof val === 'string') {
    return formatDateManually(val)
  }

  return `${String(val.month).padStart(2, '0')}/${String(val.day).padStart(
    2,
    '0',
  )}/${val.year}`
}

const interpolateTemplate = (
  template: string,
  values: TemplateValues & { gender: Gender },
): string => {
  const pronouns = getPronoun(values.gender)

  return template.replace(
    /\(\(([^|)]+)(?:\|([^)|]+))?\)\)/g,
    (_, key: string, modifier: string | undefined) => {
      if (key in pronouns) return pronouns[key as keyof typeof pronouns]

      const val = values[key]
      if (!val) return ''

      if (modifier === 'date') {
        return formatPlainDate(val as string | DateValue)
      }

      if (modifier === 'prependColonIfPresent') {
        const str = String(val ?? '')?.trim()
        return str ? `: ${str}` : ''
      }
      if (modifier === 'prependEnlistIfPresent') {
        const str = String(val ?? '').trim()
        return str ? ` — they were enlisted in ${str}` : ''
      }
      if (modifier === 'fixHave') {
        const str = String(val)
        if (str === 'does') return 'does have'
        if (str === 'does not') return 'does not have'
        return str
      }

      if (modifier === 'prefixColon') {
        if (!val || String(val).trim() === '') return ''
        return `: ${val}`
      }
      let opts = undefined
      if (modifier === 'upper') {
        opts = { upperCaseFirst: true }
      }
      if (modifier === 'lower') {
        opts = { lowerCase: true }
      }

      return formatValue(val as string, opts)
    },
  )
}

const generateYearOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const year = String(start + i)
    return { label: year, value: year }
  })
}

const generateMonthOption = (labels: string[]) => {
  return labels?.map((label) => ({
    label,
    value: label,
  }))
}

const isNeuroPsychVisit = (visitType: string) => {
  return visitType === VisitTypeEnum.FitnessForDuty
}
export {
  getInitialValues,
  formatValue,
  getFormattedValue,
  getPronoun,
  formatPlainDate,
  interpolateTemplate,
  generateYearOptions,
  generateMonthOption,
  isNeuroPsychVisit,
}
