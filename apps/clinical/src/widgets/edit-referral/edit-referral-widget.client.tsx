'use client'

import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_REFERRAL_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { EditReferralForm } from './components'
import type { Referral } from './types'

const EditReferralWidgetClient = () => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<Referral>(EDIT_REFERRAL_WIDGET)
  usePublishLoaded(EDIT_REFERRAL_WIDGET)

  if (!data) {
    return
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          publish(`${EDIT_REFERRAL_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative">
        <Dialog.Title>Edit Referral</Dialog.Title>
        <CloseDialogTrigger />
        <EditReferralForm referral={data} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditReferralWidgetClient }
