import { sanitizeFormData } from '@psychplus-v2/utils'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { RosWidgetSchemaType } from './review-of-systems-schema'

enum ROSPrefixes {
  ENT = 'ENT',
  CONSTITUTIONAL = 'CT',
  CARDIOVASCULAR = 'CVS',
  EYES = 'EYES',
  GASTROINTESTINAL = 'GI',
  RESPIRATORY = 'RES',
  SKIN = 'SKN',
  MUSCULOSKELETAL = 'MSU',
  GENITOURINARY = 'GU',
  NEURO = 'NEU',
}

const valueToSchemaROS: { [key: string]: string } = {
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
  // Constitutional
  CT_NoConcerns: 'ctNoConcerns',
  CT_WeightChange: 'ctWeightChange',
  CT_Fever: 'ctFever',
  CT_Chills: 'ctChills',
  CT_Fatigue: 'ctFatigue',
  CT_Other: 'ctOther',
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
  // NEURO
  NEU_NoConcerns: 'neuNoConcerns',
  NEU_Weakness: 'neuWeakness',
  NEU_Paresthesia: 'neuParesthesia',
  NEU_Dizziness: 'neuDizziness',
  NEU_Headache: 'neuHeadache',
  NEU_RecentFalls: 'neuRecentFalls',
  NEU_Other: 'neuOther',
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
}

const schemaToValue: { [key: string]: string } = Object.entries(
  valueToSchemaROS,
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

const transformIn = (value: NoteSectionItem[]): RosWidgetSchemaType => {
  const result: RosWidgetSchemaType = {
    constitutional: [],
    cardiovascular: [],
    eyes: [],
    entMouth: [],
    respiratory: [],
    genitourinary: [],
    gastrointestinal: [],
    musculoskeletal: [],
    skin: [],
    neuro: [],
    ctOtherDetails: '',
    eyesOtherDetails: '',
    entOtherDetails: '',
    cvsOtherDetails: '',
    giOtherDetails: '',
    resOtherDetails: '',
    guOtherDetails: '',
    sknOtherDetails: '',
    msuOtherDetails: '',
    neuOtherDetails: '',
  }
  value.forEach((item) => {
    if (item.sectionItem.includes('Other')) {
      switch (item.sectionItem) {
        case 'ctOtherDetails':
          result.ctOtherDetails = item.sectionItemValue
          break
        case 'cvsOtherDetails':
          result.cvsOtherDetails = item.sectionItemValue
          break
        case 'entOtherDetails':
          result.entOtherDetails = item.sectionItemValue
          break

        case 'eyesOtherDetails':
          result.eyesOtherDetails = item.sectionItemValue
          break

        case 'resOtherDetails':
          result.resOtherDetails = item.sectionItemValue
          break

        case 'giOtherDetails':
          result.giOtherDetails = item.sectionItemValue
          break

        case 'msuOtherDetails':
          result.msuOtherDetails = item.sectionItemValue
          break

        case 'guOtherDetails':
          result.guOtherDetails = item.sectionItemValue
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

      case ROSPrefixes.EYES:
        result.eyes.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.ENT:
        result.entMouth.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.CARDIOVASCULAR:
        result.cardiovascular.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.RESPIRATORY:
        result.respiratory.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.GENITOURINARY:
        result.genitourinary.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.GASTROINTESTINAL:
        result.gastrointestinal.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.MUSCULOSKELETAL:
        result.musculoskeletal.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.NEURO:
        result.neuro.push(valueToSchemaROS[item.sectionItem])
        break

      case ROSPrefixes.SKIN:
        result.skin.push(valueToSchemaROS[item.sectionItem])
        break

      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: RosWidgetSchemaType): NoteSectionItem[] => {
    const result: NoteSectionItem[] = []
    const sanitizedFormData = sanitizeFormData(schema)
    Object.entries(sanitizedFormData).forEach(([key, value]) => {
      if (key.includes('Other') && value.length > 0) {
        result.push({
          pid: Number(patientId),
          sectionName: NoteSectionName.NoteSectionReviewOfSystem,
          sectionItem: key,
          sectionItemValue: `${value}`,
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      Array.isArray(value) &&
        value.forEach((item) => {
          result.push({
            pid: Number(patientId),
            sectionName: NoteSectionName.NoteSectionReviewOfSystem,
            sectionItem: schemaToValue[item],
            sectionItemValue: '1',
          })
        })
    })

    if (!result.length) {
      result.push({
        pid: Number(patientId),
        sectionName: NoteSectionName.NoteSectionReviewOfSystem,
        sectionItem: 'empty',
        sectionItemValue: 'true',
      })
    }

    return result
  }

export { transformIn, transformOut, valueToSchemaROS }
