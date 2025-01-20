'use client'

import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useHasPermission } from '@/hooks'
import { deletePharmacyAction } from './actions/delete-pharmacy'
import { useStore } from './store'

const TrashButton = ({
  pharmacyId,
  patientId,
}: {
  pharmacyId: string
  patientId: string
}) => {
  const { fetchPatientPharmacies, setIsErrorAlertOpen, setErrorMessage } =
    useStore((state) => ({
      fetchPatientPharmacies: state.fetchPatientPharmacies,
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    }))

  const deletePharmacyPermission = useHasPermission('deletePharmacy')

  const onClick = async () => {
    if (!deletePharmacyPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to delete pharmacy. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    const result = await deletePharmacyAction(pharmacyId, patientId)

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to delete pharmacy')
      return
    }
    fetchPatientPharmacies(patientId)
    toast.success('Successfully deleted')
  }
  return (
    <IconButton
      variant="ghost"
      color="gray"
      size="1"
      type="button"
      onClick={onClick}
    >
      <Trash2 size={16} />
    </IconButton>
  )
}

export { TrashButton }
