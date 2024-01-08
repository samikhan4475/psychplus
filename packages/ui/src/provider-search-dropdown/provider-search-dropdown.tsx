import { Box, Flex, Text } from '@radix-ui/themes'
import { UserCircle2Icon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import { Avatar } from '../avatar'
import { DropdownMenuSearch } from '../dropdown-menu-search'
import { getProviders } from './api'
import type { Provider } from './types'

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
          size="2"
          weight="medium"
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
          size="3"
          className={cn('text-gray-9', { 'text-gray-8': disabled })}
        >
          Select provider
        </Text>
      </Flex>
    )
  }

  return (
    <button className="cursor-pointer enabled:hover:bg-accent-2 disabled:cursor-not-allowed disabled:bg-gray-2">
      <Flex
        py="2"
        px="2"
        align="center"
        className={cn('rounded-item border border-gray-6', {
          'border-gray-5': disabled,
        })}
      >
        {content}
      </Flex>
    </button>
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
      fetchResults={getProviders}
      renderItem={renderItem}
      renderTrigger={renderTrigger}
      onChange={onChange}
    />
  )
}

export { ProviderSearchDropdown }
