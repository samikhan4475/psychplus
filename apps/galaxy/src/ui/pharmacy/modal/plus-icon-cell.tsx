import { useParams } from 'next/navigation'
import { PlusCircleIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { addPharmacyAction } from '../actions'

const PlusIconCell = ({ pharmacyId }: { pharmacyId: string }) => {
  const patientId = useParams().id as string
  const handleIconClick = async () => {
    const result = await addPharmacyAction(patientId, pharmacyId)

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to add pharmacy')
      return
    }

    toast.success('Successfully added')
  }

  return (
    <button onClick={handleIconClick} aria-label="Associate Pharmacy">
      <PlusCircleIcon stroke="#194595" strokeWidth="2" height="15" width="15" />
    </button>
  )
}

export { PlusIconCell }
