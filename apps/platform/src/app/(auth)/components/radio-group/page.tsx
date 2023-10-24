'use client'

import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { RadioGroup } from '@psychplus/ui/radio-group'
import { Switch } from '@psychplus/ui/switch'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Radio Group'
const DESCRIPTION =
  'A set of interactive radio buttons where only one can be selected at a time.'

const RadioGroupComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <RadioGroup.Root defaultValue="1">
        <Flex gap="2" direction="column">
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="1" /> Default
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="2" /> Comfortable
            </Flex>
          </Text>
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="3" /> Compact
            </Flex>
          </Text>
        </Flex>
      </RadioGroup.Root>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex align="center" gap="2">
        <RadioGroup.Root size="1" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root size="2" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root size="3" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex gap="2">
        <Flex direction="column" asChild gap="2">
          <RadioGroup.Root variant="surface" defaultValue="1">
            <RadioGroup.Item value="1" />
            <RadioGroup.Item value="2" />
          </RadioGroup.Root>
        </Flex>

        <Flex direction="column" asChild gap="2">
          <RadioGroup.Root variant="classic" defaultValue="1">
            <RadioGroup.Item value="1" />
            <RadioGroup.Item value="2" />
          </RadioGroup.Root>
        </Flex>

        <Flex direction="column" asChild gap="2">
          <RadioGroup.Root variant="soft" defaultValue="1">
            <RadioGroup.Item value="1" />
            <RadioGroup.Item value="2" />
          </RadioGroup.Root>
        </Flex>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="2">
        <RadioGroup.Root color="indigo" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="cyan" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="orange" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="crimson" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High-contrast</Heading>
      </Box>
      <Grid rows="2" gap="2" display="inline-grid" flow="column">
        <RadioGroup.Root color="indigo" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="indigo" defaultValue="1" highContrast>
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="cyan" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="cyan" defaultValue="1" highContrast>
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="orange" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="orange" defaultValue="1" highContrast>
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="crimson" defaultValue="1">
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>

        <RadioGroup.Root color="crimson" defaultValue="1" highContrast>
          <RadioGroup.Item value="1" />
        </RadioGroup.Root>
      </Grid>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Alignment</Heading>
      </Box>
      <Flex direction="column" gap="3">
        <RadioGroup.Root size="1" defaultValue="1">
          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="1" /> Default
            </Flex>
          </Text>

          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="2" /> Compact
            </Flex>
          </Text>
        </RadioGroup.Root>

        <RadioGroup.Root size="2" defaultValue="1">
          <Text as="label" size="3">
            <Flex gap="2">
              <RadioGroup.Item value="1" /> Default
            </Flex>
          </Text>

          <Text as="label" size="3">
            <Flex gap="2">
              <RadioGroup.Item value="2" /> Compact
            </Flex>
          </Text>
        </RadioGroup.Root>

        <RadioGroup.Root size="3" defaultValue="1">
          <Text as="label" size="4">
            <Flex gap="2">
              <RadioGroup.Item value="1" /> Default
            </Flex>
          </Text>

          <Text as="label" size="4">
            <Flex gap="2">
              <RadioGroup.Item value="2" /> Compact
            </Flex>
          </Text>
        </RadioGroup.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Disabled</Heading>
      </Box>
      <Flex direction="column" gap="2">
        <RadioGroup.Root defaultValue="2">
          <Flex direction="column" gap="2">
            <Text as="label" size="2">
              <Flex gap="2">
                <RadioGroup.Item value="1" />
                Off
              </Flex>
            </Text>

            <Text as="label" size="2">
              <Flex gap="2">
                <RadioGroup.Item value="2" />
                On
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>

        <RadioGroup.Root defaultValue="2">
          <Flex direction="column" gap="2">
            <Text as="label" size="2" color="gray">
              <Flex gap="2">
                <RadioGroup.Item value="1" disabled />
                Off
              </Flex>
            </Text>

            <Text as="label" size="2" color="gray">
              <Flex gap="2">
                <RadioGroup.Item value="2" disabled />
                On
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>
      </Flex>
    </Box>
  </>
)

export default RadioGroupComponentPage
