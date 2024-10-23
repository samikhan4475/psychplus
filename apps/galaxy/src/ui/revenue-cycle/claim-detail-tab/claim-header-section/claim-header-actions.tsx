import { Box, Button, Flex } from '@radix-ui/themes'
import { CheckboxLabel } from './claim-checkbox-label'

const ClaimActions = () => (
  <Flex direction="column" gap="2" className="pt-1">
    <Flex justify="between" className="bg-white py-1">
      <Flex gap="2">
        <CheckboxLabel label="HCFA" />
        <CheckboxLabel label="Ready to Send" />
        <CheckboxLabel label="Hold Statement" />
        <CheckboxLabel label="Hold Claim" />
        <CheckboxLabel label="Mark as Submit" />
      </Flex>
      <Box>
        <Button variant="outline" size="1" color="gray" className="text-black">
          Hx
        </Button>
      </Box>
    </Flex>
  </Flex>
)

export { ClaimActions }
