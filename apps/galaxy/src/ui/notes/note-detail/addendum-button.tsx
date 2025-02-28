'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from '../store'

interface AddendumButtonProps {
  onClick: () => void
}
const AddendumButton = ({ onClick }: AddendumButtonProps) => {
  const { staffId } = useGlobalStore((state) => state.user)
  const { selectedRow, appointment, setErrorMessage, setIsErrorAlertOpen } =
    useStore((state) => ({
      selectedRow: state.selectedRow,
      appointment: state.appointment,
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
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
      setErrorMessage('Please select note to click this button')
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
    onClick()
  }

  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      onClick={handleClick}
      disabled={!selectedRow}
    >
      <PlusIcon className="text-pp-gray-3" width={16} height={16} />
      Addendum
    </Button>
  )
}

export { AddendumButton }
