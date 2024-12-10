import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QUICKNOTE_SECTION_NAME } from './constants'
import { PhysicalExamWidgetSchemaType } from './physical-exam-widget-schema'
import { createEmptyFormValues } from './physicalExamDefaults'

enum ExamPrefixes {
  CARDIOVASCULAR = 'CVS',
  CENTRAL_NERVOUS_SYSTEM = 'CNS',
  CHEST = 'CHS',
  CRANIAL_NERVES_EXAM = 'CNE',
  GASTROINTESTINAL = 'GI',
  GENERAL = 'GN',
  GENITOURINARY = 'GU',
  GYNECOLOGICAL = 'GYN',
  HEENT = 'HNT',
  LUNGS = 'LNG',
  LYMPH = 'LN',
  MUSCULOSKELETAL = 'MSU',
  NECK = 'NK',
  NUTRITION = 'NUT',
  PSYCHIATRIC = 'PSY',
  SKIN = 'SKN',
}

const valueToSchemaPe: { [key: string]: string } = {
  // Cardiovascular block
  CVS_Normal: 'cvsNormal',
  CVS_Murmurs: 'cvsMurmurs',
  CVS_HypertensionHtn: 'cvsHypertensionHtn',
  CVS_Other: 'cvsOther',

  // Central Nervous System block
  CNS_Normal: 'cnsNormal',
  CNS_Fainting: 'cnsFainting',
  CNS_LossOfConsciousnessLoc: 'cnsLossOfConsciousnessLoc',
  CNS_Weakness: 'cnsWeakness',
  CNS_Tremor: 'cnsTremor',
  CNS_Seizures: 'cnsSeizures',
  CNS_Other: 'cnsOther',

  // chest block
  CHS_Normal: 'chsNormal',
  CHS_ChronicCough: 'chsChronicCough',
  CHS_Wheezing: 'chsWheezing',
  CHS_DoeDyspneaOnExertion: 'chsDoeDyspneaOnExertion',
  CHS_ChestPain: 'chsChestPain',
  CHS_BreastLumpsDischarge: 'chsBreastLumpsDischarge',
  CHS_Other: 'chsOther',

  // Cranial Nerves Exam block
  CNE_Olfactory: 'cneOlfactory',
  CNE_OlfactoryNormal: 'cneOlfactoryNormal',
  CNE_OlfactoryAbnormal: 'cneOlfactoryAbnormal',
  CNE_Optical: 'cneOptical',
  CNE_OpticalNormal: 'cneOpticalNormal',
  CNE_OpticalAbnormal: 'cneOpticalAbnormal',
  CNE_Trochlear: 'cneTrochlear',
  CNE_TrochlearNormal: 'cneTrochlearNormal',
  CNE_TrochlearAbnormal: 'cneTrochlearAbnormal',
  CNE_Trigeminal: 'cneTrigeminal',
  CNE_TrigeminalNormal: 'cneTrigeminalNormal',
  CNE_TrigeminalAbnormal: 'cneTrigeminalAbnormal',
  CNE_Abducens: 'cneAbducens',
  CNE_AbducensNormal: 'cneAbducensNormal',
  CNE_AbducensAbnormal: 'cneAbducensAbnormal',
  CNE_Facial: 'cneFacial',
  CNE_FacialNormal: 'cneFacialNormal',
  CNE_FacialAbnormal: 'cneFacialAbnormal',
  CNE_Auditory: 'cneAuditory',
  CNE_AuditoryNormal: 'cneAuditoryNormal',
  CNE_AuditoryAbnormal: 'cneAuditoryAbnormal',
  CNE_Glossopharyngeal: 'cneGlossopharyngeal',
  CNE_GlossopharyngealNormal: 'cneGlossopharyngealNormal',
  CNE_GlossopharyngealAbnormal: 'cneGlossopharyngealAbnormal',
  CNE_Vagus: 'cneVagus',
  CNE_VagusNormal: 'cneVagusNormal',
  CNE_VagusAbnormal: 'cneVagusAbnormal',
  CNE_SpinalAccessory: 'cneSpinalAccessory',
  CNE_SpinalAccessoryNormal: 'cneSpinalAccessoryNormal',
  CNE_SpinalAccessoryAbnormal: 'cneSpinalAccessoryAbnormal',
  CNE_Hypoglossal: 'cneHypoglossal',
  CNE_HypoglossalNormal: 'cneHypoglossalNormal',
  CNE_HypoglossalAbnormal: 'cneHypoglossalAbnormal',
  CNE_Other: 'cneOther',

  // Gastrointestinal block
  GI_Normal: 'giNormal',
  GI_AbdominalPain: 'giAbdominalPain',
  GI_Vomiting: 'giVomiting',
  GI_DiarrheaConstipation: 'giDiarrheaConstipation',
  GI_Jaundice: 'giJaundice',
  GI_FoodIntolerance: 'giFoodIntolerance',
  GI_SoftNonTenderNoReboundOrRigidity: 'giSoftNonTenderNoReboundOrRigidity',
  GI_Other: 'giOther',

  // General block
  GN_Normal: 'gnNormal',
  GN_Fatigue: 'gnFatigue',
  GN_Fever: 'gnFever',
  GN_WeightLoss: 'gnWeightLoss',
  GN_Diaphoresis: 'gnDiaphoresis',
  GN_Other: 'gnOther',

  // Genitourinary block
  GU_Normal: 'guNormal',
  GU_Dysuria: 'guDysuria',
  GU_Discharge: 'guDischarge',
  GU_ScrotalMasses: 'guScrotalMasses',
  GU_UrinaryFrequency: 'guUrinaryFrequency',
  GU_Incontinence: 'guIncontinence',
  GU_Enuresis: 'guEnuresis',
  GU_Other: 'guOther',

  // Gynecological block
  GYN_Normal: 'gynNormal',
  GYN_CycleLength: 'gynCycleLength',
  GYN_Flow: 'gynFlow',
  GYN_Dysmenorrhea: 'gynDysmenorrhea',
  GYN_VaginalDischarge: 'gynVaginalDischarge',
  GYN_Dyspareunia: 'gynDyspareunia',
  GYN_Other: 'gynOther',

  // Heent block
  HNT_Headache: 'hntHeadache',
  HNT_TmjPain: 'hntTmjPain',
  HNT_VisualHearingProblems: 'hntVisualHearingProblems',
  HNT_Rhinitis: 'hntRhinitis',
  HNT_SoreThroat: 'hntSoreThroat',
  HNT_FrequentNoseBleeds: 'hntFrequentNoseBleeds',
  HNT_NoExternalAbnormality: 'hntNoExternalAbnormality',
  HNT_Perrla: 'hntPerrla',
  HNT_Normal: 'hntNormal',
  HNT_NaresArePatentWithoutDrainage: 'hntNaresArePatentWithoutDrainage',
  HNT_Other: 'hntOther',

  // Lungs block
  LNG_Normal: 'lngNormal',
  LNG_ClearToAuscultationBilaterally: 'lngClearToAuscultationBilaterally',
  LNG_Other: 'lngOther',

  // Lymph Nodes
  LN_Normal: 'lnNormal',
  LN_NonePalpated: 'lnNonePalpated',
  LN_Other: 'lnOther',

  // Musculoskeletal block
  MSU_Normal: 'msuNormal',
  MSU_Scoliosis: 'msuScoliosis',
  MSU_JointAchesSwelling: 'msuJointAchesSwelling',
  MSU_RecentTrauma: 'msuRecentTrauma',
  MSU_Limp: 'msuLimp',
  MSU_SportsInjury: 'msuSportsInjury',
  MSU_AcuteDeformity: 'msuAcuteDeformity',
  MSU_ClubbingCyanosisEdema: 'msuClubbingCyanosisEdema',
  MSU_Tender: 'msuTender',
  MSU_RomRestrictions: 'msuRomRestrictions',
  MSU_Other: 'msuOther',

  // Neck Nodes
  NK_Normal: 'nkNormal',
  NK_Masses: 'nkMasses',
  NK_Other: 'nkOther',

  // Nutrition block
  NUT_Normal: 'nutNormal',
  NUT_UsualEatingHabits: 'nutUsualEatingHabits',
  NUT_CurrentlyDieting: 'nutCurrentlyDieting',
  NUT_Binges: 'nutBinges',
  NUT_DietPills: 'nutDietPills',
  NUT_BodyImage: 'nutBodyImage',
  NUT_Other: 'nutOther',

  // Psychiatric block
  PSY_Normal: 'psyNormal',
  PSY_Depression: 'psyDepression',
  PSY_SuicideContemplatedAttempted: 'psySuicideContemplatedAttempted',
  PSY_Hallucinations: 'psyHallucinations',
  PSY_PreviousPsychologicalIssues: 'psyPreviousPsychologicalIssues',
  PSY_Other: 'psyOther',

  // Skin block
  SKN_Normal: 'sknNormal',
  SKN_PersistentRashSpots: 'sknPersistentRashSpots',
  SKN_Acne: 'sknAcne',
  SKN_Tattoos: 'sknTattoos',
  SKN_Other: 'sknOther',
}

