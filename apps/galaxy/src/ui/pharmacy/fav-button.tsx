'use client'

import { IconButton } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useHasPermission } from '@/hooks'
import { addFavoritePharmacyAction } from './actions'
import { useStore } from './store'

const FavButton = ({
  pharmacyId,
  isFavorite,
  patientId,
}: {
  patientId: string
  pharmacyId: string
  isFavorite: boolean
}) => {
  const { fetchPatientPharmacies, setIsErrorAlertOpen, setErrorMessage } =
    useStore((state) => ({
      fetchPatientPharmacies: state.fetchPatientPharmacies,
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    }))

  const starPharmacyPermission = useHasPermission('starPharmacy')

  const onClick = async () => {
    if (!starPharmacyPermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to mark favorite pharmacy. Please contact your supervisor if you need any further assistance.',
      )
      return
    }

    const result = await addFavoritePharmacyAction(pharmacyId, patientId)

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to add favorite pharmacy')
      return
    }
    fetchPatientPharmacies(patientId)
    toast.success('Successfully added favorite')
  }
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      type="button"
      onClick={onClick}
    >
      <StarIcon
        stroke={isFavorite ? '#A0B6DC' : '#0F6CBD'}
        {...(isFavorite ? { fill: '#A0B6DC' } : {})}
        strokeWidth="1"
        cursor="pointer"
        height="15"
        width="15"
      />
    </IconButton>
  )
}

export { FavButton }
