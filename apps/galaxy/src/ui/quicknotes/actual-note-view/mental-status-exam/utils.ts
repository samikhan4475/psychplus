import { SharedCode } from '@/types'
import { replaceValueWithLabel } from '@/utils'

export const mseValueMapping: Record<string, string[]> = {
  orientation: ['oriName', 'oriPlace', 'oriDate', 'oriTime', 'oriOther'],
  appearance: [
    'appCasualDress',
    'appDisheveled',
    'appBadOrder',
    'appObese',
    'appOther',
  ],
  behavior: [
    'behRedirectable',
    'behUncooperative',
    'behPoorEyeContact',
    'behOther',
  ],
  psychomotor: [
    'psyNoSlowAgitations',
    'psySlowing',
    'psyAgitation',
    'psyCatatonic',
    'psyTremors',
    'psyTd',
    'psyTics',
    'psyOther',
  ],
  speech: [
    'speRegularRateRhythm',
    'speRapid',
    'spePressured',
    'speSlow',
    'speSoft',
    'speLoud',
    'speMuffled',
    'speOther',
  ],
  mood: [
    'modDepressed',
    'modDysphoric',
    'modAnxious',
    'modElevated',
    'modIrritable',
    'modAngry',
    'modEuthymic',
    'modOther',
  ],
  affect: [
    'affMoodCongruent',
    'affMoodIncongruent',
    'affIntense',
    'affRestricted',
    'affBlunted',
    'affFlat',
    'affLabile',
    'affGuarded',
    'affOther',
  ],
  thoughtProcess: [
    'thpLinear',
    'thpLoose',
    'thpCircumstantial',
    'thpTangential',
    'thpFlightOfIdeas',
    'thpDisorganized',
    'thpConcrete',
    'thpBlocking',
    'thpOther',
  ],
  memoryHowTested: ['mhtYesterdayEvents', 'mhtChildhoodEvents', 'mhtOther'],
  insightHowTested: [
    'inshtRealityTesting',
    'inshtRecognizeTreatment',
    'inshtRecognizeBenefits',
    'inshtOther',
  ],
  judgment: ['jdgPoor', 'jdgFair', 'jdgOther'],
  judgmentHowTested: [
    'jdghtRecentDecisionMaking',
    'jdghtSevereSymptoms',
    'jdghtOther',
  ],
  intelligence: [
    'intBelowAverage',
    'intAverage',
    'intAboveAverage',
    'intOther',
  ],
  intelligenceHowTested: ['inthtVocabulary', 'inthtOther'],
  memoryRemoteIntactOther: ['mmOther'],
  insight: ['insPoor', 'insFair', 'insOther'] as string[],
  thoughtContentOther: [],
  schizophreniaDelusionValues: [],
  schizophreniaHallucinationsValues: [],
  siUnDisclosed: [],
  hiUnDisclosed: [],
}

export const reorderObjectKeys = <T extends Record<string, unknown>>(
  obj: T,
  order: (keyof T)[],
): T => {
  const reorderedMap = new Map<keyof T, T[keyof T]>()

  order.forEach((key) => {
    if (key in obj) {
      reorderedMap.set(key, obj[key])
    }
  })

  Object.keys(obj).forEach((key) => {
    if (!reorderedMap.has(key as keyof T)) {
      reorderedMap.set(key as keyof T, obj[key as keyof T])
    }
  })

  const reorderedObj: Partial<T> = {}
  reorderedMap.forEach((value, key) => {
    reorderedObj[key] = value
  })

  return reorderedObj as T
}

export const desiredOrderMse = [
  'orientation',
  'appearance',
  'behavior',
  'psychomotor',
  'speech',
  'mood',
  'affect',
  'thoughtProcess',
  'tcsiYesNo',
  'tchiYesNo',
  'tcDelusionsYesNo',
  'schizophreniaDelusionValues',
  'tcHallucinationsYesNo',
  'schizophreniaHallucinationsValues',
  'thoughtContentOther',
  'mmRecentIntactYesNo',
  'mmRemoteIntactYesNo',
  'memoryRemoteIntactOther',
  'memoryHowTested',
  'intelligence',
  'intelligenceHowTested',
  'insight',
  'insightHowTested',
  'judgment',
  'judgmentHowTested',
  'mmOtherDetails',
  'mhtOtherDetails',
  'intOtherDetails',
  'inthtOtherDetails',
  'insOtherDetails',
  'inshtOtherDetails',
  'jdgOtherDetails',
  'jdghtOtherDetails',
  'oriOtherDetails',
  'appOtherDetails',
  'behOtherDetails',
  'psyOtherDetails',
  'speOtherDetails',
  'modOtherDetails',
  'affOtherDetails',
  'thpOtherDetails',
] as const

export const formatDelusionsAndHallucinationsValues = (
  values: string[],
  codeset?: SharedCode[],
) => {
  const count = values.length
  if (count === 0) return ''

  let updatedValues = values

  if (codeset)
    updatedValues = values.map((item) => {
      return replaceValueWithLabel(item, codeset)
    })

  if (count === 1) return updatedValues?.[0]

  return updatedValues?.map((value) => value).join(', ')
}
