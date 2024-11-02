import { QuickNoteSectionItem } from '@/types'
import { valueToSchemaPe } from '../../data'
import { createEmptyFormValues } from '../../physicalExamDefaults'

export interface physicalExamWidgetSchema {
  general: string[]
  skin: string[]
  heent: string[]
  neck: string[]
  lymphNodes: string[]
  chest: string[]
  cardiovascularCvs: string[]
  lungs: string[]
  gastrointestinalGi: string[]
  adhdHyperactive: string[]
  gynecologicalGyn: string[]
  genitourinaryGu: string[]
  centralNervousSystemCns: string[]
  musculoskeletal: string[]
  nutrition: string[]
  psychiatric: string[]
  cranialNervesExam: string[]
  cneOtherDetails: string
  gnOtherDetails: string
  sknOtherDetails: string
  hntOtherDetails: string
  nkOtherDetails: string
  lnOtherDetails: string
  chsOtherDetails: string
  cvsOtherDetails: string
  lngOtherDetails: string
  giOtherDetails: string
  gynOtherDetails: string
  guOtherDetails: string
  cnsOtherDetails: string
  msuOtherDetails: string
  mutOtherDetails: string
  psyOtherDetails: string
  nutOtherDetails: string
}

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

export const transformIn = (
  value?: QuickNoteSectionItem[],
): physicalExamWidgetSchema => {
  const result = createEmptyFormValues()

  value?.forEach((item) => {
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

    const schemaKey = valueToSchemaPe[item.sectionItem]

    if (!schemaKey) return

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
