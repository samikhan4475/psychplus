import { QuickNoteSectionItem } from '@/types'
import { TransformInParams } from '@/ui/fit-for-duty-psych-eval/widget/types'
import {
  applyPatientVitals,
  decorateEmptyInitialValues,
} from '@/ui/fit-for-duty-psych-eval/widget/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { sanitizeFormData } from '@/utils'
import { SchemaType } from './schema'
import { getInitialValues } from './utils'

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
    const value = sectionItemValue?.trim() ?? ''

    result[key] = value
  }

  return isActualNoteView ? result : applyPatientVitals(result, patientVitals)
}
const transformOut =
  (patientId: string) =>
  (schema: SchemaType): QuickNoteSectionItem[] => {
    const sanitizedFormData = sanitizeFormData(schema)
    const pid = Number(patientId)
    const sectionName = QuickNoteSectionName.QuicknoteSectionPreEmployment
    const entries = Object.entries(sanitizedFormData)

    if (entries.length === 0) {
      return [
        {
          pid,
          sectionName,
          sectionItem: '1',
          sectionItemValue: '1',
        },
      ]
    }

    return entries.map(([key, value]) => ({
      pid,
      sectionName,
      sectionItem: key,
      sectionItemValue: value === null ? '' : String(value),
    }))
  }

export { transformIn, transformOut }
