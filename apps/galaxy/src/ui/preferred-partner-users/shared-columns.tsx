'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { PreferredPartnerUser, SelectOptionType } from '@/types'
import { cn, formatDateOfBirth, getAgeFromDate, getCalendarDate } from '@/utils'
import {
  ActionCell,
  DateCell,
  PPUserStatusCell,
  UserStatusCell,
} from './components'

export const isDeleted = (user: PreferredPartnerUser) =>
  user.recordStatus === 'Deleted'

export const getStyledTextCell = (
  content: string | number | undefined,
  user: PreferredPartnerUser,
) => (
  <TextCell className={cn('truncate', isDeleted(user) && 'text-gray-400')}>
    {content}
  </TextCell>
)

export const getStyledLongTextCell = (
  content: string | undefined,
  user: PreferredPartnerUser,
) => (
  <LongTextCell className={isDeleted(user) ? 'text-gray-400' : ''}>
    {content}
  </LongTextCell>
)

export const createSharedColumns = () => ({
  dob: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(formatDateOfBirth(original.dob), original),
  }),

  phone: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(
        original?.contactDetails?.phoneNumbers?.[0]?.number,
        original,
      ),
  }),

  email: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.contactDetails.email, original),
  }),

  address: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'address',
    header: () => <ColumnHeader label="Address" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.contactDetails.addresses[0].street1, original),
  }),

  ppUserId: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'ppUserId',
    header: () => <ColumnHeader label="PP User ID" />,
    cell: ({ row: { original } }) =>
      getStyledLongTextCell(original.familyUserNumber, original),
  }),

  ppUserType: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'ppUserType',
    header: () => <ColumnHeader label="PP User Type" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.userType, original),
  }),

  userInId: (label = 'User In ID'): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'userInId',
    header: () => <ColumnHeader label={label} />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.numberOfUsersInGroup, original),
  }),

  ppUserStatus: (
    editMode: string | null,
    userStatusOptions: SelectOptionType[],
  ): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'ppUserStatus',
    header: () => <ColumnHeader label="PP User Status" />,
    cell: ({ row: { original } }) => (
      <PPUserStatusCell
        original={original}
        editMode={editMode}
        userStatusOptions={userStatusOptions}
      />
    ),
  }),

  startDate: (editMode: string | null): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'startDate',
    header: () => <ColumnHeader label="Start Date" />,
    cell: ({ row: { original } }) => (
      <DateCell original={original} editMode={editMode} dateField="addDate" />
    ),
  }),

  uploadStatus: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'uploadStatus',
    header: () => <ColumnHeader label="Upload Status" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.matchStatus, original),
  }),

  action: (
    editMode: string | null,
    setEditMode: (id: string | null) => void,
  ): ColumnDef<PreferredPartnerUser> => ({
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ({ row: { original } }) => (
      <ActionCell
        original={original}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    ),
  }),
})

export const createWorklistColumns = () => ({
  firstName: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'firstName',
    header: () => <ColumnHeader label="First Name" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.name.firstName, original),
  }),

  lastName: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'lastName',
    header: () => <ColumnHeader label="Last Name" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.name.lastName ?? '', original),
  }),

  gender: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'gender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.gender, original),
  }),

  ssn: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'ssn',
    header: () => <ColumnHeader label="SSN" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original?.ssn ?? '', original),
  }),

  userStatus: (
    statusOptions: SelectOptionType[],
  ): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'userStatus',
    header: () => <ColumnHeader label="User Status" />,
    cell: ({ row: { original } }) => (
      <UserStatusCell original={original} statusOptions={statusOptions} />
    ),
  }),
})

export const createActiveUsersColumns = () => ({
  name: (): ColumnDef<PreferredPartnerUser> => ({
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
  }),

  ageGender: (): ColumnDef<PreferredPartnerUser> => ({
    id: 'age-gender',
    header: () => <ColumnHeader label="Age/Gender" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(
        `${getAgeFromDate(getCalendarDate(original.dob))} / ${original.gender}`,
        original,
      ),
  }),

  mrn: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original?.patientId, original),
  }),

  ppUserNumber: (): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'ppUserNumber',
    header: () => <ColumnHeader label="PP User Number" />,
    cell: ({ row: { original } }) =>
      getStyledTextCell(original.familyUserNumber, original),
  }),

  termDate: (editMode: string | null): ColumnDef<PreferredPartnerUser> => ({
    accessorKey: 'termDate',
    header: () => <ColumnHeader label="Term Date" />,
    cell: ({ row: { original } }) => (
      <DateCell original={original} editMode={editMode} dateField="termDate" />
    ),
  }),
})
