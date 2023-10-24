'use client'

import { Box, Flex, Heading } from '@radix-ui/themes'
import { Select } from '@psychplus/ui/select'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Select'
const DESCRIPTION =
  'Displays a list of options for the user to pick from—triggered by a button.'

const SelectComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Flex align="center" gap="3">
        <Select.Root defaultValue="apple">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="grape" disabled>
                Grape
              </Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Vegetables</Select.Label>
              <Select.Item value="carrot">Carrot</Select.Item>
              <Select.Item value="potato">Potato</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Alternative Positioning</Heading>
      </Box>
      <Select.Root defaultValue="apple">
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Content>
      </Select.Root>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex gap="3" align="center">
        <Select.Root size="1" defaultValue="apple">
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root size="2" defaultValue="apple">
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root size="3" defaultValue="apple">
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex gap="3" align="center">
        <Select.Root defaultValue="apple">
          <Select.Trigger variant="surface" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger variant="classic" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger variant="soft" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Ghost</Heading>
      </Box>
      <Flex gap="3" align="center">
        <Select.Root defaultValue="apple">
          <Select.Trigger variant="surface" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger variant="ghost" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="3">
        <Select.Root defaultValue="apple">
          <Select.Trigger color="indigo" variant="soft" />
          <Select.Content color="indigo">
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger color="cyan" variant="soft" />
          <Select.Content color="cyan">
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger color="orange" variant="soft" />
          <Select.Content color="orange">
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger color="crimson" variant="soft" />
          <Select.Content color="crimson">
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High-contrast</Heading>
      </Box>
      <Flex gap="3">
        <Select.Root defaultValue="apple">
          <Select.Trigger variant="soft" />
          <Select.Content variant="solid">
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger variant="soft" />
          <Select.Content variant="solid" highContrast>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Radius</Heading>
      </Box>
      <Flex gap="3">
        <Select.Root defaultValue="apple">
          <Select.Trigger radius="none" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger radius="large" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="apple">
          <Select.Trigger radius="full" />
          <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Placeholder</Heading>
      </Box>
      <Select.Root>
        <Select.Trigger placeholder="Pick a fruit" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Disabled</Heading>
      </Box>
      <Select.Root>
        <Select.Trigger placeholder="Pick a fruit" disabled />
        <Select.Content>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Content>
      </Select.Root>
    </Box>
  </>
)

export default SelectComponentPage
