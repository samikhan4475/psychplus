import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../store'
import { type ClaimStatus } from '../types'

const ClaimStatusRowActionActivate = ({
  row: { original: claimStatus },
}: PropsWithRow<ClaimStatus>) => {
  const addClaimStatusDiff = useStore((state) => state.addClaimStatusDiff)

  const activateClaimStatus = async () => {
    // TODO: api to activate
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    addClaimStatusDiff({
      id: claimStatus.id,
      isActive: true,
    })
  }

  const deactivateClaimStatus = async () => {
    // TODO: api to deactivate
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    addClaimStatusDiff({
      id: claimStatus.id,
      isActive: false,
    })
  }

  return (
    <>
      <DropdownMenu.Separator />
      {claimStatus.isActive ? (
        <DropdownMenu.Item onClick={deactivateClaimStatus} color="red">
          Deactivate
        </DropdownMenu.Item>
      ) : (
        <DropdownMenu.Item onClick={activateClaimStatus} color="green">
          Activate
        </DropdownMenu.Item>
      )}
    </>
  )
}

export { ClaimStatusRowActionActivate }
