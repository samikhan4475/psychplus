'use client'

import { PropsWithChildren, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { Location } from '@/types'
import { LocationForm } from './location-form'

interface LocationDialogProps {
  googleApiKey: string
  title: string
  isEditable?: boolean
  location?: Location
  onUpdate?: (updatedRecord: Location) => void
}

const LocationDialog = ({
  googleApiKey,
  title,
  isEditable,
  location,
  onUpdate,
  children,
}: PropsWithChildren<LocationDialogProps>) => {
  const [open, setOpen] = useState(false)
  const onToggle = (open: boolean) => setOpen(open)
  return (
    <Dialog.Root open={open} onOpenChange={onToggle}>
      {children}
      <Dialog.Content className="relative max-w-[662px] overflow-visible">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>{title}</Dialog.Title>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <LocationForm
            location={location}
            isEditable={isEditable}
            onClose={(res) => {
              onToggle(false)
              res && onUpdate?.(res)
            }}
          />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LocationDialog }
