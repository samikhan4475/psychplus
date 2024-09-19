import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Row, type ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { useStore } from '../../../store'
import { deleteInsurancePlanEDIRecord, getEDIData } from '../../api.client'
import { EDIAddDialog } from '../insurance-plan-edi-add-dialog'
import { EDIFormDropdown } from '../insurance-plan-edi-dropdown'
import { EDIIconAction, EDIItem } from '../types'
import { ConfirmDialog } from './confirm-dialog'
import { TableCellLongText } from './table-cell-long-text'

const getColumns = (
  actionDropdown: { label: string; value: string }[],
  handleEditInsurancePlanEDIItemAction: (row: Row<EDIItem>) => void,
  handleDeleteInsurancePlanEDIItemAction: (row: Row<EDIItem>) => void
): ColumnDef<EDIItem>[] => [
    {
      id: 'receiverName',
      accessorKey: 'receiverName',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Receiver Name"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellLongText text={row.original.receiverName} />
      ),
      enableHiding: true,
    },
    {
      id: 'insurancePayerName',
      accessorKey: 'insurancePayerName',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Insurance Payer Name"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => (
        <TableCellText text={row.original.insurancePayerName} />
      ),
      enableHiding: true,
    },
    {
      id: 'payerId',
      accessorKey: 'payerId',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Payer ID"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={row.original.payerId} />,
      enableHiding: true,
    },
    {
      id: 'isEligibility',
      accessorKey: 'isEligibility',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Eligibility"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={String(row.original.isEligibility? "Yes":"No")} />,
      enableHiding: true,
    },
    {
      id: 'isElectronic',
      accessorKey: 'isElectronic',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Electronic Pro."
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={String(row.original.isElectronic? "Yes":"No")} />,
      enableHiding: true,
    },
    {
      id: 'isInstitutional',
      accessorKey: 'isInstitutional',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Electronic Inst."
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={String(row.original.isInstitutional? "Yes":"No")} />,
      enableHiding: true,
    },
    {
      id: 'isDental',
      accessorKey: 'isDental',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Electronic Dental"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={String(row.original.isDental? "Yes":"No")} />,
      enableHiding: true,
    },
    {
      id: 'isPaperCms1500',
      accessorKey: 'isPaperCms1500',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Paper (CMS-1500)"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={String(row.original.isPaperCms1500? "Yes":"No")} />,
      enableHiding: false,
    },
    {
      id: 'isPaperUb04',
      accessorKey: 'isPaperUb04',
      size: 50,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Paper (UB04)"
          className="text-[#000]"
        />
      ),
      cell: ({ row }) => <TableCellText text={String(row.original.isPaperUb04? "Yes":"No")} />,
      enableHiding: false,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      enableHiding: false,
      cell: ({ row }) => (
        <EDIFormDropdown
          options={actionDropdown}
          onChange={(action: EDIIconAction) => {
            if (action === EDIIconAction.edit) {
              handleEditInsurancePlanEDIItemAction(row);
            } else if (action === EDIIconAction.delete) {
              handleDeleteInsurancePlanEDIItemAction(row);
            }
          }}
        />
      ),
    },
  ]; 

const EDIList = () => {
  const ediRecords = useStore((state) => state.ediRecords)
  const setEDIRecords = useStore((state) => state.setEDIRecords)
  const [selectedEDIItem, setSelectedEDIItem] = useState<EDIItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

  const fetchEDIData = async (data: EDIItem = {}) => {
    try {
      const newData = {
        ...data,
        isIncludeInsurancePlan: true,
        isIncludeClearingHouseReceiver: true,
        recordStatuses: ['Active'],
      }
      const response = await getEDIData(newData)
      setEDIRecords(response)
    } catch (error) {
      console.error('error: ', error)
    }
  }

  const refresh = () => {
    fetchEDIData()
  }

  const handleEditInsurancePlanEDIItemAction = async (row: Row<EDIItem>) => {
    setSelectedEDIItem(row.original)
    setIsDialogOpen(true)
  }

  const handleDeleteInsurancePlanEDIItemAction = (row: Row<EDIItem>) => {
    setSelectedEDIItem(row.original)
    setIsDeleteDialogOpen(true)
  }

  const deleteEDIItem = async () => {
    if (!selectedEDIItem) return
    try {
      await deleteInsurancePlanEDIRecord(selectedEDIItem.id)
      setIsDeleteDialogOpen(false)
      setSelectedEDIItem(null)
      await fetchEDIData()
    } catch (error) {
      console.error(error)
    }
  }

  const actionDropdown = [{ label: 'Edit', value: 'Edit' }, { label: 'Delete', value: 'Delete' }]

  return (
    <Box m="1">
      <Flex align="center" justify="between" className="border-b border-[#f3f2f2] py-2">
        <Text size="3" weight="bold">
          Ins. Plan EDI Setup
        </Text>
        <Box className="text-right">
          <Button
            color="gray"
            variant="solid"
            className="bg-[#151B4A]"
            highContrast
            onClick={() => {
              setIsDialogOpen(true)
              setSelectedEDIItem(null)
            }}
          >
            <PlusIcon />
            &nbsp;<Text>Add</Text>
          </Button>
        </Box>
      </Flex>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={() => {
          deleteEDIItem()
        }}
        onCancel={() => {
          setSelectedEDIItem(null)
          setIsDeleteDialogOpen(false)
        }}
      />
      <EDIAddDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedEDIItem={selectedEDIItem}
        refresh={refresh}
      />
      <DataTable
        data={ediRecords}
        columns={getColumns(actionDropdown, handleEditInsurancePlanEDIItemAction, handleDeleteInsurancePlanEDIItemAction)}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
      />
    </Box>
  )
}


export { EDIList }

