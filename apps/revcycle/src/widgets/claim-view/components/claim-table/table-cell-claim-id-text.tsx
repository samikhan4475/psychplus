import { Box, Text } from '@radix-ui/themes'
import { CellContext } from '@tanstack/react-table'
import { cn } from '@psychplus/ui/cn'
import { useStore } from '../../store'
import { Claim } from '../../types'
import { ClaimActionIcon } from './claim-action-icon'

interface TableCellProps {
  row: CellContext<Claim, Date | undefined>['row']
  maxWidth?: number
}

const TableCellClaimIdText = ({ row, maxWidth }: TableCellProps) => {
  const { id, claimNumber, isSystemRejected } = row.original

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
    <Box className="inline-flex">
      <Text
        size="1"
        className={cn('block overflow-hidden text-ellipsis whitespace-nowrap', {
          maxWidth: `${maxWidth}px`,
        })}
        onClick={() => handleClaimIdClick(id, claimNumber)}
      >
        {claimNumber}
      </Text>

      {isSystemRejected && <ClaimActionIcon claimId={id} />}
    </Box>
  )
}

export { TableCellClaimIdText }
