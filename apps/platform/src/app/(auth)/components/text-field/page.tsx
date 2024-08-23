'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { TextField } from '@psychplus/ui/text-field'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Text Field'
const DESCRIPTION =
  'Captures user input with an optional slot for buttons and icons.'

const TextFieldComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Root placeholder="Search the docs…" />
      </TextField.Root>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Without Slots</Heading>
      </Box>
      <TextField.Root placeholder="Enter your email" />
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <TextField.Root size="1" placeholder="Search the docs…" />
        <TextField.Root size="2" placeholder="Search the docs…" />
        <TextField.Root size="3" placeholder="Search the docs…" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <TextField.Root variant="surface" placeholder="Search the docs…" />
        <TextField.Root variant="classic" placeholder="Search the docs…" />
        <TextField.Root variant="soft" placeholder="Search the docs…" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="3">
        <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
          <TextField.Root
            color="indigo"
            variant="soft"
            placeholder="Search the docs…"
          />
          <TextField.Root
            color="green"
            variant="soft"
            placeholder="Search the docs…"
          />
          <TextField.Root
            color="red"
            variant="soft"
            placeholder="Search the docs…"
          />
        </Flex>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Radius</Heading>
      </Box>
      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <TextField.Root radius="none" placeholder="Search the docs…" />
        <TextField.Root radius="large" placeholder="Search the docs…" />
        <TextField.Root radius="full" placeholder="Search the docs…" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Disabled</Heading>
      </Box>
      <TextField.Root placeholder="Enter your email" disabled />
    </Box>
  </>
)

export default TextFieldComponentPage
