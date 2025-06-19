import React from 'react'
import { EmptyFileIcon } from '@/components-v2'
import { CommonTable } from '../../common'

const CurrentMedicationTable = () => {
  const columns = [
    {
      key: 'drugDescription',
      label: 'Drug',
    },
    {
      key: 'strength',
      label: 'Strength',
    },
    {
      key: 'quantityValue',
      label: 'Directions',
    },
    {
      key: 'writtenDate',
      label: 'Quantity',
    },
    {
      key: 'endDateTime',
      label: 'Refill',
    },
    {
      key: 'endDateTime',
      label: 'Written Date',
    },
    {
      key: 'endDateTime',
      label: 'End Date',
    },
    {
      key: 'endDateTime',
      label: 'Prescriber',
    },
    {
      key: 'endDateTime',
      label: 'Prescribed Status',
    },
    {
      key: 'endDateTime',
      label: 'Pharmacy',
    },
  ]
  return (
    <CommonTable
      columns={columns}
      data={[]}
      emptyDescription="No current medications"
      EmptyIcon={EmptyFileIcon}
      getRowKey={(row) => ''}
    />
  )
}

export default CurrentMedicationTable
