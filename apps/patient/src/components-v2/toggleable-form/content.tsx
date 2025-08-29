'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import { CancelButton } from './cancel-button'
import { useToggleableFormContext } from './context'
import { ErrorMessage } from './error-message'
import { SaveButton } from './save-button'

interface ContentProps {
  className?: string
  showButtons?: boolean
  isCall?: boolean
  isCreditCard?: boolean
}

const Content = ({
  className,
  children,
  showButtons = true,
  isCall = false,
  isCreditCard = false,
}: React.PropsWithChildren<ContentProps>) => {
  const { open, isEdit, allowExternalSave } = useToggleableFormContext()

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
      {showButtons && isEdit && !allowExternalSave && (
        <Flex gap="2" className={cn(isCall && 'w-full')}>
          <SaveButton
            showIcon={!isCall}
            className={cn(isCall && 'bg-pp-blue-3 text-white w-full flex-1')}
            title={isCreditCard && isCall ? 'Submit Payment Details' : 'Save'}
          />
          {!isCall && <CancelButton />}
        </Flex>
      )}
    </Flex>
  )
}

export { Content }
