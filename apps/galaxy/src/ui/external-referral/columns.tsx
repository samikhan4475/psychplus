'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import {
  formatDate,
  formatDateOfBirth,
  getPatientAge,
  getPatientFullName,
  getTimeLabel,
} from '@/utils'
import {
  ActionCell,
  ContactMadeSelectCell,
  ExternalReferralHistoryCell,
  ServiceDateTimeCell,
} from './cells'
import { Patient } from './types'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'hx',
    header: () => <ColumnHeader label="Hx" />,
    cell: ExternalReferralHistoryCell,
    maxSize: 50,
  },
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
    id: 'pt-status',
    header: () => <ColumnHeader label="User Status" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.matchStatus}</TextCell>
    ),
  },
  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row: { original } }) => (
      <TextCell>{getPatientAge(original.patientDateOfBirth)}</TextCell>
    ),
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gen." />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.patientGender}</TextCell>
    ),
  },
  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.patientExternalMrn}</TextCell>
    ),
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {formatDateOfBirth(original?.patientDateOfBirth)}
      </TextCell>
    ),
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.patientContactDetails?.phoneNumbers?.[0]?.number}
      </TextCell>
    ),
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.patientContactDetails?.email}
      </TextCell>
    ),
  },
  {
    id: 'state',
    header: () => <ColumnHeader label="State" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.patientContactDetails?.addresses?.[0]?.state}
      </TextCell>
    ),
  },
  {
    id: 'insurance',
    header: () => <ColumnHeader label="Insurance" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original?.insurance}</TextCell>
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
    header: () => <ColumnHeader label="Service Date/Time" />,
    cell: ServiceDateTimeCell,
  },
  {
    id: 'request',
    header: ({ column }) => <ColumnHeader column={column} label="Request" />,
    columns: [
      {
        id: 'date',
        header: () => <ColumnHeader label="Date" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {formatDate(patient?.requestedTime)}
          </TextCell>
        ),
      },
      {
        id: 'time',
        header: () => <ColumnHeader label="Time" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.requestedTime ? getTimeLabel(patient?.requestedTime) : ''}
          </TextCell>
        ),
      },
      {
        id: 'medium',
        header: () => <ColumnHeader label="Medium" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>{patient?.requestedMedium}</TextCell>
        ),
      },
      {
        id: 'clinicLocation',
        header: () => <ColumnHeader label="Clinic Location" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient?.requestedStateCode}
          </TextCell>
        ),
      },
      {
        id: 'provider',
        header: () => <ColumnHeader label="Provider" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">{patient?.requestProvider}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'referrer',
    header: ({ column }) => <ColumnHeader column={column} label="Referrer" />,
    columns: [
      {
        id: 'name',
        header: () => <ColumnHeader label="Name" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">{patient?.referrerName}</TextCell>
        ),
      },
      {
        id: 'phone',
        header: () => <ColumnHeader label="Phone" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell className="truncate">
            {patient.referrerContactDetails?.phoneNumbers?.[0]?.number}
          </TextCell>
        ),
      },
      {
        id: 'email',
        header: () => <ColumnHeader label="Email" />,
        cell: ({ row: { original: patient } }) => (
          <TextCell>{patient?.referrerContactDetails?.email}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'dischargeTime',
    header: () => <ColumnHeader label="DC Date" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.dischargeTime ?? ''}</TextCell>
    ),
  },
  {
    id: 'facesheet',
    header: () => <ColumnHeader label="Facesheet" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.facesheet ?? ''}</TextCell>
    ),
  },
  {
    id: 'dischargeSummary',
    header: () => <ColumnHeader label="Discharge Summary" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.dischargeSummary ?? ''}</TextCell>
    ),
  },
  {
    id: 'contact-made',
    header: () => <ColumnHeader label="Contact Initiated" />,
    cell: ContactMadeSelectCell,
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
        {original?.upcomingAppointmentDate ?? ''}
      </TextCell>
    ),
  },
  {
    id: 'isLinked',
    header: () => <ColumnHeader label="Association" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.isLinked ? 'Yes' : 'No'}</TextCell>
    ),
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionCell,
  },
]

export { columns }
