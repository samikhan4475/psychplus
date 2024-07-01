'use client'

import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { ENLARGE_IMAGE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { EnlargeImageDialog } from './components'

const EnlargeImageWidgetClient = () => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<string>(ENLARGE_IMAGE_WIDGET)
  usePublishLoaded(ENLARGE_IMAGE_WIDGET)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${ENLARGE_IMAGE_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative min-w-[750px] justify-center">
        {open && <EnlargeImageDialog previewSrc={data} />}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EnlargeImageWidgetClient }
