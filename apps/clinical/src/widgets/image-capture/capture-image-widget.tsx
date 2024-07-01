'use client'

import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { CAPTURE_IMAGE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { CaptureImageDialog } from './components'

const CaptureImageWidgetClient = () => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<string>(CAPTURE_IMAGE_WIDGET)
  usePublishLoaded(CAPTURE_IMAGE_WIDGET)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${CAPTURE_IMAGE_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative min-w-[750px]">
        <CloseDialogTrigger />
        {open && <CaptureImageDialog imageEvent={data} />}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CaptureImageWidgetClient }
