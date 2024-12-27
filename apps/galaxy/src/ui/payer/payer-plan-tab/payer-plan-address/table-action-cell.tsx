import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { DeleteIcon } from '@/components/icons'
import { PayerPlanAddressResponse } from '@/types'
import { deletePayerPlanAddressRecord } from '../../actions'
import { useStore } from '../store'
import { PayerPlanAddressDialog } from './payer-plan-address-dialog'

interface ActionsCellProps {
  row: Row<PayerPlanAddressResponse>
  payerId: string
}

const ActionsCell = ({ row, payerId }: ActionsCellProps) => {
  const { searchAddress } = useStore((state) => ({
    searchAddress: state.searchAddress,
    addressData: state.addressData,
  }))

  const handleDeletePayerPlanAddress = async () => {
    const { id } = row.original
    const result = await deletePayerPlanAddressRecord(payerId, id)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete Payer Plan address')
    } else if (result.state === 'success') {
      toast.success('Payer Plan address deleted successfully')
      searchAddress(payerId)
    }
  }

  return (
    <Flex gap="1" align="center" justify="start" className="flex-1">
      <PayerPlanAddressDialog
        isEditMode={true}
        data={row.original}
        payerId={payerId}
      />

      <IconButton
        variant="ghost"
        className="text-pp-gray-1"
        type="button"
        onClick={handleDeletePayerPlanAddress}
      >
        <DeleteIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
