import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { type ClaimStatus } from '../../types'

const ClaimStatusRowActionEdit = ({
  row: { original: claimStatus },
}: PropsWithRow<ClaimStatus>) => {
  const setClaimStatusForEdit = useStore((state) => state.setClaimStatusForEdit)

  return (
    <DropdownMenu.Item
      onClick={() => {
        setClaimStatusForEdit(claimStatus)
      }}
    >
      Edit
    </DropdownMenu.Item>
  )
}

export { ClaimStatusRowActionEdit }
