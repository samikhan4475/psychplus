'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { UserCircle2Icon } from 'lucide-react'
import { Avatar } from '@psychplus/ui/avatar'
import { DropdownMenuSearch } from '@psychplus/ui/dropdown-menu-search'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Dropdown Menu Search'
const DESCRIPTION = 'Dropdown menu with the ability to search for options'

interface Provider {
  id: number
  avatar: string | null
  firstName: string
  lastName: string
  fullName: string
  title: string
}

const PROVIDERS: Provider[] = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1594823823554-b3cf73448d3d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    firstName: 'Doctor',
    lastName: 'Strange',
    fullName: 'Doctor Strange',
    title: 'Psychiatrist',
  },
  {
    id: 2,
    avatar:
      'https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=2844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    firstName: 'Gregory',
    lastName: 'House',
    fullName: 'Gregory House',
    title: 'Psychiatrist',
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=2812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    firstName: 'Henry',
    lastName: 'Jekyll',
    fullName: 'Henry Jekyll',
    title: 'Therapist',
  },
  {
    id: 4,
    avatar: '',
    firstName: 'Doctor',
    lastName: 'Octopus',
    fullName: 'Doctor Octopus',
    title: 'Therapist',
  },
  {
    id: 4,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    firstName: 'Meredith',
    lastName: 'Grey',
    fullName: 'Meredith Grey',
    title: 'Psychiatrist',
  },
]

const fetchResults = async (input: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500)
  })

  return PROVIDERS.filter((provider) =>
    provider.fullName.toLowerCase().includes(input),
  )
}

const renderAvatarFallback = (provider: Provider) => {
  const firstInitial = provider.firstName.charAt(0)
  const lastInitial = provider.lastName.charAt(0)
  return `${firstInitial}${lastInitial}`
}

const renderProvider = (provider: Provider) => {
  return (
    <Flex align="center" gap="3">
      <Box>
        <Avatar
          size="2"
          src={provider.avatar ?? undefined}
          fallback={renderAvatarFallback(provider)}
          className="h-[35px] w-[35px]"
        />
      </Box>
      <Flex direction="column">
        <Text size="2" weight="medium">
          {provider.fullName}
        </Text>
        <Text size="1" color="gray">
          {provider.title}
        </Text>
      </Flex>
    </Flex>
  )
}

const renderItem = (provider: Provider) => {
  return (
    <Box key={provider.id} py="2" px="2" className="hover:bg-accent-2">
      {renderProvider(provider)}
    </Box>
  )
}

const renderTrigger = (provider?: Provider) => {
  let content = null
  if (provider) {
    content = renderProvider(provider)
  } else {
    content = (
      <Flex gap="2" align="center">
        <Flex
          align="center"
          justify="center"
          className="h-[35px] w-[35px] overflow-hidden rounded-[100%]"
        >
          <UserCircle2Icon
            strokeWidth={1}
            className="h-[85%] w-[85%] text-gray-8"
          />
        </Flex>
        <Text size="3" className="text-gray-9">
          Select provider
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      py="2"
      px="2"
      align="center"
      className="cursor-pointer rounded-item border border-gray-7 hover:bg-accent-2"
    >
      {content}
    </Flex>
  )
}

const DropdownMenuSearchPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <DropdownMenuSearch
        placeholder="Search providers…"
        fetchResults={fetchResults}
        renderItem={renderItem}
        renderTrigger={renderTrigger}
      />
    </Box>
  </>
)

export default DropdownMenuSearchPage
