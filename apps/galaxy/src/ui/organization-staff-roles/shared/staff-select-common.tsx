'use client'

import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ActionResult } from '@/api'
import { DropdownMenuSearch, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'

interface StaffOptions extends SelectOptionType {
  id?: string
}

interface StaffSelectCommonProps {
  onChange: (value: StaffOptions) => void
  fetchOptions: (value: string) => Promise<ActionResult<StaffOptions[]>>
}

const StaffSelectCommon = ({
  onChange,
  fetchOptions,
}: StaffSelectCommonProps) => {
  const renderProvider = (provider: StaffOptions, disabled?: boolean) => {
    return (
      <Flex align="center" gap="3">
        <Text
          size="1"
          weight="medium"
          color="gray"
          className={cn({ 'text-gray-8': disabled })}
        >
          {provider.label}
        </Text>
      </Flex>
    )
  }

  const renderItem = (provider: StaffOptions) => {
    return (
      <Box py="2" px="2" className="hover:bg-accent-2">
        {renderProvider(provider)}
      </Box>
    )
  }

  const renderTrigger = (provider?: StaffOptions, disabled?: boolean) => {
    let content = null

    if (provider) {
      content = renderProvider(provider, disabled)
    } else {
      content = (
        <Flex gap="2" align="center">
          <Text
            size="2"
            className={cn('text-gray-9', { 'text-gray-8': disabled })}
          >
            Select staff
          </Text>
        </Flex>
      )
    }

    return (
      <Button
        variant="ghost"
        type="button"
        className="border-pp-gray-2 h-4 !w-[200px] w-full border border-solid !outline-none [box-shadow:none]"
      >
        <Flex p="1" align="center" width="100%">
          {content}
        </Flex>
      </Button>
    )
  }

  return (
    <Flex className="flex-row items-center gap-1">
      <FormFieldLabel className="mr-3 !text-1">Staff</FormFieldLabel>
      <DropdownMenuSearch
        placeholder="Search staff"
        fetchResults={fetchOptions}
        renderItem={renderItem}
        renderTrigger={renderTrigger}
        onChange={onChange}
        initialFetchAll
      />
    </Flex>
  )
}

export { StaffSelectCommon }
