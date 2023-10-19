import { Box, Flex, Heading, Section } from '@radix-ui/themes'
import { NavigationMenu, type MenuItem } from '../shared/navigation-menu'

const navMenuItems: MenuItem[] = [
  {
    label: 'User',
    href: '/widgets/user',
  },
  {
    label: 'Patient',
    href: '/widgets/patient',
  },
]

const WidgetsLayout = ({ children }: { children: React.ReactNode }) => (
  <Flex>
    <Box px="4" pt="4" pb="9">
      <Box px="3" py="2">
        <Heading size="3">Widgets</Heading>
      </Box>
      <Flex direction="column" px="4">
        <NavigationMenu items={navMenuItems} />
      </Flex>
    </Box>
    <Box grow="1">
      <Flex justify="center">
        <Section>{children}</Section>
      </Flex>
    </Box>
  </Flex>
)

export default WidgetsLayout
