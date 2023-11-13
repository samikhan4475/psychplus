import { type PropsWithRows } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../store'
import { type ClaimStatus } from '../types'

const ClaimStatusBulkActionDeactivate = ({
  rows,
}: PropsWithRows<ClaimStatus>) => {
  const addClaimStatusDiff = useStore((state) => state.addClaimStatusDiff)

  const deactivateClaimStatuses = async () => {
    // TODO: api to activate
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    addClaimStatusDiff(
      ...rows.map((row) => ({
        id: row.original.id,
        isActive: false,
      })),
    )
  }

  return (
    <DropdownMenu.Item onClick={deactivateClaimStatuses}>
      Deactivate
    </DropdownMenu.Item>
  )
}

export { ClaimStatusBulkActionDeactivate }
