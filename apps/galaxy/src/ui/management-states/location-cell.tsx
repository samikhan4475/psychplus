'use client'

import { PropsWithRow, SelectCell } from '@/components'
import { SelectOptionType } from '@/types'

type LocationCellProps = {
  display: string
  stateCode: string
  locationId?: string
}

interface Props extends PropsWithRow<LocationCellProps> {
  options: SelectOptionType[]
  onLocationChange: (stateCode: string, locationId: string) => void
}

const LocationCell = ({
  row: { original },
  options,
  onLocationChange,
}: Props) => {
  return (
    <SelectCell
      options={options}
      value={original.locationId}
      onValueChange={(value) => onLocationChange(original.stateCode, value)}
    />
  )
}

export { LocationCell }
