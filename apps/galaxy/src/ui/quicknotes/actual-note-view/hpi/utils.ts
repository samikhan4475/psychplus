import { SharedCode } from '@/types'
import { HpiWidgetSchemaType } from '@/ui/hpi/hpi-widget/hpi-widget-schema'
import { optionsValueToLabel } from '@/ui/hpi/hpi-widget/utils'
import { replaceValueWithLabel } from '@/utils'
import { HpiWidgetSchemaKey } from './hpi-narration'

const formatSymptoms = (
  filteredSymptoms: string[],
  delusionTypeCodeset?: SharedCode[],
  hallucinationTypeCodeset?: SharedCode[],
): string => {
  const count = filteredSymptoms.length
  if (count === 0) return ''

  let updatedSymptoms = filteredSymptoms

  if (delusionTypeCodeset && hallucinationTypeCodeset)
    updatedSymptoms = filteredSymptoms.map((item) => {
      if (item.includes('Delusion'))
        return replaceValueWithLabel(item, delusionTypeCodeset)
      if (item.includes('Hallucination'))
        return replaceValueWithLabel(item, hallucinationTypeCodeset)
      return item
    })

  if (count === 1) return updatedSymptoms?.[0]

  return (
    updatedSymptoms
      ?.map((symptom) => symptom)
      .slice(0, -1)
      .join(', ') + ` and ${filteredSymptoms?.[count - 1]}`
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
  Hallucination: 'schizophreniaHallucinationsValues',
  Delusion: 'schizophreniaDelusionValues',
}

const otherDetailsMap: Record<string, { key: string; detailsKey: string }> = {
  substance: { key: 'subOther', detailsKey: 'subOtherDetails' },
  medicationSe: { key: 'medOther', detailsKey: 'medOtherDetails' },
  chiefComplaint: { key: 'ccOther', detailsKey: 'ccOtherDetails' },
  depression: { key: 'depOther', detailsKey: 'depOtherDetails' },
  anxiety: { key: 'anxOther', detailsKey: 'anxOtherDetails' },
  bipolarMania: { key: 'manOther', detailsKey: 'manOtherDetails' },
  ptsd: { key: 'ptsOther', detailsKey: 'ptsOtherDetails' },
  obsession: { key: 'obsOther', detailsKey: 'obsOtherDetails' },
  bpd: { key: 'bpdOther', detailsKey: 'bpdOtherDetails' },
  adhdInattentive: { key: 'adiOther', detailsKey: 'adiOtherDetails' },
  adhdHyperactive: { key: 'adhdhOther', detailsKey: 'adhdhOtherDetails' },
  autism: { key: 'autOther', detailsKey: 'autOtherDetails' },
  conductDisorder: { key: 'cdOther', detailsKey: 'cdOtherDetails' },
  dementia: { key: 'demOther', detailsKey: 'demOtherDetails' },
  schizophrenia: { key: 'schOther', detailsKey: 'schOtherDetails' },
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

  const suffix = key === 'Delusion' ? 'Delusion' : 'Hallucination'
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

function hasValues(data: HpiWidgetSchemaType): boolean {
  return Object.values(data).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0
    } else if (typeof value === 'string') {
      return value.trim().length > 0
    }
    return false
  })
}

export {
  formatSymptoms,
  formatOthersDetail,
  otherDetailsMap,
  appendMuliSelectOptions,
  schizophreniaMap,
  getGenderValue,
  hasValues,
}
