'use client'

import { type Location } from '@psychplus/management-locations/types'
import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_MANAGEMENT_LOCATIONS_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { GooglePlacesContextProvider } from '@/providers'
import { ManagementLocationsDialogProps } from '.'
import { LocationForm } from './components'

const AddManagmentLocationsClient = ({
  googleApiKey,
}: ManagementLocationsDialogProps) => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<Location | undefined>(
    ADD_MANAGEMENT_LOCATIONS_WIDGET,
  )

  usePublishLoaded(ADD_MANAGEMENT_LOCATIONS_WIDGET)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${ADD_MANAGEMENT_LOCATIONS_WIDGET}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[662px] rounded-3 p-6">
        <Dialog.Title className="mb-[13px] text-[24px] text-[#151B4A]">
          {data ? 'Edit Location' : 'Add Location'}
        </Dialog.Title>
        <CloseDialogTrigger />
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          {open && <LocationForm data={data} />}
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddManagmentLocationsClient }
