'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import { CancelButton } from './cancel-button'
import { useToggleableFormContext } from './context'
import { ErrorMessage } from './error-message'
import { SaveButton } from './save-button'

interface ContentProps {
  className?: string
}

const Content = ({
  className,
  children,
}: React.PropsWithChildren<ContentProps>) => {
  const { open, isEdit } = useToggleableFormContext()

  if (!open) {
    return null
  }

  return (
    <Flex
      direction="column"
      gap="3"
      align="start"
      className={cn('pl-[1px]', className)}
    >
      {children}
      <ErrorMessage />
      {isEdit && (
        <Flex gap="2">
          <SaveButton />
          <CancelButton />
        </Flex>
      )}
    </Flex>
  )
}

export { Content }
