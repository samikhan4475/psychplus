import { type PropsWithRows } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { type ClaimStatus } from '../../types'

const ClaimStatusBulkActionDeactivate = ({
  rows,
}: PropsWithRows<ClaimStatus>) => {
  const setClaimStatusesForDeactivation = useStore(
    (state) => state.setClaimStatusesForDeactivation,
  )

  const deactivateClaimStatuses = async () => {
    setClaimStatusesForDeactivation(rows.map((row) => row.original))
  }

  return (
    <DropdownMenu.Item onClick={deactivateClaimStatuses}>
      Deactivate
    </DropdownMenu.Item>
  )
}

export { ClaimStatusBulkActionDeactivate }
