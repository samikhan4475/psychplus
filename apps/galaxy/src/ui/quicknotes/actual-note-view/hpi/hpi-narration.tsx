import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PatientProfile, SharedCode } from '@/types'
import { HpiWidgetSchemaType } from '@/ui/hpi/hpi-widget/hpi-widget-schema'
import { optionsValueToLabel } from '@/ui/hpi/hpi-widget/utils'
import { BlockContainer, LabelAndValue } from '../shared'
import {
  appendMuliSelectOptions,
  formatOthersDetail,
  formatSymptoms,
  hasValues,
  otherDetailsMap,
  schizophreniaMap,
} from './utils'

interface Props {
  patient: Partial<PatientProfile>
  symptoms: HpiWidgetSchemaType
  delusionTypeCodeset: SharedCode[]
  hallucinationTypeCodeset: SharedCode[]
}

type HpiWidgetSchemaKey = keyof HpiWidgetSchemaType

const HpiNarration = ({
  patient,
  symptoms,
  delusionTypeCodeset,
  hallucinationTypeCodeset,
}: Props) => {
  const generateNarration = () => {
    const chiefComplaints = symptoms.chiefComplaint ?? []

    if (!hasValues(symptoms)) return ''

    let narration = ` ${patient.name} is a ${patient.age}-year-old, ${patient.gender}`

    const { key, detailsKey } = otherDetailsMap['chiefComplaint']
    const formattedComplaints = formatOthersDetail(
      chiefComplaints,
      symptoms,
      key,
      detailsKey,
    )

    const formattedSymptoms = formatSymptoms(formattedComplaints)
    if (chiefComplaints.length) {
      narration +=
        ` who reports Chief Complaint/s of ` + formattedSymptoms + '.'
    }

    Object.keys(symptoms).forEach((complaint) => {
      if (
        [
          'chiefComplaint',
          'schizophreniaHallucinationsValues',
          'schizophreniaDelusionValues',
          'autismIntellectualImpairmentValue',
        ].includes(complaint)
      ) {
        return
      }

      let complaintSymptoms = symptoms[complaint as HpiWidgetSchemaKey]

      if (Array.isArray(complaintSymptoms) && complaintSymptoms.length > 0) {
        narration += ` The patient reports that ${
          optionsValueToLabel[complaint] ?? complaint
        } symptoms are consistent with issues with `

        const details = otherDetailsMap[complaint]
        if (details) {
          complaintSymptoms = formatOthersDetail(
            complaintSymptoms,
            symptoms,
            details.key,
            details.detailsKey,
          )
        }
        if (complaint === 'schizophrenia') {
          Object.keys(schizophreniaMap).forEach((key) => {
            const valueKey = schizophreniaMap[key]
            if (symptoms[valueKey]?.length) {
              complaintSymptoms = appendMuliSelectOptions(
                complaintSymptoms as string[],
                symptoms,
                key,
                valueKey,
              )
            }
          })
        }

        const formattedSymptoms = formatSymptoms(
          complaintSymptoms,
          delusionTypeCodeset,
          hallucinationTypeCodeset,
        )
        narration += formattedSymptoms + '.'
      }
      if (
        complaint === 'autismIntellectualImpairmentValue' &&
        symptoms[complaint]
      ) {
        narration += ` The patient has Intellectual Impairment categorized as: ${symptoms[complaint]}.`
      }
    })
    return narration
  }
  return (
    <BlockContainer heading="History of Present Illness/Presenting Symptoms">
      <Flex direction="column">
        <Text
          size="1"
          weight="regular"
          className="whitespace-pre-wrap break-words"
        >
          {generateNarration()}
        </Text>
        {symptoms?.hpiOther && (
          <LabelAndValue
            label="Other:"
            value={symptoms?.hpiOther}
            detailsClassName="break-words"
          />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { HpiNarration, type HpiWidgetSchemaKey }
