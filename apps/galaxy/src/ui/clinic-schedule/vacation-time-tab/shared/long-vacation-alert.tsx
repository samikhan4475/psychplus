'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'

interface VacationAlertProps {
  confirm?: (confirm: boolean) => void
}

const LongVacationAlert = ({ confirm }: VacationAlertProps) => {
  return (
    <Dialog.Root
      open={confirm !== undefined}
      onOpenChange={(open) => {
        if (!open) {
          confirm?.(false)
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[550px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-3.5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Flex direction="column" gap="5">
          <Flex align="start" gap="2">
            <TriangleAlert className="text-pp-warning-border" size={24} />
            <Dialog.Title size="3" className="m-0 font-medium">
              Your vacation is longer than a week, are you sure you want to
              proceed?
            </Dialog.Title>
          </Flex>
          <Flex justify="start" width="100%" gap="4">
            <Button
              highContrast
              onClick={() => confirm?.(true)}
              className="bg-pp-link flex-1"
            >
              Yes
            </Button>
            <Button
              onClick={() => confirm?.(false)}
              className="border-pp-gray-2 text-pp-black-3 bg-white flex-1 cursor-pointer border border-solid"
            >
              No
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LongVacationAlert }
