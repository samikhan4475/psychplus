import { getSlashedDateString } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { EditableFieldValue } from '@/components-v2'
import { Insurance } from '@/features/billing/payments/types'

const InsuranceFormTrigger = ({ insurance }: { insurance: Insurance }) => {
  const trigger = (
    <EditableFieldValue>
      <Flex direction="column" className="gap-[2px]">
        <Flex align="center" gap="1">
          <Text>{`${insurance.payerName} (${insurance.insurancePolicyPriority})`}</Text>
        </Flex>
        <Text size="2" className="font-[300] -tracking-[0.25px] opacity-75">
          {insurance.policyName}&nbsp;{' '}
          {getSlashedDateString(insurance.effectiveDate)}
        </Text>
      </Flex>
    </EditableFieldValue>
  )
  return trigger
}

export { InsuranceFormTrigger }
