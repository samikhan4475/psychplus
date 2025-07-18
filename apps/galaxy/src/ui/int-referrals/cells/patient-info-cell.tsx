'use client'

import { Button, Flex, Heading, Popover, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronRightIcon } from 'lucide-react'
import { ColumnHeader, DataTable, PropsWithRow, TextCell } from '@/components'
import { PatientReferral } from '@/types'
import { formatDateOfBirth, getPatientFullName } from '@/utils'
import { GenderLabelCell } from '../../referrals/patient-referrals-widget/cells'
import { PatientChartCell } from './patient-chart-cell'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'patientStatus',
    header: ({ column }) => <ColumnHeader label="Status" column={column} />,
    cell: GenderLabelCell,
  },
  {
    id: 'patientAge',
    header: ({ column }) => <ColumnHeader label="Age" column={column} />,
    cell: ({ row }) => <TextCell>{row.original.patientAge}</TextCell>,
  },
  {
    id: 'patientGender',
    header: ({ column }) => <ColumnHeader label="Gen." column={column} />,
    cell: ({ row }) => <TextCell>{row.original.patientGender}</TextCell>,
  },
  {
    id: 'patientMrn',
    header: ({ column }) => <ColumnHeader label="MRN" column={column} />,
    cell: ({ row }) => <TextCell>{row.original.patientMrn}</TextCell>,
  },
  {
    id: 'patientDateOfBirth',
    header: ({ column }) => <ColumnHeader label="DOB" column={column} />,
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row.original?.patientDateOfBirth &&
          formatDateOfBirth(row.original?.patientDateOfBirth)}
      </TextCell>
    ),
  },
  {
    id: 'contactDetails.phoneNumbers[0].number',
    header: ({ column }) => <ColumnHeader label="Phone" column={column} />,
    cell: ({ row }) => (
      <TextCell className="w-[100px]">
        {row.original.contactDetails?.phoneNumbers?.length
          ? row.original.contactDetails.phoneNumbers[0].number
          : ''}
      </TextCell>
    ),
  },
  {
    id: 'contactDetails?.email',
    header: ({ column }) => <ColumnHeader label="Email" column={column} />,
    cell: ({ row }) => (
      <TextCell>{row.original.contactDetails?.email}</TextCell>
    ),
  },
  {
    id: 'contactDetails.addresses[0].state',
    header: ({ column }) => (
      <ColumnHeader label="Residence(State)" column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.length
          ? row.original.contactDetails.addresses[0].state
          : ''}
      </TextCell>
    ),
  },
  {
    id: 'contactDetails.addresses[0].city',
    header: ({ column }) => <ColumnHeader label="City" column={column} />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.length
          ? row.original.contactDetails.addresses[0].city
          : ''}
      </TextCell>
    ),
  },
  {
    id: 'contactDetails.addresses[0].postalCode',
    header: ({ column }) => <ColumnHeader label="Zip" column={column} />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.length
          ? row.original.contactDetails.addresses[0].postalCode
          : ''}
      </TextCell>
    ),
  },
]

const PatientInfoCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  return (
    <Flex justify="start">
      <PatientChartCell
        referral={referral}
        labelText={getPatientFullName(referral.patientName)}
      />
      <Popover.Root modal>
        <Popover.Trigger>
          <Button
            className="text-black float-right !outline-none"
            type="button"
            variant="ghost"
            color="gray"
            size="1"
          >
            <ChevronRightIcon size={16} />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          className="min-h-28 -mb-2 -mt-2 min-w-[1000px] flex-1 items-center rounded-1 !p-0"
          align="start"
        >
          <Flex
            py="2"
            px="4"
            className="bg-white z-[1]"
            position="sticky"
            top="0"
          >
            <Heading size="5">Patient Details</Heading>
          </Flex>
          <ScrollArea className="max-h-44 p-2">
            <DataTable
              columns={columns}
              data={[referral]}
              sticky
              theadClass="z-[1]"
              disablePagination
            />
          </ScrollArea>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { PatientInfoCell }
