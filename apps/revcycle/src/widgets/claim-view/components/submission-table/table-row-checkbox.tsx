import React from 'react'
import { Checkbox } from '@psychplus/ui/checkbox'
import { useStore } from '../../store'

interface RowCheckboxProp {
  claimId: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const TableRowCheckbox = ({
  claimId,
  checked,
  onCheckedChange,
}: RowCheckboxProp) => {
  const claimSubmissionData = useStore((state) => state.claimSubmissionData)
  const { setClaimSubmissionData } = useStore((state) => ({
    setClaimSubmissionData: state.setClaimSubmissionData,
  }))

  const toggleSelected = async (value: boolean) => {
    onCheckedChange(value)
    const selectedClaims = value
      ? [...claimSubmissionData.selectedClaims, claimId]
      : claimSubmissionData.selectedClaims.filter((id) => id !== claimId)
    setClaimSubmissionData({ ...claimSubmissionData, selectedClaims })
  }

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => toggleSelected(!!value)}
      aria-label="Select row"
    />
  )
}

export { TableRowCheckbox }
