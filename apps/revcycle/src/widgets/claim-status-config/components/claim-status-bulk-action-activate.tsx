import { type PropsWithRows } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../store'
import { type ClaimStatus } from '../types'

const ClaimStatusBulkActionActivate = ({
  rows,
}: PropsWithRows<ClaimStatus>) => {
  const addClaimStatusDiff = useStore((state) => state.addClaimStatusDiff)

  const activateClaimStatuses = async () => {
    // TODO: api to activate
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

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
