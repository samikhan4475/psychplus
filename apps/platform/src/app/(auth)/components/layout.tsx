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
    label: 'Data Table',
    href: '/components/data-table',
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
    label: 'Radio Group',
    href: '/components/radio-group',
  },
  {
    label: 'Select',
    href: '/components/select',
  },
  {
    label: 'Switch',
    href: '/components/switch',
  },
  {
    label: 'Table',
    href: '/components/table',
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
