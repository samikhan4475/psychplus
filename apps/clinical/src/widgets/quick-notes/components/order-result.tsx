'use client'

import { Dispatch, SetStateAction, useRef } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Table, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useReactToPrint } from 'react-to-print'
import { Code, LabOrder } from '@psychplus/lab-orders/types'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { Dialog } from '@psychplus/ui/dialog'
import { DropType } from '@/widgets/add-lab-orders-notes/types'
import { printResultStyle } from '@/widgets/lab-order/constants'
import {
  useFetchLabLocationData,
  useProviderUsingAppointmentId,
} from '@/widgets/lab-order/hooks'
import { LabOrderData } from '../types'

const columns: ColumnDef<LabOrderData>[] = [
  {
    id: 'Panel Name',
    size: 30,
    minSize: 30,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Test/Panel Name"
        className="text-[#000]"
      />
    ),

    cell: ({ row }) => row.original.panelName,
    enableHiding: true,
  },
  {
    id: 'test code',
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
    cell: ({ row }) => row.original.testCode,
    enableHiding: true,
  },
  {
    id: 'lab order#',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lab Order#"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => row.original.labOrderNumber,
    enableHiding: true,
  },

  {
    id: 'ordered by',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ordered By"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => row.original.orderedBy,
    enableHiding: true,
  },
  {
    id: 'orderDateAndTime',
    size: 30,
    minSize: 20,
    maxSize: 30,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order Date & Time"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => row.original.orderDateAndTime,
    enableHiding: true,
  },

  {
    id: 'labLocation',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lab Location"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => row.original.labLocation,
    enableHiding: true,
  },
  {
    id: 'status',
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
    cell: ({ row }) => row.original.status,
    enableHiding: true,
  },
]

const column2 = [
  'Test/Panel Name',
  'Result Code',
  'Date / Time',
  'Result/unit',
  'Ref. Range',
  'Flag',
  'Status',
]

