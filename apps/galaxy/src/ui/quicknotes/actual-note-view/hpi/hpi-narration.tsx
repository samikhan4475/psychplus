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
    const chiefComplaints = symptoms.chiefComplaint || []

    if (!chiefComplaints.length && !symptoms?.hpiOther) return ''

    let narration = ` ${patient.name} is a ${patient.age}-year-old, ${patient.gender}`

    if (!chiefComplaints.length && symptoms.hpiOther) {
      return narration
    }

    const { key, detailsKey } = otherDetailsMap['chiefComplaint']
    const formattedComplaints = formatOthersDetail(
      chiefComplaints,
      symptoms,
      key,
      detailsKey,
    )

    const formattedSymptoms = formatSymptoms(formattedComplaints)
    narration += ` who reports Chief Complaint of ` + formattedSymptoms + '.'

    Object.keys(symptoms).forEach((complaint) => {
      if (
        [
          'chiefComplaint',
          'schizophreniaHallucinationsValues',
          'schizophreniaDelusionValues',
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
    })

    return narration
  }
  return (
    <BlockContainer heading="History of Present Illness/Presenting Symptoms">
      <Flex direction="column">
        <Text size="1" weight="regular">
          {generateNarration()}
        </Text>
        {symptoms?.hpiOther && (
          <LabelAndValue label="Other:" value={symptoms?.hpiOther} />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { HpiNarration, type HpiWidgetSchemaKey }
