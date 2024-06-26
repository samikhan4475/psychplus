import { useEffect, useState } from 'react'
import {
  IdCardIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { Box, Flex, Strong, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSelect,
  FormSubmitButton,
  useForm,
  validate,
} from '@psychplus/form'
import { Button } from '@psychplus/ui/button'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  type RowAction,
} from '@psychplus/ui/data-table'
import { DatePicker } from '@psychplus/ui/date-picker'
import { TableCellText } from '@psychplus/ui/table-cell'
import { getPreferredPartnerServicesHistory } from '../../api.client'
import { useStore } from '../../store'
import { PatientTransactions, ServicesHistory } from '../../types'
import { AddServicesCustomChargeDialog } from '../add-services-custom-charge'
import { AddServicesPaymentDialog } from '../add-services-payment'
import { ServicesRowActionDelete } from './services-row-action-delete'
import { ServicesRowActionEdit } from './services-row-action-edit'
import '../../prefferred.css'

const rowActions: RowAction<PatientTransactions>[] = [
  {
    id: 'services-row-action-edit',
    render: ServicesRowActionEdit,
  },
  {
    id: 'services-row-action-delete',
    render: ServicesRowActionDelete,
  },
]

const DataTableHeader = () => {
  const [customCharge, setCustomCharge] = useState(false)
  const [payment, setPayment] = useState(false)

  return (
    <>
      <AddServicesCustomChargeDialog
        setIsDialogOpen={setCustomCharge}
        isopen={customCharge}
      />
      <AddServicesPaymentDialog
        setIsDialogOpen={setPayment}
        isDialogOpen={payment}
      />
      <Flex justify="between" py="3">
        <Flex align="center" gap="4">
          <Text as="label">
            <Strong>Services History</Strong>
          </Text>
        </Flex>
        <Flex align="center" gap="4">
          <Button
            onClick={() => setPayment(true)}
            className="bg-transparent text-[#101D46]"
          >
            <IdCardIcon />
            Payment
          </Button>
          <Button
            onClick={() => setCustomCharge(true)}
            style={{
              color: '#101D46',
              background: 'none',
              borderColor: '#101D46',
            }}
            variant="outline"
          >
            <PlusIcon />
            Add Custom Charge
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

const columns: ColumnDef<any>[] = [
  {
    id: 'dos',
    accessorKey: 'dos',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.chargeDate} />,
  },
  {
    id: 'username',
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Username"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.patientName?.firstName} />
    ),
  },
  {
    id: 'mrn',
    accessorKey: 'mrn',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="MRN #"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.transactionNumber} />,
  },
  {
    id: 'chargeType',
    accessorKey: 'chargeType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Charge Type"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.type} />,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.description} />,
  },

  {
    id: 'payerStatus',
    accessorKey: 'payerStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Payer Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.payerStatus} />,
  },
  {
    id: 'copay',
    accessorKey: 'copay',
    header: ({ column }) => (
      <>
        <DataTableColumnHeader
          column={column}
          title="Copay"
          className="text-[#000]"
        />

        <Flex direction="row">
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PP</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PT</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Paid</Text>
          </Box>
        </Flex>
      </>
    ),
    cell: ({ row }) => (
      <Flex direction="row">
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
      </Flex>
    ),
  },
  {
    id: 'coinsurance',
    accessorKey: 'coinsurance',
    header: ({ column }) => (
      <>
        <DataTableColumnHeader
          column={column}
          title="Coinsurance"
          className="text-[#000]"
        />
        <Flex direction="row">
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PP</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PT</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Paid</Text>
          </Box>
        </Flex>
      </>
    ),
    cell: ({ row }) => (
      <Flex direction="row">
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
      </Flex>
    ),
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }) => (
      <>
        <DataTableColumnHeader
          column={column}
          title="Balance"
          className="text-[#000]"
        />

        <Flex direction="row">
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PP</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Due PT</Text>
          </Box>
          <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
            <Text>Paid</Text>
          </Box>
        </Flex>
      </>
    ),
    cell: ({ row }) => (
      <Flex direction="row">
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
        <Box className="flex-1 border-t-[0.5px] border-[#CAD8FD]">
          <Text>$0.00</Text>
        </Box>
      </Flex>
    ),
  },
  {
    id: 'transactionNumber',
    accessorKey: 'transactionNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Transaction Number"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.transactionNumber} />,
  },
  {
    id: 'updatedBy',
    accessorKey: 'updatedBy',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated by"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.metadata.updatedByFullName} />
    ),
  },

  {
    id: 'updatedDate',
    accessorKey: 'updatedDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.metadata.updatedOn} />,
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Action"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} actions={rowActions} />,
  },
]

