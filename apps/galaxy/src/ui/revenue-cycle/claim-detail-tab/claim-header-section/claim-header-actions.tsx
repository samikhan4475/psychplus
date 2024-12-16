import { Flex } from '@radix-ui/themes'
import { FormCheckbox } from '@/components/form-checkbox'
import { ClaimAuditHistoryDialog } from '../../dialogs'

const ClaimActions = ({ claimId }: { claimId: string }) => {
  return (
    <Flex direction="column" gap="2" className="pt-1">
      <Flex justify="between" className="bg-white py-1">
        <Flex gap="2">
          <FormCheckbox label="HCFA" fieldName="isForcePaper" />
          <FormCheckbox label="Ready to Send" fieldName="isClaimScrubbed" />
          <FormCheckbox label="Hold Statement" fieldName="isHoldStatement" />
          <FormCheckbox label="Hold Claim" fieldName="isHold" />
          <FormCheckbox label="Mark as Submit" fieldName="isMarkAsSubmitted" />
        </Flex>
        <Flex>
          <ClaimAuditHistoryDialog claimId={claimId} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ClaimActions }
