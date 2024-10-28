import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { HpiWidgetSchemaType } from './hpi-widget-schema'
import { assignSpecificFields, getInitialValues, valueToLabel } from './utils'

const CHIEF_COMPLAINT_PREFIX = 'CC'
const DEPRESSION_PREFIX = 'DEP'
const ANXIETY_PREFIX = 'ANX'
const BIPOLAR_MANIA_PREFIX = 'MAN'
const PTSD_PREFIX = 'PTS'
const OBSESSION_PREFIX = 'OBS'
const OCD_PREFIX = 'OCD'
const BPD_PREFIX = 'BPD'
const SUBSTANCE_PREFIX = 'SUB'
const ADHDH_PREFIX = 'ADH'
const ADHDI_PREFIX = 'ADI'
const AUTISM_PREFIX = 'AUT'
const CONDUCT_DISORDER_PREFIX = 'CD'
const DEMENTIA_PREFIX = 'DEM'
const SCHIZOPHRENIA_PREFIX = 'SCH'
const MEDICATION_SE_PREFIX = 'MED'

const valueToSchema: { [key: string]: string } = {
  // Chief complaint block
  CC_Depression: 'ccDepression',
  CC_Anxiety: 'ccAnxiety',
  CC_Bipolar: 'ccBipolar/Mania',
  CC_Ptsd: 'ccPtsd',
  CC_Ocd: 'ccOcd',
  CC_Obsession: 'ccObsession',
  CC_Bpd: 'ccBpd',
  CC_Substance: 'ccSubstance',
  CC_Adhdi: 'ccAdhdi',
  CC_Adhdh: 'ccAdhdh',
  CC_Autism: 'ccAutism',
  CC_ConductDisorder: 'ccConductDisorder',
  CC_Dementia: 'ccDementia',
  CC_Schizophrenia: 'ccSchizophrenia',
  CC_MedicationSe: 'ccMedicationSe',
  CC_Other: 'ccOther',

  // Depression block
  DEP_LowMood: 'depLowMood',
  DEP_SleepConcerns: 'depSleepConcerns',
  DEP_LowInterest: 'depLowInterest',
  DEP_Guilt: 'depGuilt',
  DEP_PoorEnergy: 'depPoorEnergy',
  DEP_PoorConcentration: 'depPoorConcentration',
  DEP_PoorMotivation: 'depPoorMotivation',
  DEP_AppetiteConcerns: 'depAppetiteConcerns',
  DEP_Hopeless: 'depHopeless',
  DEP_Slowing: 'depSlowing',
  DEP_Agitation: 'depAgitation',
  DEP_SuicidalThoughts: 'depSuicidalThoughts',
  DEP_Anger: 'depAnger',

  // Anxiety block
  ANX_AbnormalFear: 'anxAbnormalFear',
  ANX_Fatigue: 'anxFatigue',
  ANX_FeelingAnxious: 'anxFeelingAnxious',
  ANX_Irritable: 'anxIrritable',
  ANX_MuscleTension: 'anxMuscleTension',
  ANX_PanicAttacks: 'anxPanicAttacks',
  ANX_Phobia: 'anxPhobia',
  ANX_Restless: 'anxRestless',
  ANX_SocialAnxiety: 'anxSocialAnxiety',
  ANX_Worrying: 'anxWorrying',

  // Bipolar/Mania  block
  MAN_ElevatedMood: 'manElevatedMood',
  MAN_Distractibility: 'manDistractibility',
  MAN_GoalDirected: 'manGoalDirected',
  MAN_GrandioseDelusions: 'manGrandioseDelusions',
  MAN_FlightOfIdeas: 'manFlightOfIdeas',
  MAN_LackOfSleep: 'manLackOfSleep',
  MAN_PressuredSpeech: 'manPressuredSpeech',
  MAN_ImpulsiveRecklessBehavior: 'manImpulsiveRecklessBehavior',

  // PTSD  block
  PTS_TraumaticEvent: 'ptsTraumaticEvent',
  PTS_IntrusiveMemories: 'ptsIntrusiveMemories',
  PTS_Nightmares: 'ptsNightmares',
  PTS_NightTerrors: 'ptsNightTerrors',
  PTS_Flashbacks: 'ptsFlashbacks',
  PTS_DissociativeEpisodes: 'ptsDissociativeEpisodes',
  PTS_Hypervigilance: 'ptsHypervigilance',
  PTS_Avoidance: 'ptsAvoidance',
  PTS_Startled: 'ptsStartled',
  PTS_Detachment: 'ptsDetachment',

  // Obesession  block
  OBS_Contamination: 'obsContamination',
  OBS_Doubt: 'obsDoubt',
  OBS_Somatic: 'obsSomatic',
  OBS_Aggression: 'obsAggression',
  OBS_Sexual: 'obsSexual',

  // OCD  block
  OCD_Checking: 'ocdChecking',
  OCD_Washing: 'ocdWashing',
  OCD_Counting: 'ocdCounting',
  OCD_Hoarding: 'ocdHoarding',
  OCD_Picking: 'ocdPicking',

  // Borderline Personality disorder block
  BPD_BlackWhiteThinking: 'bpdBlackWhiteThinking',
  BPD_FearOfAbandonment: 'bpdFearOfAbandonment',
  BPD_Impulsiveness: 'bpdImpulsiveness',
  BPD_MoodSwings: 'bpdMoodSwings',
  BPD_SelfHarm: 'bpdSelfHarm',
  BPD_UnstableRelationships: 'bpdUnstableRelationships',
  BPD_UnstableSelfImage: 'bpdUnstableSelfImage',

  // Substance block
  SUB_Tobacco: 'subTobacco',
  SUB_Alcohol: 'subAlcohol',
  SUB_Opioids: 'subOpioids',
  SUB_Marijuana: 'subMarijuana',
  SUB_Benzos: 'subBenzos',
  SUB_Cocaine: 'subCocaine',
  SUB_Amphetamine: 'subAmphetamine',
  SUB_Pcp: 'subPcp',
  SUB_Inhalant: 'subInhalant',
  SUB_Other: 'subOther',

  // ADHDI Block
  ADI_CarelessMistakes: 'adiCarelessMistakes',
  ADI_DecreasedAttention: 'adiDecreasedAttention',
  ADI_DoesntListen: 'adiDoesntListen',
  ADI_HardToFollowInstruction: 'adiHardToFollowInstruction',
  ADI_DifficultyOrganizing: 'adiDifficultyOrganizing',
  ADI_DifficultyToDoDetailOrientedTasks: 'adiDifficultyToDoDetailOrientedTasks',
  ADI_LosesThings: 'adiLosesThings',
  ADI_EasilyDistracted: 'adiEasilyDistracted',
  ADI_Forgetful: 'adiForgetful',

  // ADHDH Block
  ADH_Fidgeting: 'adhFidgeting',
  ADH_LeavesAssignedSpace: 'adhLeavesAssignedSpace',
  ADH_Restless: 'adhRestless',
  ADH_HardToEnjoyRelaxing: 'adhHardToEnjoyRelaxing',
  ADH_OnTheGo: 'adhOnTheGo',
  ADH_ExcessiveTalking: 'adhExcessiveTalking',
  ADH_BlurtsOutAnswers: 'adhBlurtsOutAnswers',
  ADH_Impatient: 'adhImpatient',
  ADH_Interrupts: 'adhInterrupts',
  ADH_BehaviorOutbursts: 'adhBehaviorOutbursts',

  // Autism Block
  AUT_Fidgeting: 'autDelayedMilestones',
  AUT_Repetitive: 'autRepetitive',
  AUT_Regression: 'autRegression',
  AUT_Social: 'autSocial',
  AUT_Aversions: 'autAversions',
  AUT_Masking: 'autMasking',
  AUT_EmotionalDysregulation: 'autEmotionalDysregulation',

  // Conduct Disorder Block
  CD_DisciplineIssues: 'cdDisciplineIssues',
  CD_Defiance: 'cdDefiance',
  CD_Argumentative: 'cdArgumentative',
  CD_Vengeful: 'cdVengeful',
  CD_Deceitful: 'cdDeceitful',
  CD_Destructive: 'cdDestructive',
  CD_DisproportionateAnger: 'cdDisproportionateAnger',
  CD_AnimalCruelty: 'cdAnimalCruelty',
  CD_Manipulative: 'cdManipulative',
  CD_SuddenOutbursts: 'cdSuddenOutbursts',

  // Dementia Block
  DEM_MemoryLoss: 'demMemoryLoss',
  DEM_Confusion: 'demConfusion',
  DEM_DifficultyWithAdls: 'demDifficultyWithAdls',
  DEM_Wandering: 'demWandering',
  DEM_Agitation: 'demAgitation',
  DEM_Ah: 'demAh',
  DEM_Vh: 'demVh',
  DEM_ParkinsonSymptoms: 'demParkinsonSymptoms',

  // Schizophrenia Block
  SCH_Hallucination: 'schHallucination',
  SCH_Delusion: 'schDelusion',
  SCH_Disorganized: 'schDisorganized',
  SCH_Anhedonia: 'schAnhedonia',
  SCH_Avolition: 'schAvolition',
  SCH_Catatonia: 'schCatatonia',
  SCH_SuicidalThoughts: 'schSuicidalThoughts',
  SCH_HomicidalThoughts: 'schHomicidalThoughts',

  // Medication SE Block
  MED_GiUpset: 'medGiUpset',
  MED_SexualSe: 'medSexualSe',
  MED_WeightGain: 'medWeightGain',
  MED_Headache: 'medHeadache',
  MED_Rash: 'medRash',
  MED_HairLoss: 'medHairLoss',
  MED_Dystonia: 'medDystonia',
  MED_Akathesia: 'medAkathesia',
  MED_TardiveDyskinesia: 'medTardiveDyskinesia',
  MED_BlurredVision: 'medBlurredVision',
  MED_Drowsiness: 'medDrowsiness',
  MED_Dizzy: 'medDizzy',
  MED_Other: 'medOther',

  // Other block
  HPI_Other: 'hpiOther',
}

const schemaToValue: { [key: string]: string } = Object.entries(
  valueToSchema,
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

const transformIn = (
  value: QuickNoteSectionItem[],
  isLabel?: boolean,
): HpiWidgetSchemaType => {
  const result = getInitialValues()
  const specificFields = assignSpecificFields(result)
  value.forEach((item) => {
    if (item.sectionItem in specificFields) {
      specificFields[item.sectionItem](item.sectionItemValue)
      return
    }

    const [prefix, _] = item.sectionItem.split('_')
    const itemValue = isLabel
      ? valueToLabel[item.sectionItem] || valueToSchema[item.sectionItem]
      : valueToSchema[item.sectionItem]
    switch (prefix) {
      case ANXIETY_PREFIX:
        result.anxiety.push(itemValue)
        break
      case BIPOLAR_MANIA_PREFIX:
        result.bipolarMania.push(itemValue)
        break
      case CHIEF_COMPLAINT_PREFIX:
        result.chiefComplaint.push(itemValue)
        break
      case DEPRESSION_PREFIX:
        result.depression.push(itemValue)
        break
      case PTSD_PREFIX:
        result.ptsd.push(itemValue)
        break
      case OBSESSION_PREFIX:
        result.obsession.push(itemValue)
        break
      case OCD_PREFIX:
        result.ocd.push(itemValue)
        break
      case BPD_PREFIX:
        result.bpd.push(itemValue)
        break
      case SUBSTANCE_PREFIX:
        result.substance.push(itemValue)
        break
      case ADHDH_PREFIX:
        result.adhdHyperactive.push(itemValue)
        break
      case ADHDI_PREFIX:
        result.adhdInattentive.push(itemValue)
        break
      case AUTISM_PREFIX:
        result.autism.push(itemValue)
        break
      case CONDUCT_DISORDER_PREFIX:
        result.conductDisorder.push(itemValue)
        break
      case DEMENTIA_PREFIX:
        result.dementia.push(itemValue)
        break
      case SCHIZOPHRENIA_PREFIX:
        result.schizophrenia.push(itemValue)
        break
      case MEDICATION_SE_PREFIX:
        result.medicationSe.push(itemValue)
        break

      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: HpiWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const sanitizedFormData = sanitizeFormData(schema)

    Object.entries(sanitizedFormData).forEach(([key, value]) => {
      if (
        key.includes('Other') ||
        [
          'schizophreniaHallucinationsValues',
          'schizophreniaDelusionValues',
        ].includes(key)
      ) {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuicknoteSectionHPI,
          sectionItem: key,
          sectionItemValue: `${value}`,
        })
        return
      }

      Array.isArray(value) &&
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: QuickNoteSectionName.QuicknoteSectionHPI,
            sectionItem: schemaToValue[item],
            sectionItemValue: '1',
          })
        })
    })
    if (!result.length) {
      result.push({
        pid: Number(patientId),
        sectionName: QuickNoteSectionName.QuicknoteSectionHPI,
        sectionItem: '1',
        sectionItemValue: '1',
      })
    }
    return result
  }

export { transformIn, transformOut }
