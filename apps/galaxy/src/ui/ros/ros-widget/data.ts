import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { RosWidgetSchemaType } from './ros-widget-schema'

enum ROSPrefixes {
  CONSTITUTIONAL = 'CT',
  ENT = 'ENT',
  EYES = 'EYES',
  CARDIOVASCULAR = 'CVS',
  RESPIRATORY = 'RES',
  GASTROINTESTINAL = 'GI',
  GENITOURINARY = 'GU',
  MUSCULOSKELETAL = 'MSU',
  SKIN = 'SKN',
  NEURO = 'NEU',
}

const valueToSchemaROS: { [key: string]: string } = {
  // Constitutional
  CT_NoConcerns: 'ctNoConcerns',
  CT_WeightChange: 'ctWeightChange',
  CT_Fever: 'ctFever',
  CT_Chills: 'ctChills',
  CT_Fatigue: 'ctFatigue',
  CT_Other: 'ctOther',
  // Ent
  ENT_NoConcerns: 'entNoConcerns',
  ENT_SinusCongestion: 'entSinusCongestion',
  ENT_SoreThroat: 'entSoreThroat',
  ENT_HearingChangesEarPain: 'entHearingChangesEarPain',
  ENT_Other: 'entOther',
  // EYES
  EYES_NoConcerns: 'eyesNoConcerns',
  EYES_EyePain: 'eyesEyePain',
  EYES_Redness: 'eyesRedness',
  EYES_Discharge: 'eyesDischarge',
  EYES_VisionChanges: 'eyesVisionChanges',
  EYES_Other: 'eyesOther',
  // CARDIOVASCULAR
  CVS_NoConcerns: 'cvsNoConcerns',
  CVS_ChestPain: 'cvsChestPain',
  CVS_ShortnessOfBreath: 'cvsShortnessOfBreath',
  CVS_Palpitations: 'cvsPalpitations',
  CVS_Other: 'cvsOther',

  // RESPIRATORY
  RES_NoConcerns: 'resNoConcerns',
  RES_Cough: 'resCough',
  RES_Wheezing: 'resWheezing',
  RES_Dyspnea: 'resDyspnea',
  RES_Other: 'resOther',
  // GASTROINTESTINAL
  GI_NoConcerns: 'giNoConcerns',
  GI_NauseaVomiting: 'giNauseaVomiting',
  GI_Diarrhea: 'giDiarrhea',
  GI_Constipation: 'giConstipation',
  GI_Other: 'giOther',
  // Genitourinary
  GU_NoConcerns: 'guNoConcerns',
  GU_Dysmenorrhea: 'guDysmenorrhea',
  GU_UrinaryFrequency: 'guUrinaryFrequency',
  GU_UrinaryIncontinence: 'guUrinaryIncontinence',
  GU_Other: 'guOther',
  // MUSCULOSKELETAL
  MSU_NoConcerns: 'msuNoConcerns',
  MSU_Myalgias: 'msuMyalgias',
  MSU_JointMuscleStiffness: 'msuJointMuscleStiffness',
  MSU_BreastChanges: 'msuBreastChanges',
  MSU_Other: 'msuOther',
  // SKIN
  SKN_NoConcerns: 'sknNoConcerns',
  SKN_SkinLesionsRash: 'sknSkinLesionsRash',
  SKN_HairChanges: 'sknHairChanges',
  SKN_BreastChanges: 'sknBreastChanges',
  SKN_NippleDischarge: 'sknNippleDischarge',
  SKN_Other: 'sknOther',
  // NEURO
  NEU_NoConcerns: 'neuNoConcerns',
  NEU_Weakness: 'neuWeakness',
  NEU_Paresthesia: 'neuParesthesia',
  NEU_Dizziness: 'neuDizziness',
  NEU_Headache: 'neuHeadache',
  NEU_RecentFalls: 'neuRecentFalls',
  NEU_Other: 'neuOther',
}

const schemaToValue: { [key: string]: string } = Object.entries(
  valueToSchemaROS,
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

const transformIn = (value: QuickNoteSectionItem[]): RosWidgetSchemaType => {
  const result: RosWidgetSchemaType = {
    cardiovascular: [],
    constitutional: [],
    entMouth: [],
    eyes: [],
    respiratory: [],
    gastrointestinal: [],
    genitourinary: [],
    musculoskeletal: [],
    neuro: [],
    skin: [],
    ctOtherDetails: '',
    entOtherDetails: '',
    eyesOtherDetails: '',
    cvsOtherDetails: '',
    resOtherDetails: '',
    giOtherDetails: '',
    guOtherDetails: '',
    msuOtherDetails: '',
    sknOtherDetails: '',
    neuOtherDetails: '',
  }
  value.forEach((item) => {
    if (item.sectionItem.includes('Other')) {
      switch (item.sectionItem) {
        case 'ctOtherDetails':
          result.ctOtherDetails = item.sectionItemValue
          break

        case 'entOtherDetails':
          result.entOtherDetails = item.sectionItemValue
          break

        case 'eyesOtherDetails':
          result.eyesOtherDetails = item.sectionItemValue
          break

        case 'cvsOtherDetails':
          result.cvsOtherDetails = item.sectionItemValue
          break

        case 'resOtherDetails':
          result.resOtherDetails = item.sectionItemValue
          break

        case 'giOtherDetails':
          result.giOtherDetails = item.sectionItemValue
          break

        case 'guOtherDetails':
          result.guOtherDetails = item.sectionItemValue
          break

        case 'msuOtherDetails':
          result.msuOtherDetails = item.sectionItemValue
          break

        case 'neuOtherDetails':
          result.neuOtherDetails = item.sectionItemValue
          break

        case 'sknOtherDetails':
          result.sknOtherDetails = item.sectionItemValue
          break

        default:
          break
      }
    }

    const [prefix, _] = item.sectionItem.split('_')

    switch (prefix) {
      case ROSPrefixes.CONSTITUTIONAL:
        result.constitutional.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.ENT:
        result.entMouth.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.EYES:
        result.eyes.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.CARDIOVASCULAR:
        result.cardiovascular.push(valueToSchemaROS[item.sectionItem])
        break
      case ROSPrefixes.RESPIRATORY:
        result.respiratory.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.GASTROINTESTINAL:
        result.gastrointestinal.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.GENITOURINARY:
        result.genitourinary.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.MUSCULOSKELETAL:
        result.musculoskeletal.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.SKIN:
        result.skin.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.NEURO:
        result.neuro.push(valueToSchemaROS[item.sectionItem])
        break

      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: RosWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []
    Object.entries(schema).forEach(([key, value]) => {
      if (key.includes('Other') && value.length > 0) {
        result.push({
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
          sectionItem: key,
          sectionItemValue: `${value}`,
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      Array.isArray(value) &&
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
            sectionItem: schemaToValue[item],
            sectionItemValue: '1',
          })
        })
    })
    return result
  }

export { transformIn, transformOut, valueToSchemaROS }
