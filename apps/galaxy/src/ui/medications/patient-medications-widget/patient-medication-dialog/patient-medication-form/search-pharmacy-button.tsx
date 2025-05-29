'use client'

import { Button } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { AsyncAutoCompleteTextField } from '@/components'
import { SelectOptionType } from '@/types'
import { searchPharmacies } from '../../actions'

interface SearchPharmacyButtonProps {
  onSelect: (option: SelectOptionType) => void
  disabled: boolean
}
const SearchPharmacyButton = ({
  onSelect,
  disabled,
}: SearchPharmacyButtonProps) => {
  return (
    <AsyncAutoCompleteTextField
      fetchDataAction={searchPharmacies}
      field="pharmacyId"
      placeholder="Search"
      valueKey="value"
      truncateText={25}
      onSelect={onSelect}
      disabled={disabled}
    >
      <Button
        size="1"
        highContrast
        type="button"
        className="mt-[18px]"
        disabled={disabled}
      >
        <SearchIcon width={14} height={14} strokeWidth={2} />
      </Button>
    </AsyncAutoCompleteTextField>
  )
}

export { SearchPharmacyButton }
