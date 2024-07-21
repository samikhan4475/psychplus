'use client'

import type { PatientRelationship } from '@psychplus/patient'
import { CloseDialogTrigger } from '@psychplus/ui/close-dialog-trigger'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { GooglePlacesContextProvider } from '@/providers'
import { AddRelationshipForm } from './components'

interface AddRelationshipProps {
  googleApiKey: string
}

const AddRelationshipWidgetClient = ({googleApiKey}: AddRelationshipProps) => {
  const { publish } = usePubsub()
  const { open, data } = useDialog<PatientRelationship | undefined>(
    ADD_RELATIONSHIP_WIDGET,
  )
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
        <Dialog.Title className="mb-[13px] text-[24px] text-[#151B4A]">
          {data ? 'Edit Relationship' : 'Add Relationship'}
        </Dialog.Title>
        <CloseDialogTrigger />
        <GooglePlacesContextProvider
          apiKey={googleApiKey}
        >
          {open && <AddRelationshipForm data={data} />}
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddRelationshipWidgetClient }
