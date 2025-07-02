import React from 'react'
import { EmptyFileIcon } from '@/components-v2'
import { CommonTable } from '../../common'
import { LabResult, TableColumn } from '../../types'
import { formatLocalDate } from '../../utils'
import { TextCell } from './text-cell'

const LabResultsTable = ({
  labResults,
  selectedTestId,
}: {
  labResults: LabResult[]
  selectedTestId: string
}) => {
  const columns: TableColumn<LabResult>[] = [
    {
      key: 'testName',
      label: 'Test Name',
      render: (row) => <TextCell>{row?.resultName ?? ''}</TextCell>,
    },
    {
      key: 'date',
      label: 'Date',
      render: (row) => (
        <TextCell>
          {row?.observationTime
            ? formatLocalDate(row?.observationTime, 'MM/dd/yyyy')
            : ''}
        </TextCell>
      ),
    },
    {
      key: 'result',
      label: 'Result',
      render: (row) => <TextCell>{row?.resultValue ?? ''}</TextCell>,
    },
    {
      key: 'unit',
      label: 'Unit',
      render: (row) => <TextCell>{row?.resultValueUnit ?? ''}</TextCell>,
    },
    {
      key: 'code',
      label: 'Code',
      render: (row) => <TextCell>{row?.resultCode ?? ''}</TextCell>,
    },
    {
      key: 'refRange',
      label: 'Ref. Range',
      render: (row) => <TextCell>{row?.recomendedValue ?? ''}</TextCell>,
    },
    {
      key: 'flag',
      label: 'Flag',
      render: (row) => <TextCell>{row?.abnormalRangeCode ?? ''}</TextCell>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <TextCell>{row?.statusCode ?? ''}</TextCell>,
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (row) => <TextCell>{row?.physicianComments ?? ''}</TextCell>,
    },
  ]
  return (
    <CommonTable
      columns={columns}
      data={
        labResults?.filter((item) => item.labTestId === selectedTestId) ?? []
      }
      emptyDescription="No Lab Results"
      EmptyIcon={EmptyFileIcon}
      getRowKey={(row: LabResult) => row?.id}
    />
  )
}

export default LabResultsTable
