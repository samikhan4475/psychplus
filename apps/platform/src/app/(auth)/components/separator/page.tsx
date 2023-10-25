import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { Separator } from '@psychplus/ui/separator'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Separator'
const DESCRIPTION = 'Visually or semantically separates content.'

const SeparatorComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Text size="2">
        Tools for building high-quality, accessible UI.
        <Separator my="3" size="4" />
        <Flex gap="3" align="center">
          Themes
          <Separator orientation="vertical" />
          Primitives
          <Separator orientation="vertical" />
          Icons
          <Separator orientation="vertical" />
          Colors
        </Flex>
      </Text>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex direction="column" gap="4">
        <Separator orientation="horizontal" size="4" />
        <Separator orientation="horizontal" size="3" />
        <Separator orientation="horizontal" size="2" />
        <Separator orientation="horizontal" size="1" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex direction="column" gap="3">
        <Separator color="indigo" size="4" />
        <Separator color="cyan" size="4" />
        <Separator color="orange" size="4" />
        <Separator color="crimson" size="4" />
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Orientation</Heading>
      </Box>
      <Flex align="center" gap="4">
        <Separator orientation="horizontal" />
        <Separator orientation="vertical" />
      </Flex>
    </Box>
  </>
)

export default SeparatorComponentPage
