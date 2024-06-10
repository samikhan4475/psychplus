'use client'

import { Dialog } from '@psychplus/ui/dialog'
import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { AddTemplateForm } from './components'

const AddTemplateWidgetClient = () => {
  const { open } = useDialog(ADD_TEMPLATE_WIDGET)
  const { publish } = usePubsub()
  usePublishLoaded(ADD_TEMPLATE_WIDGET)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${ADD_TEMPLATE_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[800px]">
        <Dialog.Title className="mb-4 text-[20px]">
          Add New Template
        </Dialog.Title>
        <CloseDialogTrigger />
        <AddTemplateForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddTemplateWidgetClient }
