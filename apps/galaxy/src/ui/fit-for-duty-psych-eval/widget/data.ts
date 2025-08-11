import { parseDate } from '@internationalized/date'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { SchemaType } from './schema'
import { TransformInParams } from './types'
import {
  applyPatientVitals,
  decorateEmptyInitialValues,
  getInitialValues,
} from './utils'

const transformIn = ({
  data,
  patientVitals,
  isActualNoteView,
}: TransformInParams): SchemaType => {
  const result = isActualNoteView
    ? decorateEmptyInitialValues(getInitialValues())
    : getInitialValues()

  for (const { sectionItem, sectionItemValue } of data) {
    const key = sectionItem as keyof SchemaType
    const value = sectionItemValue?.trim()

    if (key === 'dateOfIncident') {
      result[key] = value ? parseDate(value) : null
    } else if (typeof result[key] === 'string') {
      result[key] = value ?? ''
    }
  }
  return isActualNoteView ? result : applyPatientVitals(result, patientVitals)
}

const transformOut =
  (patientId: string) =>
  (schema: SchemaType): QuickNoteSectionItem[] => {
    const sanitizedFormData = sanitizeFormData(schema)
    const pid = Number(patientId)
    const sectionName = QuickNoteSectionName.QuicknoteSectionFitForDutyPsychEval
    const entries = Object.entries(sanitizedFormData)

    if (entries?.length === 0) {
      return [
        {
          pid,
          sectionName,
          sectionItem: '1',
          sectionItemValue: '1',
        },
      ]
    }

    return entries?.map(([key, value]) => ({
      pid,
      sectionName,
      sectionItem: key,
      sectionItemValue:
        value === null
          ? ''
          : key === 'dateOfIncident' && typeof value !== 'string'
          ? value.toString()
          : String(value),
    }))
  }

export { transformIn, transformOut }
