'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { cn, formatDate, getAgeFromDate, getCalendarDate } from '@/utils'
import { ActionCell, DateCell, PPUserStatusCell } from './components'

const columns = (
  editMode: string | null,
  setEditMode: (id: string | null) => void,
  userTypeOptions: SelectOptionType[],
  userStatusOptions: SelectOptionType[],
): ColumnDef<PreferredPartnerUser>[] => {
  const isDeleted = (user: PreferredPartnerUser) =>
    user.recordStatus === 'Deleted'

  return [
    {
      accessorKey: 'name',
      header: () => <ColumnHeader label="Name" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {`${original.name.firstName} ${original.name.lastName}${
            original.name.honors ? `, ${original.name.honors}` : ''
          }`}
        </TextCell>
      ),
      size: 20,
    },

    {
      id: 'age-gender',
      header: () => <ColumnHeader label="Age/Gender" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {getAgeFromDate(getCalendarDate(original.dob))} / {original.gender}
        </TextCell>
      ),
    },
    {
      accessorKey: 'dob',
      header: () => <ColumnHeader label="DOB" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {formatDate(original.dob, 'MM/dd/yyyy')}
        </TextCell>
      ),
    },
    {
      accessorKey: 'mrn',
      header: () => <ColumnHeader label="MRN" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {original?.patientId}
        </TextCell>
      ),
    },
    {
      accessorKey: 'phone',
      header: () => <ColumnHeader label="Phone" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {original?.contactDetails?.phoneNumbers?.[0]?.number}
        </TextCell>
      ),
    },
    {
      accessorKey: 'email',
      header: () => <ColumnHeader label="Email" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {original.contactDetails.email}
        </TextCell>
      ),
    },
    {
      accessorKey: 'address',
      header: () => <ColumnHeader label="Address" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {original.contactDetails.addresses[0].street1}
        </TextCell>
      ),
    },
    {
      accessorKey: 'ppUserId',
      header: () => <ColumnHeader label="PP User ID" />,
      cell: ({ row: { original } }) => (
        <LongTextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
          {original.id}
        </LongTextCell>
      ),
    },
    {
      accessorKey: 'ppUserType',
      header: () => <ColumnHeader label="PP User Type" />,
      cell: ({ row: { original } }) => (
        <TextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
          {original.userType}
        </TextCell>
      ),
    },
    {
      accessorKey: 'userInId',
      header: () => <ColumnHeader label="User In ID" />,
      cell: ({ row: { original } }) => (
        <TextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
          {original.numberOfUsersInGroup}
        </TextCell>
      ),
    },
    {
      accessorKey: 'ppUserStatus',
      header: () => <ColumnHeader label="PP User Status" />,
      cell: ({ row: { original } }) => (
        <PPUserStatusCell
          original={original}
          editMode={editMode}
          userStatusOptions={userStatusOptions}
        />
      ),
    },
    {
      accessorKey: 'ppUserNumber',
      header: () => <ColumnHeader label="PP User Number" />,
      cell: ({ row: { original } }) => (
        <TextCell className={isDeleted(original) ? 'text-gray-400' : ''}>
          {original.familyUserNumber}
        </TextCell>
      ),
    },
    {
      accessorKey: 'startDate',
      header: () => <ColumnHeader label="Start Date" />,
      cell: ({ row: { original } }) => (
        <DateCell original={original} editMode={editMode} dateField="addDate" />
      ),
    },
    {
      accessorKey: 'termDate',
      header: () => <ColumnHeader label="Term Date" />,
      cell: ({ row: { original } }) => (
        <DateCell
          original={original}
          editMode={editMode}
          dateField="termDate"
        />
      ),
    },
    {
      accessorKey: 'uploadStatus',
      header: () => <ColumnHeader label="Upload Status" />,
      cell: ({ row: { original } }) => (
        <TextCell
          className={cn('truncate', isDeleted(original) && 'text-gray-400')}
        >
          {original.matchStatus}
        </TextCell>
      ),
    },
    {
      id: 'action',
      header: () => <ColumnHeader label="Action" />,
      cell: ({ row: { original } }) => (
        <ActionCell
          original={original}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ),
    },
  ]
}

export { columns }
