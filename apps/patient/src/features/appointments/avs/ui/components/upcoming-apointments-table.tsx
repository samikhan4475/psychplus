import React from 'react'
import { EmptyFileIcon } from '@/components-v2'
import { CommonTable } from '../../common'
import { Appointment, TableColumn } from '../../types'
import { formatLocalDate } from '../../utils'
import { TextCell } from './text-cell'

const UpcomingApointmentsTable = ({
  appointments,
  loading,
}: {
  appointments: Appointment[]
  loading?: boolean
}) => {
  const columns: TableColumn<Appointment>[] = [
    {
      key: 'dateTime',
      label: 'Date/Time',
      render: (row) => (
        <TextCell>
          {row?.startDate
            ? formatLocalDate(row?.startDate, 'MM/dd/yy hh:mm a')
            : ''}
        </TextCell>
      ),
    },
    {
      key: 'provider',
      label: 'Provider',
      render: (row) => <TextCell>{row?.providerFullName ?? ''}</TextCell>,
    },
    {
      key: 'location',
      label: 'Location',
      render: (row) => <TextCell>{row?.clinic?.name ?? ''}</TextCell>,
    },
    {
      key: 'service',
      label: 'Service',
      render: (row) => <TextCell>{row?.service ?? ''}</TextCell>,
    },
    {
      key: 'visitType',
      label: 'Visit Type',
      render: (row) => <TextCell>{row?.visitType ?? ''}</TextCell>,
    },
  ]
  return (
    <CommonTable
      columns={columns}
      data={appointments}
      emptyDescription="No upcoming appointments"
      EmptyIcon={EmptyFileIcon}
      getRowKey={(row) => `${row?.id}`}
      loading={loading}
    />
  )
}

export default UpcomingApointmentsTable
