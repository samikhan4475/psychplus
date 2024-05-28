'use client'

import { useMemo, useState } from 'react'
import { Button, Dialog, Flex, Switch } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { reconcilePreferredPartnerUserWorklist } from '@psychplus/preferred-partners/api.client'
import {
  DataTable,
  DataTableColumnHeader,
} from '@psychplus/ui/data-table'
import { TableCellLongText, TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from '../store'

  type RenderCheckbox = (row: any) => JSX.Element;

  const ReconcileColums=(renderCheckbox:RenderCheckbox): ColumnDef<any>[] => [
    {
      id: 'name',
      accessorKey: 'legalName.preferredName',
      size: 10,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText text={row?.original?.legalName?.preferredName} />
      ),
      enableHiding: true,
    },
    {
      id: 'verificationStatus',
      accessorKey: 'verificationStatus',
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
      id: 'gender',
      accessorKey: 'gender',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Gender"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original.gender} />,
      enableHiding: true,
    },
    {
      id: 'birthdate',
      accessorKey: 'birthdate',
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
      id: 'medicalRecordNumber',
      accessorKey: 'medicalRecordNumber',
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
      id: 'contactDetails.phone',
      accessorKey: 'contactDetails.phoneNumbers[0].number',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Phone"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={row.original.contactDetails.phoneNumbers[0].number}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'contactDetails.email',
      accessorKey: 'contactDetails.email',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Email"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText text={row.original.contactDetails.email} />
      ),
      enableHiding: true,
    },

    {
      id: 'address',
      accessorKey: 'contactDetails.addresses[0].street1',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Address"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText
          text={`${row.original.contactDetails.addresses[0].street1} ${row.original.contactDetails.addresses[0].street2}`}
        />
      ),
      enableHiding: true,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      enableHiding: false,
      cell: (props) => renderCheckbox(props.row.id),
    },
    ];
const ReconcileUserListTable = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const patients = useStore((state) => state.patients)
  const [preferredPartner] = useStore((state) => state.preferredPartner)
  const handleCheckboxChange = (id: string) => {
    setSelectedId(id === selectedId ? null : id)
  }
  const handlerClick = () => {
    if (!selectedId) return
    const payload = {
      ...preferredPartner,
      partnerId: preferredPartner.id,
      matchStatus: 'Existing',
      matchPatientId: selectedId as string,
    }
    reconcilePreferredPartnerUserWorklist(
      'partnerId',
      'worklistId',
      payload,
    ).then((response) => {
      console.log(response)
    })

    // console.log(selectedId, 'enabledRow', enabledRow)
  }
  const renderCheckbox = (rowId: string) => (
    <Flex gap="2">
      <Switch
        onClick={() => handleCheckboxChange(rowId)}
        color="indigo"
        checked={selectedId === rowId}
      />
      Link
    </Flex>
  )
  const columns = useMemo(()=>ReconcileColums(renderCheckbox),[])
  return (
    <>
      <DataTable
        data={patients}
        columns={columns}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
      />
      <Flex gap={'2'} justify={'end'}>
        <Dialog.Close>
          <Button
            className="border-2 border-gray-2 bg-[white] text-[black]"
            size="1"
          >
            Cancel
          </Button>
        </Dialog.Close>
        <Button onClick={handlerClick} className="bg-[#151B4A]" size="1">
          Save
        </Button>
      </Flex>
    </>
  )
}

export { ReconcileUserListTable }
