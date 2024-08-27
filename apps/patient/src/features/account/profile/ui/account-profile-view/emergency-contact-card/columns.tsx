import React from 'react'
import { DropdownMenu, Flex, Switch, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { TableCellText } from 'node_modules/@psychplus/ui/src/table-cell'
import { DataTableColumnHeader } from '@psychplus/ui/data-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { PencilIcon, Trash2 } from 'lucide-react'
import { RelationshipData } from '@psychplus-v2/types'

const columns = (setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setDeleteItem: React.Dispatch<React.SetStateAction<RelationshipData | undefined>>): ColumnDef<RelationshipData>[] => [
        {
            id: 'firstName',
            accessorKey: 'name.firstName',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="First Name" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.name.firstName ?? ''} />
            ),
        },
        {
            id: 'middleName',
            accessorKey: 'name.middleName',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Middle Name" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.name.middleName ?? ''} />
            ),
        },
        {
            id: 'lastName',
            accessorKey: 'name.lastName',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Last Name" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.name.lastName ?? ''} />
            ),
        },
        {
            id: 'relationship',
            accessorKey: 'guardianRelationshipCode',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Relationship" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.guardianRelationshipCode ?? ''} />
            ),
        },
        {
            id: 'address',
            accessorKey: 'contactDetails.addresses[0].street1',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Address" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.contactDetails.addresses[0].street1 ?? ''} />
            ),
        },
        {
            id: 'postalCode',
            accessorKey: 'contactDetails.addresses[0].postalCode',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Zip Code" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.contactDetails.addresses[0].postalCode ?? ''} />
            ),
        },
        {
            id: 'email',
            accessorKey: 'contactDetails.email',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.contactDetails.email ?? ''} />
            ),
        },
        {
            id: 'cellPhone',
            accessorKey: 'contactDetails.phoneNumbers[1].number',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Home Phone" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.contactDetails.phoneNumbers[1]?.number ?? ''} />
            ),
        },
        {
            id: 'emergencyContact',
            accessorKey: 'isEmergencyContact',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Emergency Contact" />
            ),
            cell: ({ row }: any) => (
                <Flex align="center">
                    <Switch
                        color="indigo"
                        highContrast
                        defaultChecked={row.original.isEmergencyContact}
                        className="pointer-events-none"
                    />
                </Flex>
            ),
        },
        {
            id: 'rri',
            accessorKey: 'isAllowedToReleaseInformation',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="RRI" />
            ),
            cell: ({ row }: any) => (
                <Flex align="center">
                    <Switch
                        color="indigo"
                        highContrast
                        defaultChecked={row.original.isAllowedToReleaseInformation}
                        className="pointer-events-none"
                    />
                </Flex>
            ),
        },
        {
            id: 'guardian',
            accessorKey: 'isGuardian',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Guardian" />
            ),
            cell: ({ row }: any) => (
                <Flex align="center" justify="center">
                    <Switch
                        color="indigo"
                        highContrast
                        defaultChecked={row.original.isGuardian}
                        className="pointer-events-none"
                    />
                </Flex>
            ),
        },
        {
            id: 'homePhone',
            accessorKey: 'contactDetails.phoneNumbers[0].number',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Cell Phone" />
            ),
            cell: ({ row }: any) => (
                <TableCellText text={row.original.contactDetails.phoneNumbers[0].number ?? ''} />
            ),
        },
        {
            id: 'action',
            accessorKey: 'action',
            enableSorting: false,
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title="Action" />
            ),
            cell: ({ row }: any) => (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="cursor-pointer">
                        <DotsHorizontalIcon />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="bg-white shadow-2xl shadow-stone-900 rounded w-[96px] p-0">
                        <DropdownMenu.Item
                            className="p-0 w-full hover:bg-[#ffffff] border-b border-b-[#DDDDE3] rounded-[0px]"
                            onClick={() => setSelectedId(row.original.id)}
                        >
                            <Flex
                                width="100%"
                                align="center"
                                gap="6"
                                className="text-xs font-normal cursor-pointer gap-2 py-[6px] leading-4"
                            >
                                <PencilIcon
                                    height={15}
                                    width={15}
                                    strokeWidth={2}
                                    aria-hidden
                                    color="#60646C"
                                />
                                <Text size="2" className="text-[#1C2024]">Edit</Text>
                            </Flex>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            onClick={() => setDeleteItem(row.original)}
                            className="p-0 hover:bg-[#ffffff]"
                        >
                            <Flex
                                width="100%"
                                align="center"
                                gap="6"
                                className="text-xs font-normal cursor-pointer gap-2 py-[6px] leading-4"
                            >
                                <Trash2 height={15} width={15} strokeWidth={2} aria-hidden color="#60646C" />
                                <Text size="2" className="text-[#1C2024]">Delete</Text>
                            </Flex>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            ),
        },
    ];
export { columns }