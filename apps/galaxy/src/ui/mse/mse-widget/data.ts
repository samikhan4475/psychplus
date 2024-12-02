import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { MseWidgetSchemaType } from './mse-widget-schema'
import { createEmptyFormValues } from './mseDefaults'

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

  // SH
  SD_Grandiose: 'sdGrandiose',
  SD_OfReference: 'sdOfReference',
  SD_Erotomania: 'sdErotomania',
  SD_Persecutory: 'sdPersecutory',
  SD_Jealous: 'sdJealous',
  SD_Bizarre: 'sdBizarre',
  SD_Mixed: 'sdMixed',
  SD_Nihilistic: 'sdNihilistic',
  SD_ThoughtBroadcasting: 'sdThoughtBroadcasting',
  SD_Guilt: 'sdGuilt',
  SD_ThoughtInsertion: 'sdThughtInsertion',
  SD_Persecution: 'sdPersecution',
  SD_Unspecified: 'sdUnspecified',
  SD_Infidelity: 'sdInfidelity',
  SD_MisidentificationSyndrome: 'sdMisidentificationSyndrome',

  //DH

  SH_Auditory: 'shAuditory',
  SH_Visual: 'shVisual',
  SH_Olfactory: 'shOlfactory',
  SH_Tactile: 'shTactile',
  SH_Gustatory: 'shGustatory',
  SH_Somatic: 'shSomatic',
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
    if (item.sectionItem.includes('schizophreniaHallucinationsValues')) {
      result.schizophreniaHallucinationsValues =
        item.sectionItemValue.split(',')
    }
    if (item.sectionItem.includes('schizophreniaDelusionValues')) {
      result.schizophreniaDelusionValues = item.sectionItemValue.split(',')
    }
    if (item.sectionItem.includes('YesNo')) {
      switch (item.sectionItem) {
        case 'tcsiYesNo':
          result.tcsiYesNo = item.sectionItemValue as 'yes' | 'no' | ''
          break
        case 'tchiYesNo':
          result.tchiYesNo = item.sectionItemValue as 'yes' | 'no' | ''
          break
        case 'tcDelusionsYesNo':
          result.tcDelusionsYesNo = item.sectionItemValue as 'yes' | 'no' | ''
          break
        case 'tcHallucinationsYesNo':
          result.tcHallucinationsYesNo = item.sectionItemValue as
            | 'yes'
            | 'no'
            | ''
          break
        case 'mmRecentIntactYesNo':
          result.mmRecentIntactYesNo = item.sectionItemValue as
            | 'yes'
            | 'no'
            | ''
          break
        case 'mmRemoteIntactYesNo':
          result.mmRemoteIntactYesNo = item.sectionItemValue as
            | 'yes'
            | 'no'
            | ''
          break
        default:
          break
      }
    }

    if (item.sectionItem.includes('Other')) {
      switch (item.sectionItem) {
        case 'mmOtherDetails':
          result.mmOtherDetails = item.sectionItemValue
          break
        case 'mhtOtherDetails':
          result.mhtOtherDetails = item.sectionItemValue
          break
        case 'intOtherDetails':
          result.intOtherDetails = item.sectionItemValue
          break
        case 'inthtOtherDetails':
          result.inthtOtherDetails = item.sectionItemValue
          break
        case 'insOtherDetails':
          result.insOtherDetails = item.sectionItemValue
          break
        case 'inshtOtherDetails':
          result.inshtOtherDetails = item.sectionItemValue
          break
        case 'jdgOtherDetails':
          result.jdgOtherDetails = item.sectionItemValue
          break
        case 'jdghtOtherDetails':
          result.jdghtOtherDetails = item.sectionItemValue
          break
        case 'oriOtherDetails':
          result.oriOtherDetails = item.sectionItemValue
          break
        case 'appOtherDetails':
          result.appOtherDetails = item.sectionItemValue
          break
        case 'behOtherDetails':
          result.behOtherDetails = item.sectionItemValue
          break
        case 'psyOtherDetails':
          result.psyOtherDetails = item.sectionItemValue
          break
        case 'speOtherDetails':
          result.speOtherDetails = item.sectionItemValue
          break
        case 'modOtherDetails':
          result.modOtherDetails = item.sectionItemValue
          break
        case 'affOtherDetails':
          result.affOtherDetails = item.sectionItemValue
          break
        case 'thpOtherDetails':
          result.thpOtherDetails = item.sectionItemValue
          break
        case 'tcOtherDetails':
          result.tcOtherDetails = item.sectionItemValue
          break
        case 'hiOtherDetails':
          result.hiOtherDetails = item.sectionItemValue
          break
        case 'siOtherDetails':
          result.siOtherDetails = item.sectionItemValue
          break
        default:
          break
      }
    }
    const [prefix, _] = item.sectionItem.split('_')

    switch (prefix) {
      case ExamPrefixes.ORIENTATION:
        result.orientation.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.APPEARANCE:
        result.appearance.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.BEHAVIOR:
        result.behavior.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.PSYCHOMOTOR:
        result.psychomotor.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.SPEECH:
        result.speech.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.MOOD:
        result.mood.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.AFFECT:
        result.affect.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.THOUGHT_PROCESS:
        result.thoughtProcess.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.MEMORY_HOW_TESTED:
        result.memoryHowTested.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.INTELLIGENCE:
        result.intelligence.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.INTELLIGENCE_HOW_TESTED:
        result.intelligenceHowTested.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.INSIGHT:
        result.insight.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.INSIGHT_HOW_TESTED:
        result.insightHowTested.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.JUDGMENT:
        result.judgment.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.JUDGMENT_HOW_TESTED:
        result.judgmentHowTested.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.MEMORY:
        result.memoryRemoteIntactOther.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.THOUGHT_CONTENT:
        result.thoughtContentOther.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.THOUGHT_CONTENT_SI:
        result.siUnDisclosed.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.THOUGHT_CONTENT_HI:
        result.hiUnDisclosed.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.SCHIZOPHRENIA_DELUSION:
        result.schizophreniaDelusionValues.push(
          valueToSchemaPe[item.sectionItem],
        )
        break
      case ExamPrefixes.SCHIZOPHRENIA_HALLUCINATIONS:
        result.schizophreniaHallucinationsValues.push(
          valueToSchemaPe[item.sectionItem],
        )
        break
      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: MseWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (
        (key.includes('Other') || key.includes('YesNo')) &&
        value.length > 0
      ) {
        result.push({
          pid: Number(patientId),
          sectionName: QUICKNOTE_SECTION_NAME,
          sectionItem: key,
          sectionItemValue: `${value}`,
        })
      }

      Array.isArray(value) &&
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: QUICKNOTE_SECTION_NAME,
            sectionItem: schemaToValue[item],
            sectionItemValue: '1',
          })
        })
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
