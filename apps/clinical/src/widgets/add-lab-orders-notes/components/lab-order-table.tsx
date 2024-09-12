'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { EyeOpenIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { Table, type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { getLabTestResult } from '@psychplus/lab-orders/api.client'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { ErrorDialog } from '@psychplus/ui/error-dialog'
import { TableCellText } from '@psychplus/ui/table-cell'
import { ToastData, useToast } from '@/providers'
import { ResultsDialogWidgetClient } from '@/widgets/add-lab-orders-notes/components/add-results-dialog'
import {
  IndeterminateCheckbox,
  LabOrderFormModal,
  Pill,
  StatusComp,
} from '@/widgets/lab-order/components'
import { LabOrder, LabTest } from '@/widgets/lab-order/types'
import {
  removeDuplicates,
  searchTest,
  useDropdowns,
} from '@/widgets/lab-order/utils'
import { useStore } from '../store'
import { MenuItem, ResultData, WpcResultData } from '../types'
import { RowActionDropdown } from './data-table-row.action'

const getLabOrdersColumns = (
  handlerAddWpcResult: (WpcData: LabOrder) => void,
  handlerViewResult: (labTest: LabOrder) => void,
  handlerPlaceOrder: (labTestId: string) => void,
  handleToggle: (clickedItem: LabOrder, type: string) => void,
  toast: (data: ToastData) => void,
): ColumnDef<LabOrder>[] => [
  {
    accessorKey: 'testName',
    size: 30,
    minSize: 30,
    maxSize: 100,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Test/PanelName"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => {
      let testName = row.original?.testName ?? row.original?.orderingLab?.name
      if (testName && testName?.length > 30) {
        testName = `${testName?.slice(0, 30)}...`
      }
      return (
        <TableCellText
          className="overflow-hidden"
          isLight={true}
          text={testName}
        />
      )
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'labTestCode',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Test Code"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <>
        {row?.original?.testCode ||
          (row?.original?.labTestCode && (
            <TableCellText
              isLight={true}
              text={row?.original?.testCode || row?.original?.labTestCode}
            />
          ))}
      </>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'labOrderNumber',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lab Order #"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <>
        {row.original.labOrderNumber && (
          <TableCellText
            isLight={true}
            text={row?.original?.labOrderNumber.toString()}
          />
        )}
      </>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'orderingStaffName',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ordered by"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText isLight={true} text={row?.original?.orderingStaffName} />
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'labOrderDate',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <CreatedOnCell createdOn={row.original?.labOrderDate} />,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'orderingLab.name',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lab Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText isLight={true} text={row.original?.orderingLab?.name} />
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'orderStatus',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: StatusComp,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'Action',
    size: 15,
    minSize: 15,
    maxSize: 15,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Action"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <RowActionDropdown
        toast={toast}
        handlerAddWpcResult={handlerAddWpcResult}
        data={row}
        handleToggle={handleToggle}
        handlerPlaceOrder={handlerPlaceOrder}
      />
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'Results',
    size: 20,
    minSize: 20,
    maxSize: 20,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Results"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => {
      return row.original.labTestId ? (
        <Box
          className="!m-0 flex items-center gap-1 !bg-[#ffff] !p-0 !text-[#1c2024] hover:!bg-[#ffff]"
          onClick={() => handlerViewResult(row.original)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlerViewResult(row.original)
            }
          }}
        >
          <EyeOpenIcon />
          <TableCellText isLight={true} text={'View'} />
        </Box>
      ) : null
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'AddToNote',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column, table }) => (
      <Flex align="center" gap="1">
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onClick={table.getToggleAllRowsSelectedHandler()}
        />
        <DataTableColumnHeader
          column={column}
          title="Add To Note"
          className="text-[#000]"
        />
      </Flex>
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        isHeaderCheckBox={true}
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onClick={row.getToggleSelectedHandler()}
      />
    ),
    footer: (props) => props.column.id,
  },
]

