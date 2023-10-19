import { Box, Flex, Heading, Section } from '@radix-ui/themes'
import { NavigationMenu, type MenuItem } from '../shared/navigation-menu'

const navMenuItems: MenuItem[] = [
  {
    label: 'Alert',
    href: '/components/alert',
  },
  {
    label: 'Alert Dialog',
    href: '/components/alert-dialog',
  },
  {
    label: 'Avatar',
    href: '/components/avatar',
  },
  {
    label: 'Badge',
    href: '/components/badge',
  },
  {
    label: 'Button',
    href: '/components/button',
  },
  {
    label: 'Calendar',
    href: '/components/calendar',
  },
  {
    label: 'Card',
    href: '/components/card',
  },
  {
    label: 'Checkbox',
    href: '/components/checkbox',
  },
  {
    label: 'Date Picker',
    href: '/components/date-picker',
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
    label: 'Input',
    href: '/components/input',
  },
  {
    label: 'Label',
    href: '/components/label',
  },
  {
    label: 'Navigation Menu',
    href: '/components/navigation-menu',
  },
  {
    label: 'Placeholder',
    href: '/components/placeholder',
  },
  {
    label: 'Popover',
    href: '/components/popover',
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
    label: 'Separator',
    href: '/components/separator',
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
    label: 'Tabs',
    href: '/components/tabs',
  },
  {
    label: 'Textarea',
    href: '/components/textarea',
  },
  {
    label: 'Toast',
    href: '/components/toast',
  },
  {
    label: 'Tooltip',
    href: '/components/tooltip',
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
