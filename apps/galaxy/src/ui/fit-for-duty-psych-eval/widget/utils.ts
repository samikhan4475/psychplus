import { DateValue } from 'react-aria-components'
import { Gender } from '@/types'
import { PatientVital } from '@/ui/vitals'
import {
  convertInchesToFeetAndInches,
  formatDateManually,
  VisitTypeEnum,
} from '@/utils'
import {
  IsAllowedArgs,
  RangeRule,
  SupportsVitals,
  TemplateValues,
} from './types'

const getInitialValues = () => ({
  // Patient Description
  patientHeightCategory: 'average',
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
  wasOnTime: 'was',
  dressed: 'appropriately',
  looked: 'groomed',
  rapportEstablished: 'was',
  eyeContact: '',
  speechArticulate: 'was',
  politeCooperative: 'was',
  relaxedConfident: 'did',
  spokeFreely: 'did',
  verbalSkills: 'average',
  affectAppropriate: 'was',
  presentationValid: 'was',
  thoughtStreamNormal: 'was',
  articulateThoughts: 'were',
  alertOriented: 'was',
  memoryImpairment: 'wasNo',
  immediateRecall: 'did',
  concentrationAttention: 'is',
  psychDisturbance: 'is',
  suicidalIdeation: 'denied',
  // Reason for Referral
  dateOfIncident: null as DateValue | null,
  sustainedInjury: 'didNot',
  injurySeverity: '',
  injuryLocation: '',
  onAdministrativeDuty: 'has',
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
  hadDisciplinary: 'haveNot',
  disciplinaryIncident: '',
  handgunDescription: '',
  //Military
  hasMilitaryExperience: 'doesNot',
  militaryBranch: '',
  //Medical
  hasAnxietyHistory: 'doesNot',
  hasDepressionHistory: 'doNot',
  hasHeadInjuryHistory: 'doesNot',
  hasLifeThreateningInjuryHistory: 'denies',
  //Legal
  hasLegalHistory: 'doesNot',
  legalHistoryDetails: '',
  hasRestrainingOrder: 'haveNot',
  restrainingOrderDetails: '',
  hasCivilLitigation: 'hasNot',
  civilLitigationDetails: '',
  motorVehicleRecord: 'unremarkable',
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
  concernAboutDrinking: 'hasNot',
  historyOfDrinkingProblems: 'isNo',
  alcoholTreatmentHistory: 'hasNot',
  alcoholTreatmentProgram: '',
  useOfIllicitDrugs: 'denies',
  marijuanaWhileEmployed: 'hasNot',
  useOfEnhancingDrugs: 'hasNot',
  //Collateral Interviews
  higherUpSummary: '',
  //Results of Interview
  incidentNarrative: '',
  //Summary and Recommendation
  summaryRecommendation: '',
  //Impulse Control'
  historyOfViolenceAsAdult: 'denied',
  historyOfDomesticViolence: 'doesNot',
  reportsImpulsivity: 'denied',
  hasBankruptcyOrPoorCredit: 'hasNever',
  //Conclusion
  isFitForDuty: 'is',
  hasPsychologicalDisorderAffectingFunction: 'isNot',
  isSuicidalRiskEvident: 'isNot',
  isWeaponMisuseThreat: 'doesNot',
  hasReasonableAccommodation: 'areNo',
  recommendedAccommodations: '',
  providerGaveRecommendationsToSubject: 'didNot',
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
    return {
      he: 'He',
      his: 'his',
      His: 'His',
      she: 'he',
      him: 'him',
      Her: 'His',
    }
  } else if (g === 'female') {
    return {
      he: 'She',
      his: 'her',
      His: 'Her',
      she: 'she',
      him: 'her',
      Her: 'Her',
    }
  } else {
    return {
      he: 'Subject',
      His: 'Subject',
      she: 'subject',
      him: 'subject',
      Her: 'Subject',
      his: 'subject',
    }
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
        const str = String(val).toLowerCase()
        if (str === 'does') return 'does have'
        if (str === 'does not') return 'does not have'
        return str
      }
      if (modifier === 'prefixIfPresent') {
        const str = String(val ?? '').trim()
        return str ? ` ${str}` : ''
      }
      if (modifier === 'appendDotIfPresent') {
        const str = String(val ?? '').trim()
        return str ? '.' : ''
      }
      if (modifier === 'withOptionalDot') {
        const str = String(val ?? '').trim()
        if (!str) return ''
        return str.endsWith('.') ? str : `${str}.`
      }

      if (modifier === 'prefixColon') {
        if (!val || String(val).trim() === '') return ''
        return `: ${val}`
      }
      if (modifier === 'bullet') {
        return `• ${val}`
      }
      let opts = undefined
      if (modifier === 'upper') {
        opts = { upperCaseFirst: true }
      }
      if (modifier === 'lower') {
        opts = { lowerCase: true }
      }
      if (modifier === 'splitNumberLower') {
        const str = String(val)
        const match = str.match(/^([a-zA-Z]+)(\d+)$/)
        if (match) {
          const [, word, number] = match
          return `${word.replace(/([A-Z])/g, ' $1').toLowerCase()} ${number}`
        }
        return str.toLowerCase()
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
  return [VisitTypeEnum.FitnessForDuty, VisitTypeEnum.PreEmployment].includes(
    visitType as VisitTypeEnum,
  )
}

const applyPatientVitals = <T extends SupportsVitals>(
  result: T,
  patientVitals?: PatientVital,
): T => {
  if (!patientVitals) return result

  const { weightPounds, heightInches } = patientVitals

  if (!result?.patientWeight && weightPounds !== null) {
    const weightStr = String(weightPounds)
    result.patientWeight = weightStr.length > 3 ? '' : weightStr
  }

  if (
    (!result?.heightFeet || !result?.heightInches) &&
    heightInches !== null &&
    !Number.isNaN(heightInches)
  ) {
    const { feet, inches } = convertInchesToFeetAndInches(Number(heightInches))
    console.log(feet, inches)
    const feetStr = String(feet)
    if (feetStr.length > 2) return result
    if (!result?.heightFeet) {
      result.heightFeet = feetStr
      result.heightInches =
        inches !== null && !Number.isNaN(inches)
          ? `${inches}`.replace(/^(\d{2})\.(\d).*/, '$1.$2')
          : '00'
    }
  }

  return result
}

const decorateEmptyInitialValues = <T extends object>(obj: T): T =>
  Object.keys(obj).reduce((acc, key) => {
    const val = obj[key as keyof T]
    return {
      ...acc,
      [key]:
        val === null || (typeof val === 'object' && val !== null) ? null : '',
    }
  }, {} as T)

const numericLengthConstraint = ({
  maxDigits,
  maxDecimalPlaces,
}: {
  maxDigits: number
  maxDecimalPlaces: number
}) => {
  return ({ value, floatValue }: { value: string; floatValue?: number }) => {
    if (value === '') return true

    const [, decPart = ''] = value.split('.')

    const digitCount = value.replace('.', '').length
    const endsWithDot = value.endsWith('.')

    if (digitCount > maxDigits) return false

    if (endsWithDot && digitCount === maxDigits) return false

    if (decPart.length > maxDecimalPlaces) return false

    return !isNaN(floatValue ?? NaN)
  }
}
const numericRangeConstraint =
  ({
    min,
    max,
    decimals,
    allowEmpty = true,
    allowTrailingDot = true,
  }: RangeRule) =>
  ({ value, floatValue }: IsAllowedArgs) => {
    if (allowEmpty && value === '') return true

    if (!/^\d+(\.\d*)?$/.test(value)) return false

    const [, dec = ''] = value.split('.')

    if (decimals === 0 && value.includes('.')) return false
    if (dec.length > decimals) return false

    if (allowTrailingDot && value.endsWith('.')) {
      const intVal = Number(value.slice(0, -1))
      if (Number.isNaN(intVal)) return false
      return intVal >= Math.ceil(min) && intVal <= Math.floor(max)
    }

    const num = floatValue ?? Number(value)
    if (Number.isNaN(num)) return false

    return num >= min && num <= max
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
  applyPatientVitals,
  decorateEmptyInitialValues,
  numericLengthConstraint,
  numericRangeConstraint,
}