const LabOrdersTable = ({
  appointmentId,
  orderId,
  patientId,
}: {
  appointmentId: string
  orderId: string
  patientId: string
}) => {
  const labOrder = useStore((state) => state.labOrders)
  const testsData = useStore((state) => state.tests)
  const { toast } = useToast()
  const [firstLabOrder] = labOrder || []
  const { labTests } = firstLabOrder || {}
  const updatedLabTest =
    labTests
      ?.filter((item) => item !== null && item?.recordStatus === 'Active')
      .map((item) => {
        if (!item || !item.id) return null
        return {
          ...item,
          labTestId: item.id,
          ...firstLabOrder,
          checked: true,
          disabled: true,
        }
      })
      .filter((item) => item !== null) || []

  const combinedData = [...updatedLabTest, ...testsData]

  const uniqueTestDataMap = new Map()

  combinedData.forEach((item) => {
    if (item && 'testName' in item) {
      const labTestItem = item as LabTest

      if (
        !uniqueTestDataMap.has(labTestItem.testName) ||
        labTestItem?.checked
      ) {
        uniqueTestDataMap.set(labTestItem.testName, labTestItem)
      }
    }
  })

  const uniqueTestData = Array.from(uniqueTestDataMap.values())
  const [selectedTests, setSelectedTests] = useState<LabOrder[]>(
    updatedLabTest?.filter(
      (item) => item !== null && 'testName' in item,
    ) as LabOrder[],
  )

  const [testData, setTestData] = useState<LabOrder[]>(uniqueTestData || [])
  const [submited, setSubmited] = useState({ isOpened: false, labTestId: '' })

  const [wpcEditData, setWpcEditData] = useState<ResultData[]>([])
  const [labTest, setLabTest] = useState<LabOrder>({} as LabOrder)
  const [isWpcModalOpened, setIsWpcModalOpened] = useState(false)
  const [viewWpcResult, setViewWpcResult] = useState(false)

  const [error, setError] = useState<string>('')
  const [openErrorDialog, setOpenErrorDialog] = useState(false)

  const closeDialog = () => setOpenErrorDialog(false)

  const handlerSubmit = (labTestId: string) => {
    setSubmited({ isOpened: true, labTestId })
  }

  const handlerAddWpc = (wpcData: LabOrder) => {
    setLabTest(wpcData)
    setIsWpcModalOpened(true)
  }

  const handlerClose = () => {
    setSubmited({ isOpened: false, labTestId: '' })
  }

  const handlerWpcClose = () => {
    setIsWpcModalOpened(false)
    setViewWpcResult(false)
  }

  const handlerViewResult = async (labTest: LabOrder | WpcResultData) => {
    if (appointmentId && orderId) {
      const payload = {
        labTestId: labTest.labTestId,
        orderId,
      }
      let resultData = await getLabTestResult(appointmentId, orderId, payload)
      resultData = resultData.filter((item) => item.recordStatus === 'Active')
      setWpcEditData(resultData)
      setLabTest(labTest)
      setIsWpcModalOpened(true)
      setViewWpcResult(true)
    }
  }
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleToggle = (clickedItem: LabOrder, type?: string) => {
    const nonNewSelectedTests = selectedTests.filter((test) => !test.newTest)
    if (
      nonNewSelectedTests.length === 1 &&
      clickedItem.disabled &&
      !clickedItem.newTest &&
      nonNewSelectedTests[0].labTestCode === clickedItem.labTestCode
    ) {
      setError('At least one existing test should remain in the lab order.')
      setOpenErrorDialog(true)
      return
    }
    const { papIndicator, temperatureType, disabled } = clickedItem
    if (disabled && type !== MenuItem.Delete) return
    const bothAreNotSameTypes = selectedTests.some(
      (item) =>
        (item.papIndicator === 'P' &&
          item.temperatureType === temperatureType) ||
        papIndicator === 'P',
    )
    if (bothAreNotSameTypes === false) {
      const hasPapIndicatorP = selectedTests.some(
        (item) => item.papIndicator === 'P' || papIndicator === 'P',
      )
      const hasDifferentTemperatureType = selectedTests.some(
        (item) => item.temperatureType !== temperatureType,
      )
      if (hasPapIndicatorP) {
        setError(
          "Create another order to add this test: PapIndicator 'P' exists.",
        )
        setOpenErrorDialog(true)
        return
      }

      if (hasDifferentTemperatureType) {
        setError(
          'Create another order to add this test: Different TemperatureType.',
        )
        setOpenErrorDialog(true)
        return
      }
    }
    const isAlreadySelected = selectedTests.some(
      (item: LabOrder) => item.labTestCode === clickedItem.labTestCode,
    )

    const updatedSelected = isAlreadySelected
      ? selectedTests.filter(
          (item: LabOrder) => item.labTestCode !== clickedItem.labTestCode,
        )
      : [
          ...selectedTests,
          {
            ...labOrder[0],
            ...clickedItem,
            newTest: true,
            checked: true,
            disabled: false,
            labOrderNumber: 0,
            orderStatus: 'Draft',
            orderSentDateTime: new Date().toISOString(),
          },
        ]

    setSelectedTests(updatedSelected)

    const updatedData = testData.map((item: LabOrder) =>
      item.labTestCode === clickedItem.labTestCode
        ? { ...item, checked: !item.checked }
        : item,
    )
    setSearchTerm('')
    setTestData(removeDuplicates(updatedData, 'labTestCode'))
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)

    if (value !== '') {
      const data = await searchTest(value)
      setTestData(data)
    }
  }

  const columns = useMemo(
    () =>
      getLabOrdersColumns(
        handlerAddWpc,
        handlerViewResult,
        handlerSubmit,
        handleToggle,
        toast,
      ),
    [updatedLabTest],
  )

  const { getDropdowns } = useStore()
  const { mapDropdowns } = useDropdowns(getDropdowns)
  const labBillingType = mapDropdowns('LabBillingType')
  const labOrderStatus = mapDropdowns('LabOrderStatus')

  return (
    <Box className="h-fit min-w-fit">
      {error && (
        <ErrorDialog
          text={error}
          isOpen={openErrorDialog}
          closeDialog={closeDialog}
        />
      )}
      <ResultsDialogWidgetClient
        handlerWpcClose={handlerWpcClose}
        viewWpcResult={viewWpcResult}
        labTest={labTest}
        isWpcModalOpened={isWpcModalOpened}
        wpcEditData={wpcEditData}
      />
      <LabOrderFormModal
        labBillingType={labBillingType}
        labOrderStatus={labOrderStatus}
        appointmentId={appointmentId}
        orderId={orderId}
        patientId={patientId}
        testsData={testsData}
        labTestId={submited.labTestId}
        labOrderData={selectedTests}
        isEdit={true}
        active={submited.isOpened}
        handlerClose={handlerClose}
      />
      <Box m="2" width="100%">
        <Flex align="center" justify="between">
          <Box>
            <Flex>
              <Flex align="center">
                <Text size="2" mr="2" weight="medium">
                  Lab Tests
                </Text>
                <TextField.Root
                  className="h-30 text-1"
                  value={searchTerm}
                  placeholder={'Search for label tests'}
                  onChange={handleChange}
                />
              </Flex>
              <Box>
                <Flex>
                  {testData
                    ? testData
                        .slice(0, 8)
                        .map((item: LabOrder) => (
                          <Pill
                            key={item.testName}
                            onToggle={() => handleToggle(item)}
                            checked={item.checked}
                            text={item.testName}
                          />
                        ))
                    : null}
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Button
            variant="outline"
            highContrast
            onClick={() => handlerSubmit('labtestid')}
            className="h-25 mr-2 flex items-center gap-1 border border-[#B9BBC6] text-1"
          >
            <Pencil1Icon />
            Sign All Pre-Orders
          </Button>
        </Flex>
      </Box>
      <Box className="ml-2">
        <DataTable
          data={selectedTests}
          columns={columns}
          tableClass="border border-solid border-[#CAD8FD]"
          tHeadClass="bg-[#EBF3FC] text-start"
          thClass="border-b border-r border-solid border-[#CAD8FD] text-start font-light"
          toBodyClass="border-[#CAD8FD] border-b border-solid"
          columnCellClass="border border-solid border-[#CAD8FD] font-light"
          renderFooter={DataTableFooter}
        />
      </Box>
    </Box>
  )
}

export { LabOrdersTable }

const CreatedOnCell = ({ createdOn }: { createdOn?: string }) => {
  if (!createdOn) return null
  const formattedDate = format(new Date(createdOn), 'MM/dd/yyyy')
  return <TableCellText isLight={true} text={formattedDate} />
}

const DataTableFooter = (table: Table<LabOrder>) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)
