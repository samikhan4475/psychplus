import React from 'react'
import { Checkbox } from '@psychplus/ui/checkbox'
import { useStore } from '../../store'
import { type Claim } from '../../types'

interface HeaderCheckboxProp {
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const TableHeaderCheckbox = ({
  checked,
  onCheckedChange,
}: HeaderCheckboxProp) => {
  const claimList = useStore((state) => state.claimList)
  const claimSubmissionData = useStore((state) => state.claimSubmissionData)
  const { setClaimSubmissionData } = useStore((state) => ({
    setClaimSubmissionData: state.setClaimSubmissionData,
  }))

  const toggleSelected = async (value: boolean) => {
    onCheckedChange(value)
    const selectedClaims = value ? claimList.map((obj: Claim) => obj.id) : []
    setClaimSubmissionData({ ...claimSubmissionData, selectedClaims })
  }

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => toggleSelected(!!value)}
      aria-label="Select all"
    />
  )
}

export { TableHeaderCheckbox }
