import { Flex, IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { InsuranceClaimPolicy } from '@/types'

interface ActionsCellProps {
  onEdit?: (item: InsuranceClaimPolicy) => void;
  item?: InsuranceClaimPolicy;
}

const ActionsCell = ({ onEdit, item }: ActionsCellProps) => {
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <IconButton
        variant="ghost"
        onClick={() => onEdit && item && onEdit(item)}
      >
        <TableEditIcon height={18} />
      </IconButton>
    </Flex>
  );
};

export { ActionsCell };