'use client'

import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_MANAGEMENT_SERVICE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { GooglePlacesContextProvider } from '@/providers'
import { ManagementServiceDialogProps, type Service } from '.'
import { AddServiceForm } from './components'

const AddManagmentServiceClient = ({
  googleApiKey,
}: ManagementServiceDialogProps) => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<Service | undefined>(
    ADD_MANAGEMENT_SERVICE_WIDGET,
  )

  usePublishLoaded(ADD_MANAGEMENT_SERVICE_WIDGET)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${ADD_MANAGEMENT_SERVICE_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[662px] rounded-3 p-6">
        <Dialog.Title className="mb-2 text-[20px] leading-[36px] text-[#151B4A]">
          {data ? 'Edit Location' : 'Add Location'}
        </Dialog.Title>
        <CloseDialogTrigger />
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          {open && <AddServiceForm />}
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddManagmentServiceClient }
