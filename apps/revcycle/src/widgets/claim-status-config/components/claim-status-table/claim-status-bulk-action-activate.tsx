import { type PropsWithRows } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { type ClaimStatus } from '../../types'
import { toggleActivateClaimStatus } from '../../utils'

const ClaimStatusBulkActionActivate = ({
  rows,
}: PropsWithRows<ClaimStatus>) => {
  const addClaimStatusDiff = useStore((state) => state.addClaimStatusDiff)

  const activateClaimStatuses = async () => {
    for (const row of rows) {
      await toggleActivateClaimStatus({ ...row.original, isActive: true })
    }

    addClaimStatusDiff(
      ...rows.map((row) => ({
        id: row.original.id,
        isActive: true,
      })),
    )
  }

  return (
    <DropdownMenu.Item onClick={activateClaimStatuses}>
      Activate
    </DropdownMenu.Item>
  )
}

export { ClaimStatusBulkActionActivate }
