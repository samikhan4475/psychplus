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
    <FormFieldContainer className="!sticky top-0 z-[11] -mb-10 ml-28 h-10 w-fit flex-row items-center gap-2">
      <FormFieldLabel className="text-pp-black-3 !text-2">
        Lock page for user
      </FormFieldLabel>
      <Text size="1" as="label">
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
