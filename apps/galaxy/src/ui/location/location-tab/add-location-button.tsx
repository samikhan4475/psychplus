'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { AddIcon } from '@/components/icons'
import { LocationDialog } from './location-dialog'
import { useStore } from './store'

interface AddLocationButtonProps {
  googleApiKey: string
}
const AddLocationButton = ({ googleApiKey }: AddLocationButtonProps) => {
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))

  return (
    <LocationDialog
      title="Add Location"
      onUpdate={refetch}
      googleApiKey={googleApiKey}
    >
      <Dialog.Trigger>
        <Button size="1" type="button" highContrast>
          <AddIcon />
          Add Location
        </Button>
      </Dialog.Trigger>
    </LocationDialog>
  )
}

export { AddLocationButton }
