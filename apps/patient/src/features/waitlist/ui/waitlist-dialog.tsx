import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogIcon, FormError } from '@/components-v2'
import { Waitlist } from '../types'
import { WaitlistForm } from './waitlist-form'

interface WaitlistDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Waitlist
}

const WaitlistDialog = ({ open, setOpen, data }: WaitlistDialogProps) => {
  const [error, setError] = useState<string>()

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setError('')
        setOpen(open)
      }}
    >
      <Dialog.Content className="relative max-w-[850px]">
        <CloseDialogIcon />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Update Waitlist' : 'Add Waitlist'}
        </Dialog.Title>
        <FormError message={error} />

        <WaitlistForm data={data} setOpen={setOpen} setError={setError} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { WaitlistDialog }
