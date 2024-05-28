'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Select } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { Patient } from '@psychplus/patient'
import { CreatePreferredPartnerPatientPayload } from '@psychplus/preferred-partners'
import { createPreferredPartnerPatient } from '@psychplus/preferred-partners/api.client'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { TableCellLongText } from '@psychplus/ui/table-cell'
import { Dropdown } from '@/widgets/patient-lookup/store'
import { useStore } from '../store'
import { FilterForm } from './filter-form'

let userTypeCodeSet: Dropdown
let userStatusCodeSet: Dropdown

const columns: ColumnDef<any>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.legalName.firstName} ${row.original.legalName.lastName}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'userStatus',
    accessorKey: 'User Status',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="User Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.verificationStatus} />
    ),
    enableHiding: true,
  },
  {
    id: 'Gender',
    accessorKey: 'Gender',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Gender"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.gender} />,
    enableHiding: true,
  },
  {
    id: 'DOB',
    accessorKey: 'DOB',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOB"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.birthdate} />,
    enableHiding: true,
  },
  {
    id: 'MRN',
    accessorKey: 'Mrn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="MRN"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.medicalRecordNumber} />
    ),
    enableHiding: true,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={row.original.contactDetails.phoneNumbers[0].number}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'email',
    accessorKey: 'email',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.contactDetails.email} />
    ),
    enableHiding: true,
  },
  {
    id: 'address',
    accessorKey: 'address',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.contactDetails?.addresses[0]?.street1} ${row?.original?.contactDetails?.addresses[0]?.street2}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'PP User Id',
    accessorKey: 'PP User Id',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP User Id"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <input
        type="text"
        className="border-2 border-[#e0e1e6] outline-none"
        value={row.original.ppUserId}
        onChange={(e) => {
          const newValue = e.target.value
          console.log({ newValue })
          row.original = { ...row.original, ppUserId: newValue }
        }}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'PP User Type',
    accessorKey: 'PP User Type',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP User Type"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <Select.Root
        size="1"
        value={row.original.ppUserType}
        onValueChange={(value) => {
          row.original.ppUserType = value
        }}
      >
        <Select.Trigger className="min-w-[125px]" />
        <Select.Content>
          {userTypeCodeSet &&
            userTypeCodeSet.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
        </Select.Content>
      </Select.Root>
    ),
    enableHiding: true,
  },
  {
    id: 'PP User Status',
    accessorKey: 'PP User Status',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP User Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => {
      return (
        <Select.Root
          size="1"
          value={row.original.ppUserStatus}
          onValueChange={(value) => {
            row.original.ppUserStatus = value
          }}
        >
          <Select.Trigger className="min-w-[125px]" />
          <Select.Content>
            {userStatusCodeSet &&
              userStatusCodeSet.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
          </Select.Content>
        </Select.Root>
      )
    },
    enableHiding: true,
  },
  {
    id: 'Start Date',
    accessorKey: 'start Date',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="start Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.name} />,
    enableHiding: true,
  },
  {
    id: 'termDate',
    accessorKey: 'termDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="termDate"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.name} />,
    enableHiding: true,
  },
]

const LinkUserModal = () => {
  const { getDropdowns } = useStore()
  userStatusCodeSet = getDropdowns('PreferredPartnerUserStatus')
  userTypeCodeSet = getDropdowns('PreferredPartnerUserType')
  userTypeCodeSet.map((status) => (status.value = status.label))
  userStatusCodeSet.map((status) => (status.value = status.label))
  const data = useStore((state) => state.patients)
  const partnerId = useStore((state) => state.preferredPartnerId)
  data.forEach((record) => {
    record.ppUserId = undefined
    record.ppUserStatus = undefined
    record.ppUserType = undefined
  })

  const handlerSubmit = () => {
    const includedFields = data.filter(
      (filterData) =>
        filterData.ppUserId && filterData.ppUserStatus && filterData.ppUserType,
    )

    includedFields.forEach((patient: Patient) => {
      const payload = {
        firstName: patient.legalName.firstName,
        lastName: patient.legalName.lastName,
        gender: patient.gender,
        dob: patient.birthdate,
        mrn: patient.medicalRecordNumber,
        patientStatus: patient.verificationStatus,
        contactDetails: patient.contactDetails,
        partnerId: partnerId,
        pid: patient.id,
        userType: 'Individual',
        userNumber: null,
        userStatus: 'Primary',
        isPrimaryPartner: true,
        addDate: new Date(),
        termDate: null,
        recordStatus: 'Active',
      }

      createPreferredPartnerPatient(
        partnerId,
        payload as CreatePreferredPartnerPatientPayload,
      )
        .then((response) => {
          console.log(
            `Preferred partner patient created successfully`,
            response,
          )
        })
        .catch((err) => {
          console.log('error in creating preferred partner status', err)
        })
    })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <span className="text-[#000000] opacity-80">Link Users</span>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[80%] rounded-4 p-4 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="4">{'Link User'}</Dialog.Title>
        <div className="pt-4">
          <FilterForm />
          <DataTable
            data={data}
            columns={columns}
            tableClass="border border-solid border-[lightgray] "
            initialPageSize={10}
            tHeadClass="bg-[#EBF3FC]"
            thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
            isRowPan={true}
            toBodyClass="border-[lightgray]; border-b border-solid"
            columnCellClass="border border-solid border-[#F2F2F2] w-50"
            isPreferredPartnerTable={true}
          />
          <Flex gap={'2'} mt="2" justify={'end'}>
            <Button
              className="!border-2  !border-[#151B4A] !bg-[white] p-3 !text-[#151B4A]"
              size="1"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#151B4A] p-3"
              onClick={handlerSubmit}
              size="1"
            >
              Save
            </Button>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LinkUserModal }
