'use client'

import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Switch } from '@psychplus/ui/switch'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Switch'
const DESCRIPTION = 'A toggle switch alternative to the checkbox.'

const SwitchComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Text as="label" size="2">
        <Flex gap="2">
          <Switch defaultChecked /> Sync settings
        </Flex>
      </Text>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex align="center" gap="2">
        <Switch size="1" defaultChecked />
        <Switch size="2" defaultChecked />
        <Switch size="3" defaultChecked />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex gap="2">
        <Flex direction="column" gap="3">
          <Switch variant="surface" />
          <Switch variant="classic" />
          <Switch variant="soft" />
        </Flex>

        <Flex direction="column" gap="3">
          <Switch variant="surface" defaultChecked />
          <Switch variant="classic" defaultChecked />
          <Switch variant="soft" defaultChecked />
        </Flex>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="2">
        <Switch color="indigo" defaultChecked />
        <Switch color="cyan" defaultChecked />
        <Switch color="orange" defaultChecked />
        <Switch color="crimson" defaultChecked />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High-contrast</Heading>
      </Box>
      <Grid rows="2" gapX="2" gapY="3" display="inline-grid" flow="column">
        <Switch color="indigo" defaultChecked />
        <Switch color="indigo" defaultChecked highContrast />
        <Switch color="cyan" defaultChecked />
        <Switch color="cyan" defaultChecked highContrast />
        <Switch color="orange" defaultChecked />
        <Switch color="orange" defaultChecked highContrast />
        <Switch color="crimson" defaultChecked />
        <Switch color="crimson" defaultChecked highContrast />
      </Grid>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Radius</Heading>
      </Box>
      <Flex gap="3">
        <Switch radius="none" defaultChecked />
        <Switch radius="small" defaultChecked />
        <Switch radius="full" defaultChecked />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Alignment</Heading>
      </Box>
      <Flex direction="column" gap="3">
        <Text as="label" size="2">
          <Flex gap="2">
            <Switch size="1" defaultChecked /> Sync settings
          </Flex>
        </Text>
        <Text as="label" size="3">
          <Flex gap="2">
            <Switch size="2" defaultChecked /> Sync settings
          </Flex>
        </Text>
        <Text as="label" size="4">
          <Flex gap="2">
            <Switch size="3" defaultChecked /> Sync settings
          </Flex>
        </Text>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Disabled</Heading>
      </Box>
      <Flex direction="column" gap="2">
        <Text as="label" size="2">
          <Flex gap="2">
            <Switch size="1" />
            Off
          </Flex>
        </Text>
        <Text as="label" size="2">
          <Flex gap="2">
            <Switch size="1" defaultChecked />
            On
          </Flex>
        </Text>
        <Text as="label" size="2" color="gray">
          <Flex gap="2">
            <Switch size="1" disabled />
            On
          </Flex>
        </Text>
        <Text as="label" size="2" color="gray">
          <Flex gap="2">
            <Switch size="1" disabled defaultChecked />
            Off
          </Flex>
        </Text>
      </Flex>
    </Box>
  </>
)

export default SwitchComponentPage
