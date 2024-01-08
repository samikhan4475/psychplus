'use client'

import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { CREATE_REFERRAL_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { CreateReferralForm } from './components'
import { useRefetchReferrals } from './hooks'

const CreateReferralWidgetClient = () => {
  const { publish } = usePubsub()
  const { open } = useDialog(CREATE_REFERRAL_WIDGET)
  usePublishLoaded(CREATE_REFERRAL_WIDGET)
  useRefetchReferrals()

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${CREATE_REFERRAL_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative">
        <Dialog.Title>Create Referral</Dialog.Title>
        <CloseDialogTrigger />
        {open && <CreateReferralForm />}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CreateReferralWidgetClient }
