import { Box, Flex, Heading } from '@radix-ui/themes'
import { Badge } from '@psychplus/ui/badge'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Badge'
const DESCRIPTION = 'A stylized badge element.'

const BadgeComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Flex gap="2">
        <Badge color="orange">In progress</Badge>
        <Badge color="blue">In review</Badge>
        <Badge color="green">Complete</Badge>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex gap="2">
        <Badge variant="solid" color="indigo">
          New
        </Badge>
        <Badge variant="soft" color="indigo">
          New
        </Badge>
        <Badge variant="outline" color="indigo">
          New
        </Badge>
        <Badge variant="surface" color="indigo">
          New
        </Badge>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex align="center" gap="2">
        <Badge size="2" color="indigo">
          New
        </Badge>

        <Badge size="1" color="indigo">
          New
        </Badge>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High-contrast</Heading>
      </Box>
      <Flex direction="column" gap="2">
        <Flex gap="2">
          <Badge variant="solid">New</Badge>
          <Badge variant="soft">New</Badge>
          <Badge variant="outline">New</Badge>
          <Badge variant="surface">New</Badge>
        </Flex>
        <Flex gap="2">
          <Badge variant="solid" highContrast>
            New
          </Badge>
          <Badge variant="soft" highContrast>
            New
          </Badge>
          <Badge variant="outline" highContrast>
            New
          </Badge>
          <Badge variant="surface" highContrast>
            New
          </Badge>
        </Flex>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Radius</Heading>
      </Box>
      <Flex gap="2">
        <Badge variant="solid" radius="none" color="indigo">
          New
        </Badge>
        <Badge variant="solid" radius="large" color="indigo">
          New
        </Badge>
        <Badge variant="solid" radius="full" color="indigo">
          New
        </Badge>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="2">
        <Badge color="indigo">New</Badge>
        <Badge color="cyan">New</Badge>
        <Badge color="orange">New</Badge>
        <Badge color="crimson">New</Badge>
      </Flex>
    </Box>
  </>
)

export default BadgeComponentPage
