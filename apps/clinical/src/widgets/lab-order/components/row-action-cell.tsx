import { Dispatch, SetStateAction } from 'react'
import { Row } from '@tanstack/react-table'
import { LabOrder, LabTestDetails } from '../types'
import { RowActionDropdown } from './data-table-row.action'

const RowAction = ({
  row,
  setSelectedLabTestDetails,
}: {
  row: Row<LabOrder>
  setSelectedLabTestDetails: Dispatch<SetStateAction<LabTestDetails>>
}) => {
  if (
    !setSelectedLabTestDetails &&
    typeof setSelectedLabTestDetails !== 'function' &&
    !row
  )
    return null
  return (
    <RowActionDropdown
      setSelectedLabTestDetails={setSelectedLabTestDetails}
      data={row}
    />
  )
}
export { RowAction }
