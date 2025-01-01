'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { AddendumDialog } from './addendum-dialog'
import { useCosignDialog } from './hooks'
import { useStore } from './store'

const NotesAddendumButton = () => {
  const { staffId } = useGlobalStore((state) => state.user)
  const { isOpen, closeDialog, openDialog } = useCosignDialog()

  const { selectedRow, appointment, setErrorMessage, setIsErrorAlertOpen } =
    useStore((state) => ({
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
      selectedRow: state.selectedRow,
      appointment: state.appointment,
    }))

  const createAddendumNotProviderPermission = useHasPermission(
    'createAddendumNotProviderNotesPage',
  )

  const createAddendumProviderPermission = useHasPermission(
    'createAddendumProviderNotesPage',
  )

  const handleClick = () => {
    if (!selectedRow) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select one note to click this button')
      return
    }

    const hasPermissionToCreateAddendumProviderPermission =
      appointment?.providerStaffId === staffId &&
      createAddendumProviderPermission

    const hasPermissionToCreateAddendumPermission =
      hasPermissionToCreateAddendumProviderPermission
        ? true
        : !!createAddendumNotProviderPermission

    if (!hasPermissionToCreateAddendumPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Create Addendum. Please contact your supervisor if you need any further assistance.',
      )
      return
    }
    openDialog()
  }

  return (
    <>
      <Button
        variant="outline"
        color="gray"
        size="1"
        className="text-black"
        onClick={handleClick}
      >
        <PlusIcon className="text-pp-gray-3" width={16} height={16} />
        Addendum
      </Button>
      {isOpen && <AddendumDialog isOpen={isOpen} closeDialog={closeDialog} />}
    </>
  )
}

export { NotesAddendumButton }
