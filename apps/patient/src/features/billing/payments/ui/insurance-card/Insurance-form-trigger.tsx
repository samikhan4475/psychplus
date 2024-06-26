import { getSlashedDateString } from '@psychplus-v2/utils'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { Badge, DeletableFieldValue, EditableFieldValue } from '@/components-v2'
import { Insurance } from '@/features/billing/payments/types'
import { InfoIcon } from '@/components-v2/info-icon'
import { ActionErrorState, ActionSuccessState } from '@psychplus-v2/api'
import { deleteInsurance } from '../../actions'
import { useRouter } from 'next/navigation'

const InsuranceFormTrigger = ({ insurance }: { insurance: Insurance }) => {

  const router = useRouter()

  const onDeleteAction = async () => {
    if (!insurance) {
      return {
        state: 'error',
        error: 'Insurance not found',
      } as ActionErrorState
    }

    return deleteInsurance(insurance?.id ?? '')
  }

  const trigger = (
    <Box className="border-b border-[#DDDDE3] pb-4 mb-4 last:mb-0">
      <Flex align="center" justify="between" className="mb-3" width="100%">
        <Flex align="center" gap="2">
          <Heading weight="medium" size="4" className="text-[18px] font-sans">
            {insurance.payerName}
          </Heading>
          <Text className="text-white bg-[#3D4149] py-[3px] px-3 rounded-[6px] text-[12px]">
            {insurance.insurancePolicyPriority}
          </Text>
        </Flex>

        <Flex align="center" gap="3">
          <EditableFieldValue />
          <Separator orientation="vertical" />
          <DeletableFieldValue
            tooltip="Remove this card"
            deleteAction={onDeleteAction}
            onSuccess={router.refresh}
            confirmTitle="Remove card"
            confirmDescription="Are you sure? This will remove the card from your account and it will no longer be able to be used."
            confirmActionLabel="Remove card"
          />
        </Flex>
      </Flex>

        <Flex align="center" gap="1">
          <Text className="text-[12px] text-[#60646C] after:content-['.'] after:text-[32px] after:leading-[4px] after:mx-2 last:after:hidden">
            <span className="font-medium text-[#1C2024]">
              {`${insurance.policyName}:  `}
            </span> 
            {getSlashedDateString(insurance.effectiveDate)}
          </Text>
        </Flex>
    </Box>
  )
  return trigger
}

export { InsuranceFormTrigger }