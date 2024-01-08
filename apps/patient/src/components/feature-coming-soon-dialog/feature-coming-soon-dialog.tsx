'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@psychplus/ui/dialog'

interface FeatureComingSoonDialogProps {
  isDialogOpen: boolean
  toggleDialog: () => void
}

const FeatureComingSoonDialog: React.FC<FeatureComingSoonDialogProps> = ({
  isDialogOpen,
  toggleDialog,
}) => {
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={toggleDialog}>
      <Dialog.Content className="relative flex h-40 max-w-[450px] items-center justify-center font-bold">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title>This Feature is Coming Soon</Dialog.Title>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { FeatureComingSoonDialog }