const schemaToValue: { [key: string]: string } = Object.entries(
  valueToSchemaPe,
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {} as { [key: string]: string })

const transformIn = (
  value: QuickNoteSectionItem[],
): PhysicalExamWidgetSchemaType => {
  const result = createEmptyFormValues()

  value.forEach((item) => {
    if (item.sectionItem === 'widgetContainerCheckboxField') {
      result.widgetContainerCheckboxField = item.sectionItemValue
    }
    if (item.sectionItem.includes('Other')) {
      switch (item.sectionItem) {
        case 'cneOtherDetails':
          result.cneOtherDetails = item.sectionItemValue
          break
        case 'gnOtherDetails':
          result.gnOtherDetails = item.sectionItemValue
          break
        case 'sknOtherDetails':
          result.sknOtherDetails = item.sectionItemValue
          break
        case 'hntOtherDetails':
          result.hntOtherDetails = item.sectionItemValue
          break
        case 'nkOtherDetails':
          result.nkOtherDetails = item.sectionItemValue
          break
        case 'lnOtherDetails':
          result.lnOtherDetails = item.sectionItemValue
          break
        case 'chsOtherDetails':
          result.chsOtherDetails = item.sectionItemValue
          break
        case 'cvsOtherDetails':
          result.cvsOtherDetails = item.sectionItemValue
          break
        case 'lngOtherDetails':
          result.lngOtherDetails = item.sectionItemValue
          break
        case 'giOtherDetails':
          result.giOtherDetails = item.sectionItemValue
          break
        case 'gynOtherDetails':
          result.gynOtherDetails = item.sectionItemValue
          break
        case 'guOtherDetails':
          result.guOtherDetails = item.sectionItemValue
          break
        case 'cnsOtherDetails':
          result.cnsOtherDetails = item.sectionItemValue
          break
        case 'msuOtherDetails':
          result.msuOtherDetails = item.sectionItemValue
          break
        case 'mutOtherDetails':
          result.mutOtherDetails = item.sectionItemValue
          break
        case 'psyOtherDetails':
          result.psyOtherDetails = item.sectionItemValue
          break
        case 'nutOtherDetails':
          result.nutOtherDetails = item.sectionItemValue
          break
        default:
          break
      }
    }

    const [prefix, _] = item.sectionItem.split('_')

    switch (prefix) {
      case ExamPrefixes.CARDIOVASCULAR:
        result.cardiovascularCvs.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.CENTRAL_NERVOUS_SYSTEM:
        result.centralNervousSystemCns.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.CHEST:
        result.chest.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.GASTROINTESTINAL:
        result.gastrointestinalGi.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.GENERAL:
        result.general.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.GENITOURINARY:
        result.genitourinaryGu.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.GYNECOLOGICAL:
        result.gynecologicalGyn.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.HEENT:
        result.heent.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.LUNGS:
        result.lungs.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.LYMPH:
        result.lymphNodes.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.MUSCULOSKELETAL:
        result.musculoskeletal.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.NECK:
        result.neck.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.NUTRITION:
        result.nutrition.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.PSYCHIATRIC:
        result.psychiatric.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.SKIN:
        result.skin.push(valueToSchemaPe[item.sectionItem])
        break
      case ExamPrefixes.CRANIAL_NERVES_EXAM:
        result.cranialNervesExam.push(valueToSchemaPe[item.sectionItem])
        break
      default:
        break
    }
  })

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: PhysicalExamWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    Object.entries(schema).forEach(([key, value]) => {
      if (key.includes('widgetContainerCheckboxField') && value.length > 0) {
        result.push({
          pid: Number(patientId),
          sectionName: QUICKNOTE_SECTION_NAME,
          sectionItem: key,
          sectionItemValue: String(value),
        })
      }

      if (key.includes('Other') && value.length > 0) {
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
        sectionItemValue: '2',
        sectionName: QuickNoteSectionName.QuicknoteSectionPhysicalExam,
        sectionItem: '2',
        pid: Number(patientId),
      })
    }
    return result
  }

export { transformIn, transformOut, valueToSchemaPe }
