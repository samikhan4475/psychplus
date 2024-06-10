'use client'

import { Dialog } from '@psychplus/ui/dialog'
import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { usePubsub } from '@psychplus/utils/event'
import { EDIT_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { EditTemplateForm } from './components'
import { Template } from '@psychplus/reports'

const EditTemplateWidgetClient = () => {
  const { open, data } = useDialog<Template>(EDIT_TEMPLATE_WIDGET)
  const { publish } = usePubsub()
  usePublishLoaded(EDIT_TEMPLATE_WIDGET)
  
  if (!data) {
    return
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${EDIT_TEMPLATE_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[800px]">
        <Dialog.Title className="mb-4 text-[20px]">Edit Template</Dialog.Title>
        <CloseDialogTrigger />
        <EditTemplateForm template={data} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditTemplateWidgetClient }
