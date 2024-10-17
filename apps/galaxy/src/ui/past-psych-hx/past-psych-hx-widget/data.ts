import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { PastPsychHxWidgetSchemaType } from './past-psych-hx-widget-schema'


const transformIn = (
  value: QuickNoteSectionItem[],
): PastPsychHxWidgetSchemaType => {
  const result: Record<string,number | string|undefined | boolean> = {
    psychHospitalizations: undefined,
    suicideAttempts: undefined,
    depression: undefined,
    depressionAge: undefined,
    anxiety: undefined,
    anxietyAge: undefined,
    schizophrenia: undefined,
    schizophreniaAge: undefined,
    bipolar: undefined,
    bipolarAge: undefined,
    disorder: undefined,
    disorderAge: undefined,
    obsessiveThinking: undefined,
    obsessiveThinkingAge: undefined,
    compulsiveBehavior: undefined,
    compulsiveBehaviorAge: undefined,
    adhd: undefined,
    adhdAge: undefined,
    autism: undefined,
    autismAge: undefined,
    eatingDisorder: undefined,
    eatingDisorderAge: undefined,
    exposureToTrauma: undefined,
    exposureToTraumaAge: undefined,
    cuttingSelfHarmBehavior: undefined,
    cuttingSelfHarmBehaviorAge: undefined,
    problemsWithSleep: undefined,
    problemsWithSleepAge: undefined,
    dementia: undefined,
    dementiaAge: undefined,
    personalityDisorder: undefined,
    personalityDisorderAge: undefined,
    intellectualDisability: undefined,
    intellectualDisabilityAge: undefined,
    other: undefined,
    otherDetails: undefined,
  }

  value.forEach((item) => {
    const key = item.sectionItem
    const ageKey = `${item.sectionItem}Age`
    const itemValue = item.sectionItemValue

    if (['psychHospitalizations', 'suicideAttempts'].includes(key)) {
      result[key] = Number(itemValue)
    } else if (key === 'other') {
      result.other = itemValue === 'undefined' ? false : true
      result.otherDetails = itemValue === 'undefined' ? undefined : itemValue
    } else if (key in result) {
      result[ageKey] = itemValue === 'undefined' ? undefined : Number(itemValue)
      result[key] = itemValue === 'false' ? false : true
    }
  })

  return result as PastPsychHxWidgetSchemaType
}

const transformOut =
  (patientId: string) =>
  (schema: PastPsychHxWidgetSchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const QuickNotesPayload = {
      pid: Number(patientId),
      sectionName: QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    }

    const formData = sanitizeFormData(schema)

    Object.entries(formData).forEach(([key, value]) => {
      if (['psychHospitalizations', 'suicideAttempts'].includes(key)) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: key,
          sectionItemValue: value.toString(),
        })
      } else if (key === 'other' && value === true && formData.otherDetails) {
        result.push({
          ...QuickNotesPayload,
          sectionItem: key,
          sectionItemValue: formData.otherDetails,
        })
      }
      if (!key.includes('Age') && value) {
        const ageKey = `${key}Age` as keyof PastPsychHxWidgetSchemaType
        if (formData[ageKey]?.toString())
          result.push({
            ...QuickNotesPayload,
            sectionItem: key,
            sectionItemValue: formData[ageKey]?.toString(),
          })
      }
    })
    return result
  }

export { transformIn, transformOut }
