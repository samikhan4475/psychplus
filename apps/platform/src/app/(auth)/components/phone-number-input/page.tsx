import { Box, Flex, Text } from '@radix-ui/themes'
import { PhoneNumberInput } from '@psychplus/ui/phone-number-input'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Phone Number Input'
const DESCRIPTION = 'An text input field for phone numbers.'

const PhoneNumberInputComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Flex direction="column" gap="1">
        <Text as="label" htmlFor="phone-number-input" size="2" weight="bold">
          Phone number
        </Text>
        <PhoneNumberInput size="3" id="phone-number-input" />
      </Flex>
    </Box>
  </>
)

export default PhoneNumberInputComponentPage
