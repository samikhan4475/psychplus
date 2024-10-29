import { HpiWidgetSchemaType } from '@/ui/hpi/hpi-widget/hpi-widget-schema'
import { optionsValueToLabel } from '@/ui/hpi/hpi-widget/utils'
import { HpiWidgetSchemaKey } from './hpi-narration'

const formatSymptoms = (filteredSymptoms: string[]): string => {
  const count = filteredSymptoms.length
  if (count === 0) return ''
  if (count === 1) return filteredSymptoms?.[0]?.toLowerCase()

  return (
    filteredSymptoms
      .map((symptom) => symptom?.toLowerCase())
      .slice(0, -1)
      .join(', ') + ` and ${filteredSymptoms?.[count - 1]?.toLowerCase()}`
  )
}

const formatOthersDetail = (
  complaints: string[],
  symptoms: HpiWidgetSchemaType,
  otherKey: string,
  detailsKey: string,
): string[] => {
  const otherIndex = complaints.indexOf(otherKey)
  if (otherIndex === -1) return complaints

  const formattedComplaints = complaints.filter((cc) => cc !== otherKey)
  const details = symptoms[detailsKey as HpiWidgetSchemaKey]

  if (details && typeof details === 'string' && details.trim()) {
    formattedComplaints.push(`other: ${details.trim()}`)
  }

  return formattedComplaints
}

const schizophreniaMap: Record<string, HpiWidgetSchemaKey> = {
  hallucination: 'schizophreniaHallucinationsValues',
  delusion: 'schizophreniaDelusionValues',
}

const otherDetailsMap: Record<string, { key: string; detailsKey: string }> = {
  substance: { key: 'subOther', detailsKey: 'subOtherDetails' },
  medicationSe: { key: 'medOther', detailsKey: 'medOtherDetails' },
  chiefComplaint: { key: 'ccOther', detailsKey: 'ccOtherDetails' },
}

const appendMuliSelectOptions = (
  complaints: string[],
  symptoms: HpiWidgetSchemaType,
  key: string,
  valueKey: keyof HpiWidgetSchemaType,
): string[] => {
  const values = symptoms[valueKey] ?? []

  if (
    !complaints.includes(key) ||
    !Array.isArray(values) ||
    values.length === 0
  ) {
    return complaints
  }

  const suffix = key === 'delusion' ? 'delusion' : 'hallucination'
  complaints = complaints.filter((symptom) => symptom !== key)
  complaints.unshift(
    ...values.map(
      (value) => `${optionsValueToLabel[value] ?? value} ${suffix}`,
    ),
  )

  return complaints
}

function getGenderValue(genderValue?: string): string {
  if (!genderValue) {
    return 'N/A'
  }
  const specialValues = ['undetermined', 'notspecified']
  if (specialValues.includes(genderValue.toLowerCase())) {
    return `gender:${genderValue.toLowerCase()}`
  }
  return genderValue.toLowerCase()
}

export {
  formatSymptoms,
  formatOthersDetail,
  otherDetailsMap,
  appendMuliSelectOptions,
  schizophreniaMap,
  getGenderValue,
}
