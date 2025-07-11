import React from 'react'
import { cn, getUserFullName } from '@psychplus-v2/utils'
import { Table } from '@radix-ui/themes'
import { format } from 'date-fns'
import {
  ColumnHeader,
  EmptyWaitlistIcon,
  FeatureEmpty,
  LoadingPlaceholder,
} from '@/components-v2'
import { useStore } from '../store'
import { getVisitMediumLabel, getWaitlistDateAndTime } from '../utils'
import { AddWaitlistButton } from './add-waitlist-button'
import { ActionsCell, WaitlistScheduleCell, WaitlistStatusCell } from './cells'

const WaitlistTable = () => {
  const { data, loading } = useStore()

  if (loading) return <LoadingPlaceholder />

  return (
    <Table.Root variant="surface" size="1" className="w-full">
      <Table.Header className={cn('bg-pp-blue-5')}>
        <Table.Row className="whitespace-nowrap">
          <ColumnHeader>Visit Type</ColumnHeader>
          <ColumnHeader>Visit Medium</ColumnHeader>
          <ColumnHeader>From Date/Time</ColumnHeader>
          <ColumnHeader>To Date/Time</ColumnHeader>
          <ColumnHeader>Provider</ColumnHeader>
          <ColumnHeader>Initiated Date/Time</ColumnHeader>
          <ColumnHeader>Waitlist Status</ColumnHeader>
          <ColumnHeader>Schedule</ColumnHeader>
          <ColumnHeader>Action</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={9}>
              <FeatureEmpty
                description="You can now join waitlist and book spots as per your availability"
                Icon={EmptyWaitlistIcon}
                action={
                  <AddWaitlistButton
                    className="justify-center"
                    useAsAction
                    title="Join Waitlist"
                  />
                }
              />
            </Table.Cell>
          </Table.Row>
        ) : (
          data.map((row) => (
            <Table.Row key={row.id} className="whitespace-nowrap">
              <Table.Cell>{row?.serviceOffered}</Table.Cell>
              <Table.Cell>{getVisitMediumLabel(row?.visitMedium)}</Table.Cell>
              <Table.Cell>
                {getWaitlistDateAndTime(row?.fromDate, row?.fromTime)}
              </Table.Cell>
              <Table.Cell>
                {getWaitlistDateAndTime(row?.toDate, row?.toTime)}
              </Table.Cell>
              <Table.Cell>{getUserFullName(row?.providerName)}</Table.Cell>
              <Table.Cell>
                {getWaitlistDateAndTime(
                  row?.metadata?.createdOn,
                  format(new Date(row?.metadata?.createdOn), 'HH:mm:ss'),
                )}
              </Table.Cell>
              <Table.Cell>
                <WaitlistStatusCell status={row?.waitingStatus} />
              </Table.Cell>
              <Table.Cell>
                <WaitlistScheduleCell row={row} />
              </Table.Cell>
              <Table.Cell>
                <ActionsCell row={row} />
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export { WaitlistTable }
