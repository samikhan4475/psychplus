'use client'

import { Avatar, Box, Button, Flex, Text } from '@radix-ui/themes'
import { UserCircle2Icon } from 'lucide-react'
import { getProvidersAction } from '@/actions'
import { Provider } from '@/types'
import { cn } from '@/utils'
import { DropdownMenuSearch } from './dropdown-menu-search'

const renderAvatarFallback = (provider: Provider) => {
  const firstInitial = provider.firstName.charAt(0)
  const lastInitial = provider.lastName.charAt(0)
  return `${firstInitial}${lastInitial}`
}

const renderProvider = (provider: Provider, disabled?: boolean) => {
  return (
    <Flex align="center" gap="3">
      <Box>
        <Avatar
          size="3"
          src={provider.avatar}
          fallback={renderAvatarFallback(provider)}
          className="h-[35px] w-[35px]"
        />
      </Box>
      <Flex direction="column" align="start">
        <Text
          size="1"
          weight="medium"
          color="gray"
          className={cn({ 'text-gray-8': disabled })}
        >
          {`${provider.firstName} ${provider.lastName}`}
        </Text>
        <Text size="1" color="gray" className={cn({ 'text-gray-8': disabled })}>
          {provider.honors}
        </Text>
      </Flex>
    </Flex>
  )
}

const renderItem = (provider: Provider) => {
  return (
    <Box py="2" px="2" className="hover:bg-accent-2">
      {renderProvider(provider)}
    </Box>
  )
}

const renderTrigger = (provider?: Provider, disabled?: boolean) => {
  let content = null

  if (provider) {
    content = renderProvider(provider, disabled)
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
        <Text
          size="2"
          className={cn('text-gray-9', { 'text-gray-8': disabled })}
        >
          Select provider
        </Text>
      </Flex>
    )
  }

  return (
    <Button
      variant="ghost"
      type="button"
      className="!m-0 w-full cursor-pointer justify-start p-0 enabled:hover:bg-accent-2 disabled:cursor-not-allowed disabled:bg-gray-2"
    >
      <Flex
        p="1"
        align="center"
        width="100%"
        className={cn('rounded-item border border-gray-6', {
          'border-gray-5': disabled,
        })}
      >
        {content}
      </Flex>
    </Button>
  )
}

interface ProviderSearchDropdownProps {
  initialValue?: Provider
  disabled?: boolean
  onChange?: (value: Provider) => void
}

const ProviderSearchDropdown = ({
  initialValue,
  disabled,
  onChange,
}: ProviderSearchDropdownProps) => {
  return (
    <DropdownMenuSearch
      initialValue={initialValue}
      disabled={disabled}
      placeholder="Search providers…"
      fetchResults={getProvidersAction}
      renderItem={renderItem}
      renderTrigger={renderTrigger}
      onChange={onChange}
    />
  )
}

export { ProviderSearchDropdown }
