'use client'

import { Box, Flex, Heading } from '@radix-ui/themes'
import { TextArea } from '@psychplus/ui/text-area'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Text Area'
const DESCRIPTION = 'Captures multi-line user input.'

const TextAreaComponentPage = () => (
  <Box className="min-w-[500px]">
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <TextArea placeholder="Reply to comment…" />
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
        <TextArea size="1" placeholder="Reply to comment…" />
        <TextArea size="2" placeholder="Reply to comment…" />
        <TextArea size="3" placeholder="Reply to comment…" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
        <TextArea variant="surface" placeholder="Reply to comment…" />
        <TextArea variant="classic" placeholder="Reply to comment…" />
        <TextArea variant="soft" placeholder="Reply to comment…" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex direction="column" gap="3" style={{ maxWidth: 500 }}>
        <TextArea color="blue" variant="soft" placeholder="Reply to comment…" />
        <TextArea
          color="green"
          variant="soft"
          placeholder="Reply to comment…"
        />
        <TextArea color="red" variant="soft" placeholder="Reply to comment…" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Disabled</Heading>
      </Box>
      <TextArea placeholder="Reply to comment…" disabled />
    </Box>
  </Box>
)

export default TextAreaComponentPage
