import { useEffect } from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Patient } from '@/ui/patient-lookup/types'
import { useStore } from '../store'
import { TableRowRadioCell } from './table-row-radiobtn-cell'

const columns: ColumnDef<Patient>[] = [
  {
    id: 'select',
    size: 10,
    header: () => <ColumnHeader label="" />,
    cell: ({ row }) => (
      <Box className="pl-[2px]">
        <TableRowRadioCell row={row} />
      </Box>
    ),
  },
  {
    id: 'name',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row }) => <TextCell>{row.original?.name}</TextCell>,
    size: 50,
  },
  {
    id: 'age',
    header: () => <ColumnHeader label="Age" />,
    cell: ({ row }) => <TextCell>{row.original?.age}</TextCell>,
    size: 100,
  },
  {
    id: 'patient-gender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row }) => <TextCell>{row.original?.gender}</TextCell>,
  },

  {
    id: 'mrn',
    header: () => <ColumnHeader label="MRN" />,
    cell: ({ row }) => <TextCell>{row.original?.mrn}</TextCell>,
  },
  {
    id: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row }) => <TextCell>{row.original?.dob}</TextCell>,
  },
  {
    id: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row }) => <TextCell>{row.original?.phoneNumber}</TextCell>,
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.contactDetails?.email}</TextCell>
    ),
  },
  {
    id: 'city',
    header: () => <ColumnHeader label="City" />,
    cell: ({ row }) => <TextCell>{row.original?.city}</TextCell>,
  },
  {
    id: 'zip',
    header: () => <ColumnHeader label="Zip" />,
    cell: ({ row }) => <TextCell>{row.original?.zip}</TextCell>,
  },
]

const PatientMapTable = () => {
  const { patientsData, searchPatients, loadingPatients } = useStore(
    (state) => ({
      patientsData: state.patientsData,
      searchPatients: state.searchPatients,
      loadingPatients: state.loadingPatients,
    }),
  )

  useEffect(() => {
    searchPatients({})
  }, [])
  if (loadingPatients) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
      <DataTable
        data={patientsData?.patients ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientMapTable }
