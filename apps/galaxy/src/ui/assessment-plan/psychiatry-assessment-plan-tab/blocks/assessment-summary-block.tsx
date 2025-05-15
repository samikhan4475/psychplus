/* eslint-disable react/no-unescaped-entities */
import { Box, Text } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { getRiskLevel } from '../utils'

interface AssessmentSummaryBlockProps {
  codesData: QuickNoteSectionItem[]
  appointment: Appointment
}

const AssessmentSummaryBlock: React.FC<AssessmentSummaryBlockProps> = ({
  codesData,
  appointment,
}) => {
  const riskLevel = getRiskLevel(codesData, appointment?.cptPrimaryCodes)
  return (
    <Box className="mb-4">
      <Text className="whitespace-pre-wrap break-words text-1" weight="regular">
        The patient presents with behavioral health needs that require a
        thorough evaluation, diagnosis, and appropriate interventions to support
        emotional well-being and overall functioning. The patient's level of
        risk, assessed as{' '}
        <Text
          as="span"
          className=" bg-pp-table-subRows border-pp-table-subRows h-fit truncate rounded-2 border pl-1.5 pr-1 text-[11px]"
          weight="medium"
        >
          {riskLevel || 'not specified'}
        </Text>
        , and the complexity of their condition, identified as{' '}
        <Text
          as="span"
          className=" bg-pp-table-subRows border-pp-table-subRows h-fit truncate rounded-2 border pl-1.5 pr-1 text-[11px]"
          weight="medium"
        >
          {riskLevel || 'not specified'}
        </Text>
        , were considered in the development of the treatment plan. Based on the
        evaluation, a tailored therapeutic strategy has been developed, taking
        into account pharmacological, psychotherapeutic, and supportive
        services. Treatment and therapy options, recommended lab testing,
        potential medication risks and side effects, as well as a comprehensive
        safety plan and emergency procedures, have been thoroughly reviewed with
        the patient. The proposed interventions, including therapy, medication,
        and supportive services, are considered medically necessary to
        facilitate recovery, stabilize the patient's condition, and promote
        long-term well-being.
      </Text>
    </Box>
  )
}

export { AssessmentSummaryBlock }
