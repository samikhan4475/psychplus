'use client'

import { Flex, Switch, Text } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { useStore } from './store'

const LockPageSwitch = () => {
  const { isUserLocked, toggleUserLock } = useStore((state) => ({
    isUserLocked: state.isUserLocked,
    toggleUserLock: state.toggleUserLock,
  }))

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="text-pp-black-3 !text-2">
        Lock page for user
      </FormFieldLabel>
      <Text as="label" size="1">
        <Flex align="center" gap="1">
          <Switch
            size="1"
            color="green"
            checked={isUserLocked}
            onCheckedChange={toggleUserLock}
          />
          {isUserLocked ? 'Yes' : 'No'}
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export { LockPageSwitch }
