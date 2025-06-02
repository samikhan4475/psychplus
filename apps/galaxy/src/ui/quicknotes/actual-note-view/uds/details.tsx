import { Flex } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { UdsWidgetSchemaType } from '@/ui/uds/uds-widget/uds-widget-schema'
import { BlockContainer, LabelAndValue } from '../shared'
import { RESULT_ACTION_OPTIONS, RESULT_OPTIONS } from './utils'

interface Props<T> {
  data: T
}

const Details = ({ data }: Props<UdsWidgetSchemaType>) => {
  const confirmationReasonOptions = useCodesetOptions(
    CODESETS.ConfirmatoryTesting,
  )
  const medicalNecessityOptions = useCodesetOptions(
    CODESETS.UDSMedicalNecessity,
  )
  const medicalNecessity = data.medicalNecessity
    ?.map(
      (val) => medicalNecessityOptions.find((opt) => opt.value === val)?.label,
    )
    .filter(Boolean)
    .join(', ')

  const confirmationReasons = data.confirmationReasons
    ?.map(
      (val) =>
        confirmationReasonOptions.find((opt) => opt.value === val)?.label,
    )
    .filter(Boolean)
    .join(', ')
  return (
    <BlockContainer heading="Urine Drug Screening">
      <Flex direction="column" gap="2">
        <LabelAndValue label="Purpose of Visit:" value={data.purposeOfVisit} />
        <LabelAndValue label="UDS Medical Necessity:" allowEmptyValue />
        <LabelAndValue
          label="The patient was administered a urine drug screen (UDS) for:"
          value={medicalNecessity}
        />
        {data.medicalNecessity.includes('Other') && (
          <LabelAndValue label="Other:" value={data.udsOther} />
        )}
        <LabelAndValue
          label="Confirmatory Testing Needed:"
          value={data.confirmatoryTesting}
        />
        {data.confirmatoryTesting === 'yes' && (
          <LabelAndValue
            label="Reason for Confirmation:"
            value={confirmationReasons}
          />
        )}
        <LabelAndValue
          label="Interpretation:"
          value={`The patient’s urine drug screen (UDS) results were ${
            RESULT_OPTIONS.find((opt) => opt.value === data.result)?.label ??
            data.result
          } and ${
            RESULT_ACTION_OPTIONS.find((opt) => opt.value === data.resultAction)
              ?.label ?? data.resultAction
          } forwarded for confirmatory testing via laboratory analysis.`}
        />
      </Flex>
    </BlockContainer>
  )
}

export { Details }
