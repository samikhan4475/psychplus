'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { useConstants } from '@/hooks/use-constants'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { NewPatient } from '@/types'
import { AddPatientForm } from './components'

const AddPatient = ({
  onPatientAdd = () => null,
  children,
}: PropsWithChildren<{
  onPatientAdd?: (data: NewPatient) => void
}>) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { googleApiKey } = useConstants()

  return (
    <Dialog.Root
      open={isOpenDialog}
      onOpenChange={(open) => {
        setIsOpenDialog(open)
      }}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add User
        </Dialog.Title>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <AddPatientForm
            onPatientAdd={(data: NewPatient) => {
              onPatientAdd(data)
              setIsOpenDialog(false)
            }}
          />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddPatient }
