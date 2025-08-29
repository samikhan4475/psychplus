'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { FormSubmitButton } from '../form'
import { useToggleableFormContext } from './context'

interface SaveButtonProps {
  className?: string
  showIcon?: boolean
  title?: string
}

const SaveButton = ({
  className,
  showIcon = true,
  title = 'Save',
}: SaveButtonProps) => {
  const { disabled } = useToggleableFormContext()
  return (
    <FormSubmitButton
      size={{ initial: '2', sm: '3' }}
      disabled={disabled}
      highContrast
      variant="outline"
      className={cn(className)}
    >
      <Flex align="center" gap="2" px="1">
        {showIcon && <SaveIcon width={12} height={12} />}
        <Text weight="regular" size={{ initial: '1', sm: '2' }}>
          {title}
        </Text>
      </Flex>
    </FormSubmitButton>
  )
}

export { SaveButton }
