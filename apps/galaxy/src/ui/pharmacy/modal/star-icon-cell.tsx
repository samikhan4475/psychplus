import { useParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { addFavoritePharmacyAction } from '../actions'

const StarIconCell = ({ pharmacyId }: { pharmacyId: string }) => {
  const patientId = useParams().id as string
  if (!pharmacyId) {
    return
  }

  const handleIconClick = async () => {
    const result = await addFavoritePharmacyAction(pharmacyId, patientId)

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to add favorite pharmacy')
      return
    }

    toast.success('Successfully added favorite')
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      type="button"
      onClick={handleIconClick}
    >
      <StarIcon
        strokeWidth="1"
        cursor="pointer"
        height="15"
        width="15"
        stroke={'#0F6CBD'}
      />
    </IconButton>
  )
}

export { StarIconCell }
