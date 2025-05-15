import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { AssessmentSummaryBlock } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/blocks'
import { PsychiatryAssessmentPlanTabSchemaType } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-schema'
import { BlockContainer, LabelAndValue } from '../../shared'
import { patientDiscussion } from '../constants'

interface PsychiatristAssessmentPlanBlockProps {
  data: PsychiatryAssessmentPlanTabSchemaType
  appointment: Appointment
  codesData: QuickNoteSectionItem[]
}

const PsychiatristAssessmentPlanBlock = ({
  data,
  codesData,
  appointment,
}: PsychiatristAssessmentPlanBlockProps) => {
  return (
    <BlockContainer heading="Psychiatrist Assessment/Plan">
      <Flex direction="column" gap="2">
        <LabelAndValue value={data.assessmentTreatmentPlanNotes} />
        <AssessmentSummaryBlock
          codesData={codesData}
          appointment={appointment}
        />
        {data.patientDiscussionCompleted === 'yes' && (
          <LabelAndValue value={patientDiscussion} />
        )}
      </Flex>
    </BlockContainer>
  )
}

export { PsychiatristAssessmentPlanBlock }
