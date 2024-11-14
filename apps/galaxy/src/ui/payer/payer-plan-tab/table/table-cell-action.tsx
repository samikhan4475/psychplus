import { Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DeleteIcon } from '@/components/icons'
import { PayerPlan } from '@/types/payer'
import { useStore } from '../../store'

interface ActionsCellProps {
  row: Row<PayerPlan>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const { setActiveTab } = useStore((state) => ({
    setActiveTab: state.setActiveTab,
  }))

  const handlePayerPlanEdit = () => {
    setActiveTab('Plan# ' + row.original.name)
  }
  return (
    <Flex gap="1" align="center" justify="start" className="flex-1">
      <IconButton variant="ghost" onClick={handlePayerPlanEdit}>
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
      <IconButton variant="ghost" className="text-pp-gray-1">
        <DeleteIcon height={18} />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
