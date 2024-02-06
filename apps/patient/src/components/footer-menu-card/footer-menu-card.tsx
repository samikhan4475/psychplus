'use client'

import {
  BellIcon,
  CalendarIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import {
  FeatureComingSoonDialog,
  useFeatureComingSoon,
} from '../feature-coming-soon-dialog'

const menuItems = [
  { icon: <CalendarIcon height={22} width={22} />, name: 'Past Appointments' },
  { icon: <EnvelopeClosedIcon height={22} width={22} />, name: 'Letters' },
  { icon: <ChatBubbleIcon height={22} width={22} />, name: 'Live Chat' },
  { icon: <BellIcon height={22} width={22} />, name: 'After Visit Summary' },
  {
    icon: <FileTextIcon height={22} width={22} />,
    name: 'Prescription Refill',
  },
]

const FooterMenuCard = () => {
  const { isDialogOpen, toggleDialog } = useFeatureComingSoon()

  return (
    <Flex
      className="flex-wrap gap-8 rounded-6 border border-gray-2 shadow-3"
      justify="center"
      py="6"
    >
      {menuItems.map((item) => (
        <FooterMenuSection
          key={item.name}
          {...item}
          toggleDialog={toggleDialog}
        />
      ))}

      <FeatureComingSoonDialog
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleDialog}
      />
    </Flex>
  )
}

const FooterMenuSection = ({
  icon,
  name,
  toggleDialog,
}: {
  icon: React.ReactNode
  name: string
  toggleDialog: () => void
}) => (
  <Flex
    align="center"
    justify="center"
    direction="column"
    className="h-28 gap-2 rounded-5 border-2 border-accent-11 p-3 text-accent-11 transition duration-500 hover:bg-accent-11 hover:text-accent-1 max-xs:w-1/2 xs:w-1/3 sm:w-1/3 md:w-1/3 lg:w-44"
    onClick={toggleDialog}
  >
    {icon}

    <Text size="3" align="center">
      {name}
    </Text>
  </Flex>
)

export { FooterMenuCard }
