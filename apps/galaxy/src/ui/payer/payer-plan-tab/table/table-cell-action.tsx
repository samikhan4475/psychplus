import { Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { DeleteIcon } from '@/components/icons'
import { PayerPlanResponse } from '@/types'
import { deletePayerPlanRecord } from '../../actions'
import { useStore } from '../../store'
import { useStore as useSearchStore } from '../store'

interface ActionsCellProps {
  row: Row<PayerPlanResponse>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { setActiveTab, setSelectedPayerPlan } = useStore((state) => ({
    setActiveTab: state.setActiveTab,
    setSelectedPayerPlan: state.setSelectedPayerPlan,
  }))
  const { search, payload, page } = useSearchStore((state) => ({
    search: state.search,
    payload: state.payload,
    page: state.page,
  }))
  const handlePayerPlanEdit = () => {
    setActiveTab('Plan# ' + row.original.name)
    setSelectedPayerPlan(row.original.id)
  }

  const handleDeletePayerPlan = async () => {
    const { id, payerId } = row.original
    const result = await deletePayerPlanRecord(payerId, id)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete Payer Plan')
    } else if (result.state === 'success') {
      toast.success('Payer Plan deleted successfully')
      search(payload, page)
    }
  }

  return (
    <Flex gap="1" align="center" justify="start" className="flex-1">
      <IconButton variant="ghost" onClick={handlePayerPlanEdit}>
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
      <IconButton
        variant="ghost"
        className="text-pp-gray-1"
        onClick={handleDeletePayerPlan}
      >
        <DeleteIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
