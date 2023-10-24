import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Checkbox } from '@psychplus/ui/checkbox'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Checkbox'
const DESCRIPTION =
  'Selects a single value, typically for submission in a form.'

const CheckboxComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox defaultChecked /> Agree to Terms and Conditions
        </Flex>
      </Text>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex align="center" gap="2">
        <Checkbox size="1" defaultChecked />
        <Checkbox size="2" defaultChecked />
        <Checkbox size="3" defaultChecked />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Grid rows="2" gap="2" display="inline-grid" flow="column">
        <Checkbox variant="surface" defaultChecked />
        <Checkbox variant="surface" />
        <Checkbox variant="classic" defaultChecked />
        <Checkbox variant="classic" />
        <Checkbox variant="soft" defaultChecked />
        <Checkbox variant="soft" />
      </Grid>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="2">
        <Checkbox color="indigo" defaultChecked />
        <Checkbox color="cyan" defaultChecked />
        <Checkbox color="orange" defaultChecked />
        <Checkbox color="crimson" defaultChecked />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High-contrast</Heading>
      </Box>
      <Grid rows="2" gap="2" display="inline-grid" flow="column">
        <Checkbox color="indigo" defaultChecked />
        <Checkbox color="indigo" defaultChecked highContrast />
        <Checkbox color="cyan" defaultChecked />
        <Checkbox color="cyan" defaultChecked highContrast />
        <Checkbox color="orange" defaultChecked />
        <Checkbox color="orange" defaultChecked highContrast />
        <Checkbox color="crimson" defaultChecked />
        <Checkbox color="crimson" defaultChecked highContrast />
      </Grid>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Alignment</Heading>
      </Box>
      <Flex direction="column" gap="3">
        <Text as="label" size="2">
          <Flex gap="2">
            <Checkbox size="1" defaultChecked /> Agree to Terms and Conditions
          </Flex>
        </Text>
        <Text as="label" size="3">
          <Flex gap="2">
            <Checkbox size="2" defaultChecked /> Agree to Terms and Conditions
          </Flex>
        </Text>
        <Text as="label" size="4">
          <Flex gap="2">
            <Checkbox size="3" defaultChecked /> Agree to Terms and Conditions
          </Flex>
        </Text>
        <Box style={{ maxWidth: 300 }}>
          <Text as="label" size="3">
            <Flex gap="2">
              <Checkbox defaultChecked /> I understand that these documents are
              confidential and cannot be shared with a third party.
            </Flex>
          </Text>
        </Box>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Disabled</Heading>
      </Box>
      <Flex direction="column" gap="2">
        <Text as="label" size="2">
          <Flex gap="2">
            <Checkbox />
            Not checked
          </Flex>
        </Text>
        <Text as="label" size="2">
          <Flex gap="2">
            <Checkbox defaultChecked />
            Checked
          </Flex>
        </Text>
        <Text as="label" size="2" color="gray">
          <Flex gap="2">
            <Checkbox disabled />
            Not checked
          </Flex>
        </Text>
        <Text as="label" size="2" color="gray">
          <Flex gap="2">
            <Checkbox disabled defaultChecked />
            Checked
          </Flex>
        </Text>
      </Flex>
    </Box>
  </>
)

export default CheckboxComponentPage
