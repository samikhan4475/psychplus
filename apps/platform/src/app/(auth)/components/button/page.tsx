import { Box, Flex, Heading } from '@radix-ui/themes'
import { PencilIcon } from 'lucide-react'
import { Button } from '@psychplus/ui/button'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Button'
const DESCRIPTION =
  'Trigger an action or event, such as submitting a form or displaying a dialog.'

const ButtonComponentPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Flex align="center" gap="3">
        <Button>Edit profile</Button>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Variant</Heading>
      </Box>
      <Flex align="center" gap="3">
        <Button variant="classic">Edit profile</Button>
        <Button variant="solid">Edit profile</Button>
        <Button variant="soft">Edit profile</Button>
        <Button variant="surface">Edit profile</Button>
        <Button variant="outline">Edit profile</Button>
        <Button variant="ghost">Edit profile</Button>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Size</Heading>
      </Box>
      <Flex gap="3" align="center">
        <Button size="3" variant="soft">
          Edit profile
        </Button>
        <Button size="2" variant="soft">
          Edit profile
        </Button>
        <Button size="1" variant="soft">
          Edit profile
        </Button>
      </Flex>
    </Box>
    <Box mb="7">
      <Box mb="3">
        <Heading size="5">High-contrast</Heading>
      </Box>
      <Flex gap="3">
        <Button variant="classic" highContrast>
          Edit profile
        </Button>
        <Button variant="solid" highContrast>
          Edit profile
        </Button>
        <Button variant="soft" highContrast>
          Edit profile
        </Button>
        <Button variant="surface" highContrast>
          Edit profile
        </Button>
        <Button variant="outline" highContrast>
          Edit profile
        </Button>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Radius</Heading>
      </Box>
      <Flex gap="3">
        <Button radius="none" variant="soft">
          Edit profile
        </Button>
        <Button radius="large" variant="soft">
          Edit profile
        </Button>
        <Button radius="full" variant="soft">
          Edit profile
        </Button>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Color</Heading>
      </Box>
      <Flex gap="3">
        <Button color="indigo" variant="soft">
          Edit profile
        </Button>
        <Button color="cyan" variant="soft">
          Edit profile
        </Button>
        <Button color="orange" variant="soft">
          Edit profile
        </Button>
        <Button color="crimson" variant="soft">
          Edit profile
        </Button>
      </Flex>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">Icon</Heading>
      </Box>
      <Flex gap="3">
        <Button variant="soft">
          <PencilIcon size="16" />
          Edit profile
        </Button>
      </Flex>
    </Box>
  </>
)

export default ButtonComponentPage
