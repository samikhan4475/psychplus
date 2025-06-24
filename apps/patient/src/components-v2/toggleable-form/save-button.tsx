'use client'

import { Flex, Text } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { FormSubmitButton } from '../form'
import { useToggleableFormContext } from './context'

const SaveButton = () => {
  const { disabled } = useToggleableFormContext()
  return (
    <FormSubmitButton
      size={{ initial: '2', sm: '3' }}
      disabled={disabled}
      highContrast
      variant="outline"
    >
      <Flex align="center" gap="2" px="1">
        <SaveIcon height={12} width={12} />
        <Text weight="regular" size={{ initial: '1', sm: '2' }}>
          Save
        </Text>
      </Flex>
    </FormSubmitButton>
  )
}

export { SaveButton }
