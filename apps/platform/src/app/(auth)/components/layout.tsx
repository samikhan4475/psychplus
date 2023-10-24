import { Box, Flex, Heading, Section } from '@radix-ui/themes'
import { NavigationMenu, type MenuItem } from '../shared/navigation-menu'

const navMenuItems: MenuItem[] = [
  {
    label: 'Button',
    href: '/components/button',
  },
  {
    label: 'Checkbox',
    href: '/components/checkbox',
  },
  {
    label: 'Dialog',
    href: '/components/dialog',
  },
  {
    label: 'Dropdown Menu',
    href: '/components/dropdown-menu',
  },
  {
    label: 'Select',
    href: '/components/select',
  },
  {
    label: 'Text Area',
    href: '/components/text-area',
  },
  {
    label: 'Text Field',
    href: '/components/text-field',
  },
]

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => (
  <Flex>
    <Box px="4" pt="4" pb="9">
      <Box px="3" py="2">
        <Heading size="3">Components</Heading>
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

export default ComponentsLayout
