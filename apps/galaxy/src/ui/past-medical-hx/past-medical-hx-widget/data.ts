import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { PastMedicalHxWidgetSchemaType } from './past-medical-hx-widget-schema'

const transformIn = (
  value: QuickNoteSectionItem[],
): PastMedicalHxWidgetSchemaType => {
  const result: Record<string, number | string | undefined | boolean | Date> = {
    asthma: undefined,
    copd: undefined,
    htn: undefined,
    hld: undefined,
    dm: undefined,
    autoimmune: undefined,
    cad: undefined,
    stroke: undefined,
    migraines: undefined,
    headInjury: undefined,
    seizures: undefined,
    parkinsons: undefined,
    cirrhosis: undefined,
    hepatitis: undefined,
    hiv: undefined,
    sleepApnea: undefined,
    gerd: undefined,
    adhdAge: undefined,
    multipleSclerosis: undefined,
    kidneyDisease: undefined,
    kidneyStones: undefined,
    hypothyroidism: undefined,
    anemia: undefined,
    alzheimers: undefined,
    pregnant: undefined,
    pregnantDate: undefined,
    breastFeeding: undefined,
    breastFeedingDaysPostPartum: undefined,
    communicable: undefined,
    measles: undefined,
    mumps: undefined,
    rubella: undefined,
    chickenPox: undefined,
    syphilis: undefined,
    rash: undefined,
    glaucoma: undefined,
    chlamydias: undefined,
    gonorrhea: undefined,
    gastricBypass: undefined,
    other: undefined,
    otherDetails: undefined,
  }

  value.forEach((item) => {
    const key = item.sectionItem
    const itemValue = item.sectionItemValue

    if (key === 'other') {
      result.other = itemValue !== 'undefined' && itemValue !== undefined
    }

    if (key === 'otherDetails') {
      result.otherDetails =
        itemValue !== 'undefined' && itemValue !== undefined
          ? itemValue
          : undefined
    }

    if (key === 'pregnantDate') {
      result.pregnantDate =
        itemValue !== 'undefined' && itemValue !== undefined
          ? itemValue
          : undefined
    } else if (key === 'breastFeedingDaysPostPartum') {
      result.breastFeedingDaysPostPartum =
        itemValue !== 'undefined' && itemValue !== undefined
          ? Number(itemValue)
          : undefined
    } else if (key in result && key !== 'otherDetails') {
      result[key] = itemValue === 'true'
    }
  })

  return result as PastMedicalHxWidgetSchemaType
}

const transformOut =
  (patientId: string) =>
  (schema: PastMedicalHxWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    }

    const formData = sanitizeFormData(schema)
    const addQuickNote = (sectionItem: string, sectionItemValue: string) => {
      result.push({ ...QuickNotesPayload, sectionItem, sectionItemValue })
    }

    Object.entries(formData).forEach(([key, value]) => {
      const isTrueOrFalse = value ? 'true' : 'false'

      switch (key) {
        case 'other':
          addQuickNote(key, isTrueOrFalse)
          addQuickNote(
            'otherDetails',
            value && formData.otherDetails ? formData.otherDetails : '',
          )
          break

        case 'pregnant':
          if (value && formData.pregnantDate) {
            addQuickNote('pregnantDate', formData.pregnantDate.toString())
          }
          addQuickNote(key, isTrueOrFalse)
          break

        case 'breastFeeding':
          if (value && formData.breastFeedingDaysPostPartum) {
            addQuickNote(
              'breastFeedingDaysPostPartum',
              formData.breastFeedingDaysPostPartum.toString(),
            )
          }
          addQuickNote(key, isTrueOrFalse)
          break

        case 'pregnantDate':
        case 'breastFeedingDaysPostPartum':
        case 'otherDetails':
          break
        default:
          addQuickNote(key, isTrueOrFalse)
          break
      }
    })

    return result
  }

export { transformIn, transformOut }
