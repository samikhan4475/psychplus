import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DeleteIcon } from '@/components/icons'
import { PayerPlanAddress } from '@/types/payer'
import { PayerPlanAddressDialog } from './payer-plan-address-dialog'

interface ActionsCellProps {
  row: Row<PayerPlanAddress>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return (
    <Flex gap="1" align="center" justify="start" className="flex-1">
      <PayerPlanAddressDialog isEditMode={true} data={row.original} />

      <IconButton variant="ghost" className="text-pp-gray-1">
        <DeleteIcon height={18} />
      </IconButton>
      <IconButton variant="ghost" className="text-pp-gray-1">
        <CounterClockwiseClockIcon />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
