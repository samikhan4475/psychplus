import { parseDate } from '@internationalized/date'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { PatientVital } from '@/ui/vitals'
import { convertInchesToFeetAndInches, sanitizeFormData } from '@/utils'
import { SchemaType } from './schema'
import { getInitialValues } from './utils'

const transformIn = (
  data: QuickNoteSectionItem[],
  patientVitals?: PatientVital,
): SchemaType => {
  const result = getInitialValues()

  for (const { sectionItem, sectionItemValue } of data) {
    const key = sectionItem as keyof SchemaType
    const value = sectionItemValue?.trim()

    if (key === 'dateOfIncident') {
      result[key] = value ? parseDate(value) : null
    } else if (typeof result[key] === 'string') {
      result[key] = value ?? ''
    }
  }
  // Step 2: fallback from vitals if missing
  if (patientVitals) {
    const { weightPounds, heightInches } = patientVitals

    if (!result.patientWeight && weightPounds !== null) {
      result.patientWeight = String(weightPounds)
    }

    if (
      (!result?.heightFeet || !result?.heightInches) &&
      heightInches !== null
    ) {
      const { feet, inches } = convertInchesToFeetAndInches(
        Number(heightInches),
      )

      if (!result.heightFeet) {
        result.heightFeet = String(feet)
      }

      if (!result.heightInches) {
        result.heightInches = String(inches)
      }
    }
  }

  return result
}

const transformOut =
  (patientId: string) =>
  (schema: SchemaType): QuickNoteSectionItem[] => {
    const result: QuickNoteSectionItem[] = []

    const sanitizedFormData = sanitizeFormData(schema)

    const sectionName = QuickNoteSectionName.QuicknoteSectionFitForDutyPsychEval
    const pid = Number(patientId)

    Object.entries(sanitizedFormData).forEach(([key, value]) => {
      if (key === 'dateOfIncident' && value && typeof value !== 'string') {
        result.push({
          pid,
          sectionName,
          sectionItem: key,
          sectionItemValue: value?.toString(),
        })
        return
      }

      result.push({
        pid,
        sectionName,
        sectionItem: key,
        sectionItemValue: `${value}`,
      })
    })

    if (!result.length) {
      result.push({
        pid,
        sectionName,
        sectionItem: '1',
        sectionItemValue: '1',
      })
    }

    return result
  }

export { transformIn, transformOut }
