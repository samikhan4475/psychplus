import { Text } from '@radix-ui/themes'
import { CellContext } from '@tanstack/react-table'
import { cn } from '@psychplus/ui/cn'
import { useStore } from '../../store'
import { Claim } from '../../types'

interface TableCellProps {
  row: CellContext<Claim, Date | undefined>['row']
  maxWidth?: number
}

const TableCellClaimIdText = ({ row, maxWidth }: TableCellProps) => {
  const { id, claimNumber } = row.original

  const { addTab } = useStore((state) => ({
    addTab: state.addTab,
  }))

  const handleClaimIdClick = (
    claimId: string | undefined,
    claimNumber: string,
  ) => {
    const tab = {
      id: `claimsid#${claimId}`,
      label: `Claim#${claimNumber}`,
      claimId: claimId,
      claimNumber: claimNumber,
    }
    addTab(tab)
  }

  return (
    <Text
      size="1"
      className={cn('block overflow-hidden text-ellipsis whitespace-nowrap', {
        maxWidth: `${maxWidth}px`,
      })}
      onClick={() => handleClaimIdClick(id, claimNumber)}
    >
      {claimNumber}
    </Text>
  )
}

export { TableCellClaimIdText }
