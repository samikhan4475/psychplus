import { Box, Flex, Text } from '@radix-ui/themes'
import { SsnInput } from '@psychplus/ui/ssn-input'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Ssn Input'
const DESCRIPTION = 'An text input field for ssn numbers.'

const SsnInputComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Flex direction="column" gap="1">
        <Text as="label" htmlFor="ssn-input" size="2" weight="bold">
          SSN
        </Text>
        <SsnInput size="3" id="ssn-input" />
      </Flex>
    </Box>
  </>
)

export default SsnInputComponentPage
