'use client'

import {
  ArrowTopLeftIcon,
  AvatarIcon,
  CheckIcon,
  EraserIcon,
  FaceIcon,
  GearIcon,
  HomeIcon,
  IdCardIcon,
} from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { PharmacyIcon } from '@/components'

const HeaderMenuCard = () => {
  return (
    <Flex gap="7" justify="center" className=" whitespace-nowrap">
      {menuItems.map((item) => (
        <HeaderMenuSection key={item.name} {...item} />
      ))}
    </Flex>
  )
}

const HeaderMenuSection = ({ icon, name, items: items }: HeaderMenuSectionProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex
          className="relative p-3 font-bold text-gray-8 transition duration-300 hover:text-accent-1"
          direction="column"
          align="center"
          gap="2"
        >
          <Flex className="text-accent-1">{icon}</Flex>
          <Text size="2">{name}</Text>
        </Flex>
      </DropdownMenu.Trigger>
      {items && (
        <DropdownMenu.Content className="w-80 whitespace-nowrap rounded-2 bg-gray-12">
          {items.map((item) => (
            <Flex key={item.name} align="center" p="2">
              <DropdownMenu.Item className="hover:bg-gray-12">
                <Flex className="text-accent-1" mr="3">
                  {item.icon}
                </Flex>
                <Flex
                  direction="column"
                  className="text-gray-8 hover:text-accent-1"
                >
                  <Text size="2" className="font-bold">
                    {item.name}
                  </Text>
                  <Text className="font-light" size="1">
                    {item.description}
                  </Text>
                </Flex>
              </DropdownMenu.Item>
            </Flex>
          ))}
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  )
}

interface HeaderMenuSectionProps {
  icon: JSX.Element
  name: string
  items: HeaderMenuChildrenSection[] | []
}

interface HeaderMenuChildrenSection {
  icon: JSX.Element
  name: string
  description: string
}

const menuItems = [
  {
    icon: <HomeIcon height={22} width={22} />,
    name: 'Home',
    items: [],
  },
  {
    icon: <AvatarIcon height={22} width={22} />,
    name: 'My Account',
    items: [
      {
        icon: <FaceIcon height={22} width={22} />,
        name: 'Patient Info',
        description: 'See patient Information',
      },
      {
        icon: <FaceIcon height={22} width={22} />,
        name: 'Plus Membership',
        description: 'See your detail',
      },
      {
        icon: <FaceIcon height={22} width={22} />,
        name: 'Cancel Membership',
        description: 'See your detail',
      },
    ],
  },
  {
    icon: <IdCardIcon height={22} width={22} />,
    name: 'Billing',
    items: [
      {
        icon: <CheckIcon height={22} width={22} />,
        name: 'Credit Card',
        description: 'Credit & Debit Cards & Payment Methods',
      },
      {
        icon: <EraserIcon height={22} width={22} />,
        name: 'Insurrance Info',
        description: 'All Insurance Information & Histroy',
      },
      {
        icon: <ArrowTopLeftIcon height={22} width={22} />,
        name: 'Transaction History',
        description: 'See your transaction histroy',
      },
    ],
  },
  {
    icon: <PharmacyIcon height={22} width={22} />,
    name: 'Pharmacy',
    items: [],
  },
  {
    icon: <GearIcon height={22} width={22} />,
    name: 'Settings',
    items: [
      {
        icon: <FaceIcon height={22} width={22} />,
        name: 'Change Password',
        description: 'Change your password',
      },
    ],
  },
]

export { HeaderMenuCard }
