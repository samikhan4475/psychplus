import { Dispatch, SetStateAction, useState } from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ColumnDef, Row } from '@tanstack/react-table'
import { format } from 'date-fns'
import { deleteLabOrder } from '@psychplus/lab-orders/api.client'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import OrderResult from '@/widgets/quick-notes/components/order-result'
import { useStore } from '../store'
import {
  LabOrder,
  LabTest,
  LabTestDetails,
  MenuItemType,
  PdfTypeUrl,
} from '../types'
import { useDropdowns } from '../utils'
import { RowActionDropdown } from './data-table-row.action'
import { DocumentResultPreviewCell } from './document-result-preview-cell'
import { LabOrderFormModal } from './lab-order-form-modal'
import { MergePatientsModal } from './merge-patients-modal'
import { PdfModal } from './pdf-modal'
import { RowDeleteConfirmDialog } from './row-delete-confirm-dialog'
import { SpecimenLabelPrintingModal } from './specimen-label-printing-modal'
import { StatusComp } from './status'
import { TableCellLongText } from './table-cell-contact'

const LabOrderTable = ({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) => {
  const labOrdersData = useStore((state) => state.labOrders)
  const setLabOrders = useStore((state) => state.setLabOrders)

  const [selectedLabTestDetails, setSelectedLabTestDetails] =
    useState<LabTestDetails>({ labTestId: '', type: '', labTest: null })
  const [submitted, setSubmitted] = useState(false)
  const [pdfModalOpened, setPdfModalOpened] = useState(false)
  const [unmappedOrderModal, setUnmappedOrderModal] = useState(false)
  const [pdfTypeUrl, setPdfTypeUrl] = useState<PdfTypeUrl>({
    type: '',
    url: '',
  })
  const [modalOpen, setModalOpen] = useState({
    type: '',
    data: null,
  })
  const unmappedOrderModalClose = () => setUnmappedOrderModal(false)
  const unmappedOrderModalOpened = () => setUnmappedOrderModal(true)
  const openPdfModal = (url: string, type: string) => {
    setPdfTypeUrl({ type, url: url })
    setPdfModalOpened(true)
  }

  const closePdfModal = () => {
    setPdfModalOpened(false)
    setPdfTypeUrl({ type: '', url: '' })
  }

  const closeDialog = () =>
    setSelectedLabTestDetails({ labTestId: '', type: '', labTest: null })
  const handleSubmit = () => setSubmitted(true)
  const handlerClose = () => setSubmitted(false)

  const deleteHandler = async () => {
    if (appointmentId) {
      await deleteLabOrder({
        appointmentId,
        id: selectedLabTestDetails.labTestId,
      })
      const updatedLabOrder = labOrdersData.filter(
        (item: LabTest) => item.id !== selectedLabTestDetails.labTestId,
      )
      setLabOrders(updatedLabOrder)
      closeDialog()
    }
  }
  const { getDropdowns } = useStore()
  const { mapDropdowns } = useDropdowns(getDropdowns)
  const labBillingType = mapDropdowns('LabBillingType')
  const labOrderStatus = mapDropdowns('LabOrderStatus')

  const columns: ColumnDef<LabOrder>[] = [
    {
      id: 'labOrderDate',
      accessorKey: 'labOrderDate',
      size: 20,
      minSize: 20,
      maxSize: 27,
      header: ({ column }) => header({ column, title: 'Order Date' }),
      cell: CreatedOnCell,
      enableHiding: true,
    },
    {
      id: 'labOrderNumber',
      accessorKey: 'labOrderNumber',
      size: 40,
      minSize: 40,
      maxSize: 40,
      header: ({ column }) => header({ column, title: 'Order #' }),
      cell: ({ row }) =>
        LabOrderNumberCellComponent({ row, patientId, appointmentId }),
      enableHiding: true,
    },
    {
      id: 'orderingStaffName',
      accessorKey: 'orderingStaffName',
      size: 30,
      minSize: 20,
      maxSize: 30,
      header: ({ column }) => header({ column, title: 'Ordered By' }),
      cell: OrderingStaffNameCell,
      enableHiding: true,
    },
    {
      id: 'testPanel',
      size: 20,
      minSize: 150,
      maxSize: 150,
      header: ({ column }) => header({ column, title: 'Test/Panel' }),
      cell: LabTestsCell,
      enableHiding: true,
      sortingFn: 'alphanumeric',
    },
    {
      id: 'orderingLab.name',
      accessorKey: 'orderingLab.name',
      size: 40,
      minSize: 40,
      maxSize: 40,
      header: ({ column }) => header({ column, title: 'Lab Name' }),
      cell: orderingLabNameComp,
      enableHiding: true,
    },
    {
      id: 'orderStatus',
      accessorKey: 'orderStatus',
      size: 50,
      minSize: 50,
      maxSize: 50,
      header: ({ column }) => header({ column, title: 'Status' }),
      cell: StatusComp,
      enableHiding: true,
    },
    {
      id: 'results',
      size: 20,
      minSize: 20,
      maxSize: 20,
      header: ({ column }) => header({ column, title: 'Results' }),
      enableHiding: false,
      cell: ({ row }) =>
        DocumentResultPreviewCell({
          row,
          openPdfModal,
          setModalOpen,
          appointmentId,
        }),
    },
    {
      id: 'actions',
      size: 20,
      minSize: 20,
      maxSize: 20,
      header: ({ column }) => header({ column, title: 'Actions' }),
      enableHiding: false,
      cell: ({ row }) => RowActionHOC({ row, setSelectedLabTestDetails }),
    },
  ]
  const resultFlags = useStore((state) => state.resultFlags)
  const resultStatus = useStore((state) => state.resultStatus)

  return (
    <Box className="h-fit min-w-fit">
      <MergePatientsModal
        isOpen={unmappedOrderModal}
        onClose={unmappedOrderModalClose}
      />
      <OrderResult
        resultFlags={resultFlags}
        resultStatus={resultStatus}
        isOpen={modalOpen.type === MenuItemType.ResultPreview}
        labOrder={modalOpen.data}
        onOpenChange={setModalOpen}
      />
      <PdfModal
        pdfTypeUrl={pdfTypeUrl}
        active={pdfModalOpened}
        handlerClose={closePdfModal}
      />
      <RowDeleteConfirmDialog
        isOpen={selectedLabTestDetails.type === 'Delete'}
        closeDialog={closeDialog}
        deleteHandler={deleteHandler}
      />
      <LabOrderFormModal
        labBillingType={labBillingType}
        labOrderStatus={labOrderStatus}
        appointmentId={appointmentId}
        patientId={patientId}
        labOrderData={labOrdersData}
        active={submitted}
        handlerClose={handlerClose}
      />
      <SpecimenLabelPrintingModal
        labTest={selectedLabTestDetails.labTest}
        active={selectedLabTestDetails.type === MenuItemType.SpecimenLabelPrint}
        handlerClose={closeDialog}
      />
      <Box px="1" pt="1">
        <Flex p="1" justify="between" className="m-0">
          <Text size="4" weight="bold" className="text-[#151B4A]">
            Lab Order Summary
          </Text>
          <Flex gap="2">
            <Button
              variant="outline"
              highContrast
              onClick={unmappedOrderModalOpened}
              className="h-25 border-1 mr-2 flex items-center gap-1 border-[#9E9898CC]  text-[#1C2024] shadow-[0_0_0_1px_#9E9898CC]"
            >
              Unmapped Order
            </Button>
            <Button
              variant="outline"
              highContrast
              onClick={handleSubmit}
              className="h-25 border-1 mr-2 flex items-center gap-1 border-[#9E9898CC]  text-[#1C2024] shadow-[0_0_0_1px_#9E9898CC]"
            >
              <Pencil1Icon />
              Add Lab Order
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box px="1">
        <DataTable
          data={labOrdersData}
          columns={columns}
          tableClass="border border-solid border-[#CAD8FD]"
          tHeadClass="bg-[#EBF3FC] text-start"
          thClass="border-b border-r border-solid border-[#CAD8FD] text-start font-light"
          toBodyClass="border-[#CAD8FD] border-b border-solid "
          columnCellClass="border border-solid border-[#CAD8FD] font-light cursor-default"
          renderFooter={DataTableFooter}
        />
      </Box>
    </Box>
  )
}

export { LabOrderTable }

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const orderingLabNameComp = ({ row }: { row: any }) => {
  return <TableCellText isLight={true} text={row.original?.orderingLab?.name} />
}
const LabOrderNumberCell = ({
  row,
  patientId,
  appointmentId,
}: {
  row: any
  patientId: string | null
  appointmentId: string | null
}) => {
  const labOrderNumber = row.original.labOrderNumber || '-'
  return (
    <TableCellLongText
      isLight={true}
      maxWidth={80}
      row={row.original}
      patientId={patientId}
      appointmentId={appointmentId}
      text={labOrderNumber.toString()}
    />
  )
}

const RowActionHOC = ({
  row,
  setSelectedLabTestDetails,
}: {
  row: any
  setSelectedLabTestDetails: Dispatch<SetStateAction<LabTestDetails>>
}) => {
  if (
    !setSelectedLabTestDetails &&
    typeof setSelectedLabTestDetails !== 'function' &&
    !row
  )
    return null
  return (
    <RowActionDropdown
      setSelectedLabTestDetails={setSelectedLabTestDetails}
      data={row}
    />
  )
}
const CreatedOnCell = ({ row }: any) => {
  const createdOn =
    row.original?.labOrderDate &&
    format(new Date(row.original.labOrderDate), 'MM/dd/yyyy')
  return <TableCellText isLight={true} text={createdOn} />
}
const OrderingStaffNameCell = ({ row }: any) => {
  const orderingStaffName = row.original?.orderingStaffName
  return <TableCellText isLight={true} text={orderingStaffName} />
}
const LabTestsCell = ({ row }: { row: Row<LabOrder> }) => {
  if (!row?.original?.labTests) return null
  const testNames = row.original.labTests
    .filter((item: LabTest) => item.recordStatus === 'Active')
    .map((item: LabTest) => item.testName)
    .join(', ')
    ?.slice(0, 40)
  return <TableCellLongText isLight={true} text={testNames} />
}
const header = ({ column, title }: { column: any; title: string }) => (
  <DataTableColumnHeader
    column={column}
    title={title}
    className="text-[#000]"
  />
)
const LabOrderNumberCellComponent = ({
  row,
  patientId,
  appointmentId,
}: {
  row: any
  patientId: string | null
  appointmentId: string | null
}) => {
  if (!patientId && !row) return null
  return (
    <LabOrderNumberCell
      row={row}
      patientId={patientId}
      appointmentId={appointmentId}
    />
  )
}