const OrderResult = ({
  isOpen,
  onOpenChange,
  labOrder,
  resultFlags,
  resultStatus,
}: {
  resultFlags?: Code[]
  resultStatus?: Code[]
  isOpen: boolean
  labOrder?: LabOrder | null
  onOpenChange: Dispatch<SetStateAction<{ type: string; data: any }>>
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => printResultStyle,
  })
  const { labLocation } = useFetchLabLocationData()

  const location = labLocation.find(
    (item) => item.locationId === labOrder?.orderingLab?.locationId,
  )
  const { provider } = useProviderUsingAppointmentId(
    labOrder?.appointmentId?.toString(),
  )
  const labOrdersData =
    labOrder?.labTests &&
    labOrder?.labTests.map((test) => {
      return {
        id: test?.id,
        panelName: test?.testName || '-',
        testCode: test?.labTestCode || '-',
        labOrderNumber: labOrder?.labOrderNumber || '-',
        orderedBy: provider?.physicianName || '-',
        userName:
          labOrder?.patient?.legalName.firstName &&
          labOrder?.patient?.legalName.lastName
            ? `${labOrder.patient.legalName.firstName} ${labOrder.patient.legalName.lastName}`
            : '-',
        orderDateAndTime: labOrder?.labOrderDate
          ? format(new Date(labOrder.labOrderDate), 'MM/dd/yyyy HH:MM')
          : '-',
        labLocation: location?.name || '-',
        status: labOrder?.recordStatus || '-',
      }
    })

  const handlerClose = () => {
    onOpenChange({ type: '', data: null })
  }

  const updatedLabTests =
    labOrder?.labTests &&
    labOrder?.labTests.map((labTest) => {
      return {
        ...labOrder,
        ...labTest,
        labResults: labOrder?.labResults?.filter(
          (result) => result.labTestId === labTest.id,
        ),
      }
    })
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content
        ref={componentRef}
        className="bg-white shadow-lg rounded-md fixed left-1/2 top-1/2 h-[80vh] w-[80vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto border p-6"
      >
        <Dialog.Close
          onClick={handlerClose}
          className="hidden-object absolute right-8 top-8 h-[10px] w-[12px] cursor-pointer"
        >
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title className="text-lg font-semibold">
          Actual Note View{' '}
        </Dialog.Title>
        <Dialog.Description className="text-sm mt-2">
          <Flex direction="column">
            <Text className="font-bold">Psychiatric Evaluation</Text>
            <Text>
              <Text className="font-bold">Visit Type:</Text>{' '}
              {labOrder?.appointment?.type}
            </Text>
            <Text>
              <Text className="font-bold">Provider:</Text>{' '}
              {provider?.physicianName}
            </Text>
            <Text>
              <Text className="font-bold">Location:</Text>{' '}
              {labLocation && labLocation[0]?.name}
            </Text>
            <Flex align="center" gap="3">
              <Text>
                <Text className="font-bold">Date :</Text>{' '}
                {labOrder?.labOrderDate &&
                  format(new Date(labOrder?.labOrderDate), 'MM/dd/yyyy')}
              </Text>
              <Text>
                <Text className="font-bold">Time :</Text>{' '}
                {labOrder?.labOrderDate &&
                  format(new Date(labOrder?.labOrderDate), 'HH:MM:SS')}
              </Text>
            </Flex>

            <Text>
              <Text className="font-bold">Patient:</Text>{' '}
              {`${labOrder?.patient?.legalName.firstName} ${labOrder?.patient?.legalName.lastName}`}
            </Text>
            <Text>
              <Text className="font-bold">DOB:</Text>{' '}
              {labOrder?.patient?.birthdate}
            </Text>
          </Flex>
          <Text className="mt-4 font-bold">Lab Orders</Text>
          <Box className=" overflow-x-auto">
            <DataTable
              data={labOrdersData || []}
              columns={columns}
              tableClass="border border-solid border-[lightgray] "
              tHeadClass="bg-[#EBF3FC]"
              thClass="border-b border-r border-solid border-[#C1E2FF] text-left font-light"
              isRowPan={true}
              toBodyClass="border-[lightgray]; border-b border-solid "
              columnCellClass="border border-solid border-[#F2F2F2] w-50 font-light"
            />
          </Box>
          <Box className="mt-4 overflow-x-auto">
            <Text className="font-bold">Lab Results</Text>
            <Table.Root size="1">
              <Table.Header>
                <Table.Row>
                  {column2.map((filteredName) => (
                    <Table.ColumnHeaderCell
                      className="!h-[10px] border border-b border-r border-solid border-[#000] border-[#C1E2FF] bg-[#EBF3FC] p-0 text-left text-[11px] font-medium"
                      key={filteredName}
                    >
                      {filteredName}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {updatedLabTests?.map((item) => {
                  console.log(
                    item.labOrderDate &&
                      format(new Date(item.labOrderDate), 'MM/dd/yyyy HH:MM'),
                    'skjdlfjlkdsf',
                    item,
                  )
                  return (
                    <>
                      {/* Row for the test data */}
                      <Table.Row key={item.id}>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left">
                          {item.testName}
                        </Table.Cell>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"></Table.Cell>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"></Table.Cell>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"></Table.Cell>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"></Table.Cell>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"></Table.Cell>
                        <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"></Table.Cell>
                      </Table.Row>

                      {/* Rows for each test result */}
                      {item?.labResults?.length &&
                      item?.labResults?.length > 0 ? (
                        item.labResults.map((result) => {
                          const flagStatus = resultFlags?.find(
                            (item: DropType) =>
                              item?.code === result?.abnormalRangeCode,
                          )
                          const status = resultStatus?.find(
                            (item: DropType) =>
                              item?.code === result?.statusCode,
                          )
                          return (
                            <>
                              <Table.Row
                                key={result.id}
                                className="bg-[#F2F2F2]"
                              >
                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left ">
                                  {result.resultValue}
                                </Table.Cell>
                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left">
                                  {result?.resultCode}
                                </Table.Cell>
                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left ">
                                  {item.labOrderDate &&
                                    format(
                                      new Date(item.labOrderDate),
                                      'MM/dd/yyyy HH:MM',
                                    )}
                                </Table.Cell>

                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left ">
                                  {`${result.valueDescription} ${result.resultValueUnit}`}
                                </Table.Cell>

                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left ">
                                  {result.recomendedValue}
                                </Table.Cell>

                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left">
                                  {status?.displayName?.slice(0, 35)}
                                </Table.Cell>

                                <Table.Cell className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left">
                                  {flagStatus?.displayName?.slice(0, 35)}
                                </Table.Cell>
                              </Table.Row>
                              <Table.Row className="bg-[#f1f1f1]">
                                <Table.Cell
                                  colSpan={7}
                                  className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"
                                >
                                  Note: {result?.physicianComments}
                                </Table.Cell>
                              </Table.Row>
                            </>
                          )
                        })
                      ) : (
                        <Table.Row className="bg-[#F2F2F2]">
                          <Table.Cell
                            colSpan={7}
                            className="h-[10px] border border-r border-solid border-[#e9e9e9] px-1 py-1 text-left"
                          >
                            No results available
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        </Dialog.Description>
        <Box className="mt-4 flex justify-end gap-2">
          <Button
            type="submit"
            onClick={handlerClose}
            className="hidden-object rounded-2 bg-[#151B4A] px-4 py-2 text-2 font-regular text-[white]"
          >
            Close
          </Button>
          <Button
            onClick={handlePrint}
            className="hidden-object rounded-2 bg-[#151B4A] px-4 py-2 text-2 font-regular text-[white]"
          >
            Print
          </Button>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default OrderResult
