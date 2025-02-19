'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'

interface NegativeVacationAlert {
  alertOpen: boolean
  onClose: () => void
}
const NegativeVacationAlert = ({
  alertOpen,
  onClose,
}: NegativeVacationAlert) => {
  return (
    <Dialog.Root open={alertOpen} onOpenChange={onClose}>
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[500px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Flex direction="column" gap="5">
          <Flex align="end" gap="2">
            <TriangleAlert className=" text-pp-warning-border" size={24} />
            <Dialog.Title size="3" className=" m-0 font-medium">
              Start Time must be greater than End Time
            </Dialog.Title>
          </Flex>
          <Button
            size="2"
            className="bg-pp-link-text text-white w-full cursor-pointer"
            onClick={onClose}
          >
            OK
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { NegativeVacationAlert }
