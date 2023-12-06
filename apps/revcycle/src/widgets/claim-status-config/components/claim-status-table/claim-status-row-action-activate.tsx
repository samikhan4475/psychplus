import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { type ClaimStatus } from '../../types'
import { toggleActivateClaimStatus } from '../../utils'

const ClaimStatusRowActionActivate = ({
  row: { original: claimStatus },
}: PropsWithRow<ClaimStatus>) => {
  const { addClaimStatusDiff, setClaimStatusesForDeactivation } = useStore(
    (state) => ({
      addClaimStatusDiff: state.addClaimStatusDiff,
      setClaimStatusesForDeactivation: state.setClaimStatusesForDeactivation,
    }),
  )

  const activateClaimStatus = async () => {
    await toggleActivateClaimStatus({ ...claimStatus, isActive: true })

    addClaimStatusDiff({
      id: claimStatus.id,
      isActive: true,
    })
  }

  const deactivateClaimStatus = async () => {
    setClaimStatusesForDeactivation([claimStatus])
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