const ServicesHistoryTable = () => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const refreshServicesHistory: boolean = useStore(
    (state) => state.refreshServicesHistory,
  )

  const servicesHistoryPopup: boolean = useStore(
    (state) => state.servicesHistoryPopup,
  )

  const setServicesHistoryPopup = useStore(
    (state) => state.setServicesHistoryPopup,
  )

  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const [paymentsData, setPaymentsData] = useState<ServicesHistory>()
  const [filters, setFilters] = useState<any>([])

  useEffect(() => {
    init()
  }, [filters, refreshServicesHistory])

  const init = async () => {
    const request = {
      preferredPartnerId,
      startDate: `${fromDate}`,
      endDate: `${toDate}`,
      transactionTypes: filters.transactionTypes || [],
      preferredPartnerIds: [preferredPartnerId],
    }

    const data = await getPreferredPartnerServicesHistory(request)
    setPaymentsData(data)
  }

  const schema = z.object({
    dateRange: validate.nullOrString,
    chargeType: validate.nullOrString,
  })

  type SchemaType = z.infer<typeof schema>

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      dateRange: undefined,
      chargeType: undefined,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setFilters({
      startDate: fromDate,
      endDate: toDate,
      transactionTypes: [data.chargeType],
    })
  }

  const onClear = () => {
    setFilters([])
  }

  const setIsDialogOpen = () => {
    setServicesHistoryPopup(false)
  }

  return (
    <>
      <AddServicesCustomChargeDialog
        setIsDialogOpen={setIsDialogOpen}
        isopen={servicesHistoryPopup}
      />
      <Flex direction="column">
        <DataTableHeader />
      </Flex>

      <Flex gap="8" className="bg-[#F5FAFF] p-2 text-[20px]">
        <Flex>
          <Box className="flex-1">
            Total Due{' '}
            <Text className="font-bold">
              ${paymentsData?.totalDue || '0.00'}
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box className="flex-1">
            (Balance){' '}
            <Text className="font-bold">
              ${paymentsData?.balance || '0.00'}
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box className="flex-1">
            Unapplied Payment{' '}
            <Text className="font-bold">
              ${paymentsData?.unappliedPayment || '0.00'}
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box className="flex-1">
            Total Payment{' '}
            <Text className="font-bold">
              ${paymentsData?.totalPayment || '0.00'}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex gap="1">
        <Form form={form} onSubmit={onSubmit}>
          <Flex direction="column" gap="4" mb="4">
            <Flex
              direction={'column'}
              className="rounded border border-[#F3F3F3]"
            >
              <Flex gap="1">
                <Box className="flex-1">
                  <Flex direction="column">
                    <Flex align="center" id="address1" gap="2">
                      <Box className="flex-1">
                        <FormSelect
                          size="2"
                          label=""
                          placeholder="Date Range"
                          data-testid="add-credit-card-type"
                          options={[
                            { value: '30', label: '30' },
                            { value: '60', label: '60' },
                            { value: '90', label: '90' },
                            { value: '180', label: '180' },
                          ]}
                          {...form.register('dateRange')}
                        />
                      </Box>
                      <Box className="flex-1">
                        <DatePicker
                          date={fromDate}
                          onSelect={setFromDate}
                          buttonClassName="w-[150px] justify-between text-left font-regular"
                          reverse={true}
                          color="gray"
                        />
                      </Box>
                      <Box className="flex-1">
                        <DatePicker
                          date={toDate}
                          onSelect={setToDate}
                          buttonClassName="w-[150px] justify-between text-left font-regular"
                          reverse={true}
                          color="gray"
                        />
                      </Box>
                      <Box className="flex-1">
                        <FormSelect
                          size="2"
                          label=""
                          placeholder="Charge type"
                          data-testid="add-credit-card-type"
                          options={[
                            { value: 'Letter', label: 'Letter' },
                            { value: 'Records', label: 'Records' },
                            { value: 'Custom', label: 'Custom' },
                            { value: 'Visit', label: 'Visit' },
                          ]}
                          {...form.register('chargeType')}
                        />
                      </Box>
                      <Box className="flex-1">
                        <FormSubmitButton
                          size="2"
                          data-testid="add-claim-status-submit-button"
                          className="bg-[#101D46]"
                        >
                          <MagnifyingGlassIcon />
                        </FormSubmitButton>
                      </Box>
                      <Box>
                        <Button
                          size="2"
                          className="bg-[#EAEEF9] text-[#151B4A]"
                          onClick={onClear}
                        >
                          Clear
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Flex>
      <DataTable
        data={paymentsData?.patientTransactions || []} //
        columns={columns}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        isPreferredPartnerTable={true}
      />
    </>
  )
}

export { ServicesHistoryTable }
