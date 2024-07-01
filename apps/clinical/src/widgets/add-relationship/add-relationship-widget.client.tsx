'use client'

import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { AddRelationshipForm } from './components'

const AddRelationshipWidgetClient = () => {
  const { publish } = usePubsub()
  const { open } = useDialog(ADD_RELATIONSHIP_WIDGET)
  usePublishLoaded(ADD_RELATIONSHIP_WIDGET)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative min-w-[750px]">
        <Dialog.Title className='text-[24px] text-[#151B4A] mb-[13px]'>Add Relationship</Dialog.Title>
        <CloseDialogTrigger />
        {open && <AddRelationshipForm />}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddRelationshipWidgetClient }
