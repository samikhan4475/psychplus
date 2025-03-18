import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { MseWidgetSchemaType } from './mse-widget-schema'
import { createEmptyFormValues } from './mseDefaults'
import { validateYesNoEnum } from './utils'

const QUICKNOTE_SECTION_NAME = 'QuicknoteSectionMse'

enum ExamPrefixes {
  ORIENTATION = 'ORI',
  APPEARANCE = 'APP',
  BEHAVIOR = 'BEH',
  PSYCHOMOTOR = 'PSY',
  SPEECH = 'SPE',
  MOOD = 'MOD',
  AFFECT = 'AFF',
  THOUGHT_PROCESS = 'THP',
  THOUGHT_CONTENT = 'TC',
  MEMORY_HOW_TESTED = 'MHT',
  INTELLIGENCE = 'INT',
  INTELLIGENCE_RADIO = 'INTRD',
  INTELLIGENCE_HOW_TESTED = 'INTHT',
  INSIGHT = 'INS',
  INSIGHT_HOW_TESTED = 'INSHT',
  JUDGMENT = 'JDG',
  JUDGMENT_HOW_TESTED = 'JDGHT',
  MEMORY_RECENT_INTACT = 'MRCI',
  MEMORY_REMOTE_INTACT = 'MRMI',
  MEMORY = 'MM',
  THOUGHT_CONTENT_SI = 'SI',
  THOUGHT_CONTENT_HI = 'HI',
  SCHIZOPHRENIA_DELUSION = 'SD',
  SCHIZOPHRENIA_HALLUCINATIONS = 'SH',
}

const valueToSchemaPe: { [key: string]: string } = {
  //ORIENTATION block
  ORI_Name: 'oriName',
  ORI_Place: 'oriPlace',
  ORI_Date: 'oriDate',
  ORI_Time: 'oriTime',
  ORI_Other: 'oriOther',

  // Appearance block
  APP_CasualDress: 'appCasualDress',
  APP_Disheveled: 'appDisheveled',
  APP_BadOrder: 'appBadOrder',
  APP_Obese: 'appObese',
  APP_Other: 'appOther',

  // Behavior block
  BEH_Redirectable: 'behRedirectable',
  BEH_Uncooperative: 'behUncooperative',
  BEH_PoorEyeContact: 'behPoorEyeContact',
  BEH_Other: 'behOther',

  // Psychomotor block

  PSY_NoSlowAgitations: 'psyNoSlowAgitations',
  PSY_Slowing: 'psySlowing',
  PSY_Agitation: 'psyAgitation',
  PSY_Catatonic: 'psyCatatonic',
  PSY_Tremors: 'psyTremors',
  PSY_TD: 'psyTd',
  PSY_Tics: 'psyTics',
  PSY_Other: 'psyOther',

  // Speech block
  SPE_RegularRateRhythm: 'speRegularRateRhythm',
  SPE_Rapid: 'speRapid',
  SPE_Pressured: 'spePressured',
  SPE_Slow: 'speSlow',
  SPE_Soft: 'speSoft',
  SPE_Loud: 'speLoud',
  SPE_Muffled: 'speMuffled',
  SPE_Other: 'speOther',

  // Mood block
  MOD_Depressed: 'modDepressed',
  MOD_Dysphoric: 'modDysphoric',
  MOD_Anxious: 'modAnxious',
  MOD_Elevated: 'modElevated',
  MOD_Irritable: 'modIrritable',
  MOD_Angry: 'modAngry',
  MOD_Euthymic: 'modEuthymic',
  MOD_Other: 'modOther',

  // Affect block
  AFF_MoodCongruent: 'affMoodCongruent',
  AFF_MoodIncongruent: 'affMoodIncongruent',
  AFF_Intense: 'affIntense',
  AFF_Restricted: 'affRestricted',
  AFF_Blunted: 'affBlunted',
  AFF_Flat: 'affFlat',
  AFF_Labile: 'affLabile',
  AFF_Guarded: 'affGuarded',
  AFF_Other: 'affOther',

  // Thought Process block
  THP_Linear: 'thpLinear',
  THP_Loose: 'thpLoose',
  THP_Circumstantial: 'thpCircumstantial',
  THP_Tangential: 'thpTangential',
  THP_FlightOfIdeas: 'thpFlightOfIdeas',
  THP_Disorganized: 'thpDisorganized',
  THP_Concrete: 'thpConcrete',
  THP_Blocking: 'thpBlocking',
  THP_Other: 'thpOther',

  // Memory block
  // MRCI_MemoryRecentIntact: 'mrciMemoryRecentIntact',
  // MRMI_MemoryRemoteIntact: 'mrmiMemoryRemoteIntact',
  MM_Other: 'mmOther',
  MHT_YesterdayEvents: 'mhtYesterdayEvents',
  MHT_ChildhoodEvents: 'mhtChildhoodEvents',
  MHT_Other: 'mhtOther',

  //Thought Content Block
  SI_UnDisclosed: 'siUnDisclosed',
  HI_UnDisclosed: 'hiUnDisclosed',
  TC_Other: 'tcOther',

  // Intelligence block
  INT_BelowAverage: 'intBelowAverage',
  INT_Average: 'intAverage',
  INT_AboveAverage: 'intAboveAverage',
  INT_Other: 'intOther',
  INTHT_Vocabulary: 'inthtVocabulary',
  INTHT_Other: 'inthtOther',

  // Insight block
  INS_Poor: 'insPoor',
  INS_Fair: 'insFair',
  INS_Other: 'insOther',
  INSHT_RealityTesting: 'inshtRealityTesting',
  INSHT_RecognizeTreatment: 'inshtRecognizeTreatment',
  INSHT_RecognizeBenefits: 'inshtRecognizeBenefits',
  INSHT_Other: 'inshtOther',

  // Judgment block
  JDG_Poor: 'jdgPoor',
  JDG_Fair: 'jdgFair',
  JDG_Other: 'jdgOther',
  JDGHT_RecentDecisionMaking: 'jdghtRecentDecisionMaking',
  JDGHT_SevereSymptoms: 'jdghtSevereSymptoms',
  JDGHT_Other: 'jdghtOther',
}

const schemaToValue: { [key: string]: string } = Object.entries(
  valueToSchemaPe,
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

const transformIn = (value?: QuickNoteSectionItem[]): MseWidgetSchemaType => {
  const result = createEmptyFormValues()
  value?.forEach((item) => {
    if (!item.sectionItem) return
    if (item.sectionItem === 'widgetContainerCheckboxField') {
      result.widgetContainerCheckboxField = item.sectionItemValue
    }
    if (item.sectionItem.includes('schizophreniaHallucinationsValues')) {
      result.schizophreniaHallucinationsValues =
        item?.sectionItemValue?.split(',')
    }
    if (item.sectionItem.includes('schizophreniaDelusionValues')) {
      result.schizophreniaDelusionValues = item?.sectionItemValue?.split(',')
    }
    if (item.sectionItem.includes('intelligenceRadio')) {
      result.intelligenceRadio = item.sectionItemValue
    }
    if (item.sectionItem.includes('insightRadio')) {
      result.insightRadio = item.sectionItemValue
    }
    if (item.sectionItem.includes('JudgmentRadio')) {
      result.JudgmentRadio = item.sectionItemValue
    }
    if (item.sectionItem.includes('YesNo')) {
      switch (item.sectionItem) {
        case 'tcsiYesNo':
          result.tcsiYesNo = validateYesNoEnum(item.sectionItemValue) as
            | 'yes'
            | 'no'
            | ''
          break
        case 'tchiYesNo':
          result.tchiYesNo = validateYesNoEnum(item.sectionItemValue) as
            | 'yes'
            | 'no'
            | ''
          break
        case 'tcDelusionsYesNo':
          result.tcDelusionsYesNo = validateYesNoEnum(item.sectionItemValue) as
            | 'yes'
            | 'no'
            | ''
          break
        case 'tcHallucinationsYesNo':
          result.tcHallucinationsYesNo = validateYesNoEnum(
            item.sectionItemValue,
          ) as 'yes' | 'no' | ''
          break
        case 'mmRecentIntactYesNo':
          result.mmRecentIntactYesNo = validateYesNoEnum(
            item.sectionItemValue,
          ) as 'yes' | 'no' | ''
          break
        case 'mmRemoteIntactYesNo':
          result.mmRemoteIntactYesNo = validateYesNoEnum(
            item.sectionItemValue,
          ) as 'yes' | 'no' | ''
          break
        default:
          break
      }
    }

    if (item.sectionItem.includes('Other')) {
      const otherValue = item.sectionItemValue ?? ''
      switch (item.sectionItem) {
        case 'mmOtherDetails':
          result.mmOtherDetails = otherValue
          break
        case 'mhtOtherDetails':
          result.mhtOtherDetails = otherValue
          break
        case 'intOtherDetails':
          result.intOtherDetails = otherValue
          break
        case 'inthtOtherDetails':
          result.inthtOtherDetails = otherValue
          break
        case 'insOtherDetails':
          result.insOtherDetails = otherValue
          break
        case 'inshtOtherDetails':
          result.inshtOtherDetails = otherValue
          break
        case 'jdgOtherDetails':
          result.jdgOtherDetails = otherValue
          break
        case 'jdghtOtherDetails':
          result.jdghtOtherDetails = otherValue
          break
        case 'oriOtherDetails':
          result.oriOtherDetails = otherValue
          break
        case 'appOtherDetails':
          result.appOtherDetails = otherValue
          break
        case 'behOtherDetails':
          result.behOtherDetails = otherValue
          break
        case 'psyOtherDetails':
          result.psyOtherDetails = otherValue
          break
        case 'speOtherDetails':
          result.speOtherDetails = otherValue
          break
        case 'modOtherDetails':
          result.modOtherDetails = otherValue
          break
        case 'affOtherDetails':
          result.affOtherDetails = otherValue
          break
        case 'thpOtherDetails':
          result.thpOtherDetails = otherValue
          break
        case 'tcOtherDetails':
          result.tcOtherDetails = otherValue
          break
        case 'hiOtherDetails':
          result.hiOtherDetails = otherValue
          break
        case 'siOtherDetails':
          result.siOtherDetails = otherValue
          break
        default:
          break
      }
    }
    const [prefix, _] = item.sectionItem.split('_')

    switch (prefix) {
      case ExamPrefixes.ORIENTATION:
        if (valueToSchemaPe[item.sectionItem]) {
          result.orientation.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.APPEARANCE:
        if (valueToSchemaPe[item.sectionItem]) {
          result.appearance.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.BEHAVIOR:
        if (valueToSchemaPe[item.sectionItem]) {
          result.behavior.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.PSYCHOMOTOR:
        if (valueToSchemaPe[item.sectionItem]) {
          result.psychomotor.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.SPEECH:
        if (valueToSchemaPe[item.sectionItem]) {
          result.speech.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.MOOD:
        if (valueToSchemaPe[item.sectionItem]) {
          result.mood.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.AFFECT:
        if (valueToSchemaPe[item.sectionItem]) {
          result.affect.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.THOUGHT_PROCESS:
        if (valueToSchemaPe[item.sectionItem]) {
          result.thoughtProcess.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.MEMORY_HOW_TESTED:
        if (valueToSchemaPe[item.sectionItem]) {
          result.memoryHowTested.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.INTELLIGENCE:
        if (valueToSchemaPe[item.sectionItem]) {
          result.intelligence.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.INTELLIGENCE_HOW_TESTED:
        if (valueToSchemaPe[item.sectionItem]) {
          result.intelligenceHowTested.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.INSIGHT:
        if (valueToSchemaPe[item.sectionItem]) {
          result.insight.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.INSIGHT_HOW_TESTED:
        if (valueToSchemaPe[item.sectionItem]) {
          result.insightHowTested.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.JUDGMENT:
        if (valueToSchemaPe[item.sectionItem]) {
          result.judgment.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.JUDGMENT_HOW_TESTED:
        if (valueToSchemaPe[item.sectionItem]) {
          result.judgmentHowTested.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.MEMORY:
        if (valueToSchemaPe[item.sectionItem]) {
          result.memoryRemoteIntactOther.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.THOUGHT_CONTENT:
        if (valueToSchemaPe[item.sectionItem]) {
          result.thoughtContentOther.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.THOUGHT_CONTENT_SI:
        if (valueToSchemaPe[item.sectionItem]) {
          result.siUnDisclosed.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.THOUGHT_CONTENT_HI:
        if (valueToSchemaPe[item.sectionItem]) {
          result.hiUnDisclosed.push(valueToSchemaPe[item.sectionItem])
        }
        break
      case ExamPrefixes.SCHIZOPHRENIA_DELUSION:
        if (valueToSchemaPe[item.sectionItem]) {
          result.schizophreniaDelusionValues.push(
            valueToSchemaPe[item.sectionItem],
          )
        }
        break
      case ExamPrefixes.SCHIZOPHRENIA_HALLUCINATIONS:
        if (valueToSchemaPe[item.sectionItem]) {
          result.schizophreniaHallucinationsValues.push(
            valueToSchemaPe[item.sectionItem],
          )
        }
        break
      default:
        break
    }
  })

  return result
}

const updateArray = (array: string[], value: string | undefined) => {
  if (value) {
    const otherValue = array.find((item) => item.includes('Other'))
    const otherIndex = array.indexOf(otherValue as string)
    if (otherIndex !== -1) {
      array.splice(0, array.length, otherValue as string, value)
    } else {
      array.splice(0, array.length, value)
    }
  }
}

const transformOut =
  (patientId: string) =>
  (schema: MseWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    updateArray(schema.intelligence, schema.intelligenceRadio)
    updateArray(schema.judgment, schema.JudgmentRadio)
    updateArray(schema.insight, schema.insightRadio)

    Object.entries(schema).forEach(([key, value]) => {
      if (
        ([
          'schizophreniaHallucinationsValues',
          'schizophreniaDelusionValues',
        ].includes(key) ||
          key.includes('Other') ||
          key.includes('Radio') ||
          key.includes('YesNo')) &&
        value.length > 0
      ) {
        result.push({
          pid: Number(patientId),
          sectionName: QUICKNOTE_SECTION_NAME,
          sectionItem: key,
          sectionItemValue: `${value}`,
        })
      }

      if (key.includes('widgetContainerCheckboxField') && value.length > 0) {
        result.push({
          pid: Number(patientId),
          sectionName: QUICKNOTE_SECTION_NAME,
          sectionItem: key,
          sectionItemValue: String(value),
        })
      }

      if (
        ![
          'schizophreniaHallucinationsValues',
          'schizophreniaDelusionValues',
        ].includes(key) &&
        Array.isArray(value)
      ) {
        const validationRules: { [key: string]: string } = {
          siUnDisclosed: 'tcsiYesNo',
          hiUnDisclosed: 'tchiYesNo',
          schizophreniaDelusionValues: 'tcDelusionsYesNo',
          schizophreniaHallucinationsValues: 'tcHallucinationsYesNo',
        }

        const keyValue = validationRules[key] as keyof MseWidgetSchemaType

        if (value.length && keyValue && schema[keyValue] !== 'yes') {
          return
        }
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: QUICKNOTE_SECTION_NAME,
            sectionItem: schemaToValue[item],
            sectionItemValue: '1',
          })
        })
      }
    })

    if (!result.length) {
      result.push({
        sectionItem: '2',
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuicknoteSectionMse,
        sectionItemValue: '2',
      })
    }
    return result
  }

export { transformIn, transformOut, valueToSchemaPe }
