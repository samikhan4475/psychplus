'use client'

import { Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import {
  getPatientFullName,
  getSlashedPaddedDateString,
  getTimeLabel,
} from '@/utils'
import { HistoryDateTimeCell } from './cells'
import { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {getPatientFullName(original.patientName)}
      </LongTextCell>
    ),
  },
  {
    id: 'primary-insurance',
    header: () => <ColumnHeader label="Primary Insurance" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original?.primaryInsurance}
      </LongTextCell>
    ),
  },
  {
    id: 'secondary-insurance',
    header: () => <ColumnHeader label="Secondary Insurance" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original?.secondaryInsurance}
      </LongTextCell>
    ),
  },
  {
    id: 'service',
    header: () => <ColumnHeader label="Service" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.requestedService}</TextCell>
    ),
  },
  {
    id: 'service-date-time',
    header: () => <ColumnHeader label="Order Date/Time" />,
    cell: ({ row: { original: patient } }) => {
      const requestedTime = patient?.requestedTime
      if (!requestedTime) {
        return <Text className="text-pp-black-3"></Text>
      }
      return (
        <Flex justify="between" minWidth="130px" gap="2" className="!truncate">
          <Text className="text-pp-black-3" weight="regular" size="1">
            {getSlashedPaddedDateString(requestedTime)}
          </Text>
          <Text className="text-pp-black-3" weight="regular" size="1">
            {requestedTime && getTimeLabel(requestedTime)}
          </Text>
        </Flex>
      )
    },
  },
  {
    id: 'service-priority-status',
    header: () => <ColumnHeader label="Service Priority Status" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">
        {original?.servicePriorityStatus}
      </LongTextCell>
    ),
  },
  {
    id: 'initiated-by',
    header: () => <ColumnHeader label="Initiated by" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24">{original?.initiatedBy}</LongTextCell>
    ),
  },
  {
    id: 'next-visit',
    header: () => <ColumnHeader label="Next Visit" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.upcomingAppointmentDate ?? ''}
      </TextCell>
    ),
  },
  {
    id: 'visit-hx',
    header: () => <ColumnHeader label="Visit Hx" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.mostRecentAppointmentDate ?? ''}
      </TextCell>
    ),
  },
  {
    id: 'ordering-provider',
    header: () => <ColumnHeader label="Ordering Provider" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.orderingProvider}</TextCell>
    ),
  },
  {
    id: 'referral-status',
    header: () => <ColumnHeader label="Referral Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.matchStatus}</TextCell>
    ),
  },
  {
    id: 'contact-initiated-status',
    header: () => <ColumnHeader label="Contact Initiated Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.contactStatus}</TextCell>
    ),
  },
  {
    id: 'comments',
    header: () => <ColumnHeader label="Comments" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.additionalComments}</TextCell>
    ),
  },
  {
    id: 'updated-at',
    header: () => <ColumnHeader label="Updated At" />,
    cell: ({ row }) => <HistoryDateTimeCell row={row} />,
  },
  {
    id: 'updated-by',
    header: () => <ColumnHeader label="Updated By" />,
    cell: ({ row: { original: patient } }) => (
      <LongTextCell className="min-w-24">
        {patient.metadata?.createdByFullName}
      </LongTextCell>
    ),
  },
]

export { columns }
