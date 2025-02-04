'use client'

import { PropsWithChildren, useState } from 'react'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cn } from '@/utils'

type FillOutButtonProps = PropsWithChildren<{
  title?: string
  className?: string
  onClose?: () => void
}>

const WidgetAddButtonUnauthrized = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="1"
        color="gray"
        className="text-black"
      >
        <Flex justify="between" align="center" gap="1">
          <PlusIcon height={16} width={16} />
          <Text>Add</Text>
        </Flex>
      </Button>

      <PermissionAlert
        message="You do not have permission to add diagnosis. Please contact your supervisor if you need any further assistance"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

const WidgetAddButton = ({
  title,
  children,
  className,
  onClose,
}: FillOutButtonProps) => {
  const hasPermission = useHasPermission('addDiagnosisWorkingDiagnosisTab')

  if (!hasPermission) {
    return <WidgetAddButtonUnauthrized />
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          <Flex justify="between" align="center" gap="1">
            <PlusIcon height={16} width={16} />
            <Text>Add</Text>
          </Flex>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        className={cn(
          'relative max-h-[80vh] max-w-[70vw] overflow-y-scroll',
          className,
        )}
      >
        <Flex justify="between" align="center" mb="2">
          <Dialog.Title
            size="5"
            weight="bold"
            className="text-black m-0 font-sans"
          >
            {title}
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer" onClick={onClose}>
            <Cross2Icon />
          </Dialog.Close>
        </Flex>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { WidgetAddButton }
