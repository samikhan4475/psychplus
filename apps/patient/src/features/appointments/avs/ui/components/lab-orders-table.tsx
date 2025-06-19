import React from 'react'
import { EmptyFileIcon } from '@/components-v2'
import { CommonTable } from '../../common'
import { LabOrder, TableColumn } from '../../types'
import { formatUTCDate } from '../../utils'
import { LabResultsCell } from './lab-results-cell'
import { LabTestCell } from './lab-test-cell'
import { StatusCell } from './status-cell'
import { TextCell } from './text-cell'

const LabOrdersTable = ({
  labOrders,
  loading,
}: {
  labOrders: LabOrder[]
  loading?: boolean
}) => {
  const columns: TableColumn<LabOrder>[] = [
    {
      key: 'dateTime',
      label: 'Date/Time',
      render: (row) => (
        <TextCell>
          {row?.labOrderDate
            ? formatUTCDate(row?.labOrderDate, 'MM/dd/yy HH:mm')
            : ''}
        </TextCell>
      ),
    },
    {
      key: 'provider',
      label: 'Provider',
      render: (row) => (
        <TextCell>
          {row?.orderingStaffName?.firstName ?? ''}{' '}
          {row?.orderingStaffName?.lastName ?? ''}
          {', '}
          {row?.orderingStaffName?.honors ?? ''}
        </TextCell>
      ),
    },
    {
      key: 'initiated',
      label: 'Initiated',
      render: (row) => (
        <TextCell>{row?.metadata?.createdByFullName ?? ''}</TextCell>
      ),
    },
    {
      key: 'test',
      label: 'Test',
      render: (row) => <LabTestCell row={row} className="w-[250px]" />,
    },
    {
      key: 'location',
      label: 'Location',
      render: (row) => <TextCell>{row?.orderingLab?.name}</TextCell>,
    },
    {
      key: 'endDateTime2',
      label: 'Lab Status',
      render: (row) => <StatusCell row={row} />,
    },
    {
      key: 'results',
      label: 'Results',
      render: (row) =>
        row?.labResults?.length ? (
          <LabResultsCell
            labResults={row?.labResults ?? []}
            labTests={row?.labTests ?? []}
          />
        ) : null,
    },
  ]
  return (
    <CommonTable
      columns={columns}
      data={labOrders ?? []}
      emptyDescription="No lab orders"
      EmptyIcon={EmptyFileIcon}
      getRowKey={(row) => row?.id}
      loading={loading}
    />
  )
}

export default LabOrdersTable
