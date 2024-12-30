import { ReactNode } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog, Flex, ScrollArea, Tooltip } from '@radix-ui/themes'
import { FileText } from 'lucide-react'

interface LabResultDialogProps {
  title?: string
  children: ReactNode
  onClose?: () => void
  isEditing?: boolean
}

const LabResultDialog = ({
  title,
  children,
  onClose,
}: LabResultDialogProps) => {
  return (
    <Dialog.Root>
      <Tooltip content="View Results" side="top" align="center">
        <Dialog.Trigger>
          <FileText width={16} height={16} color="black" />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content className="relative max-h-[80vh] max-w-[70vw] overflow-y-scroll">
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
        <ScrollArea>{children}</ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  )
}
export { LabResultDialog }
