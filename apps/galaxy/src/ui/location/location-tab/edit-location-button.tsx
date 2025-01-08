import React from 'react'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { EditUnderlinedIcon } from '@/components/icons'
import { Location } from '@/types'
import { LocationDialog } from './location-dialog'
import { useStore } from './store'

interface EditLocationButtonProps {
  googleApiKey: string
  location: Location
}
const EditLocationButton = ({
  googleApiKey,
  location,
}: EditLocationButtonProps) => {
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  return (
    <LocationDialog
      title="Edit Location"
      onUpdate={refetch}
      googleApiKey={googleApiKey}
      location={location}
      isEditable
    >
      <Tooltip content="Edit">
        <Dialog.Trigger>
          <IconButton
            variant="ghost"
            size="1"
            className="m-0"
            color="gray"
            highContrast
          >
            <EditUnderlinedIcon />
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>
    </LocationDialog>
  )
}

export { EditLocationButton }
