import { Box, Button, Flex } from '@radix-ui/themes'
import { FormCheckbox } from '@/components/form-checkbox'

const ClaimActions = () => {
  return (
    <Flex direction="column" gap="2" className="pt-1">
      <Flex justify="between" className="bg-white py-1">
        <Flex gap="2">
          <FormCheckbox label="HCFA" fieldName="isForcePaper" />
          <FormCheckbox label="Ready to Send" fieldName="isClaimScrubbed" />
          <FormCheckbox label="Hold Statement" fieldName="isForcePaper" />
          <FormCheckbox label="Hold Claim" fieldName="isHold" />
          <FormCheckbox label="Mark as Submit" fieldName="isMarkAsSubmitted" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ClaimActions }
