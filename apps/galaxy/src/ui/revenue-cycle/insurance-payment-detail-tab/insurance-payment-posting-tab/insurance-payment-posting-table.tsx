import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  FormContainer,
  TextCell,
} from '@/components'
import { DollarIcon } from '@/components/icons'
import { formatDate } from '@/utils'
import { useStore } from '../../insurance-payment-tab/store'
import { useStore as TabStore } from '../../store'
import { ClaimServiceLinePayment } from '../../types'
import CancelButton from './cancel-button'
import {
  AdjustmentReasonRemarkCell,
  AllowedAmountCell,
  BalanceAmountCell,
  CoInsuranceAmountCell,
  CopayAmountCell,
  DeductibleAmountCell,
  OtherprAmountCell,
  PaidAmountCell,
  WriteoffAmountCell,
} from './cells'
import { SaveAndPostButton } from './save-and-post-button'
import { SaveButton } from './save-button'
import { schema, SchemaType } from './schema'

const columns: ColumnDef<ClaimServiceLinePayment>[] = [
  {
    id: 'chargeId',
    header: ({ column }) => (
      <ColumnHeader
        className="w-[75px]"
        column={column}
        label="Service Line #"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="flex w-[108px] items-center">
        {row.original.chargeId}
      </TextCell>
    ),
  },
  {
    id: 'dateOfServiceFrom',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="DOS From" />
    ),
    cell: ({ row }) => (
      <DateCell className="w-[108px]">
        {formatDate(row.original.dateOfServiceFrom.toString(), 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'dateOfServiceTo',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="DOS To" />
    ),
    cell: ({ row }) => (
      <DateCell className="w-[108px]">
        {formatDate(row.original.dateOfServiceTo.toString(), 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'cptCode',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Procedure" />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[108px]">{row.original.cptCode}</TextCell>
    ),
  },
  {
    id: 'totalAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[75px]"
        label="Billed Amount"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="flex w-[108px] items-center">
        <DollarIcon />
        {row.original.totalAmount}
      </TextCell>
    ),
  },
  {
    id: 'allowedAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[110px]"
        label="Allowed Amount"
      />
    ),
    cell: AllowedAmountCell,
  },
  {
    id: 'paidAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} className="w-[75px]" label="Paid Amount" />
    ),
    cell: PaidAmountCell,
  },
  {
    id: 'balanceAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[110px]"
        label="Balance Amount"
      />
    ),
    cell: BalanceAmountCell,
  },
  {
    id: 'copayAmount',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Copay" />
    ),
    cell: CopayAmountCell,
  },
  {
    id: 'coinsuranceAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Co-Insurance" />
    ),
    cell: CoInsuranceAmountCell,
  },
  {
    id: 'deductibleAmount',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Deductible" />
    ),
    cell: DeductibleAmountCell,
  },
  {
    id: 'otherPR',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Other-PR" />
    ),
    cell: OtherprAmountCell,
  },
  {
    id: 'writeOffAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[120px]"
        label="Adjustment Amount"
      />
    ),
    cell: WriteoffAmountCell,
  },
  {
    id: 'adj-reason-remark',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Adjustment/Reason/Remark Code" />
    ),
    cell: AdjustmentReasonRemarkCell,
  },
]

const InsurancePaymentPostingTable = () => {
  const activeTab = TabStore((state) => state.activeTab)
  const { setPaymentPostingClaim, paymentPostingClaim } = useStore((state) => ({
    setPaymentPostingClaim: state.setPaymentPostingClaim,
    paymentPostingClaim: state.paymentPostingClaim[activeTab],
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onBlur',
    defaultValues: {
      id: '',
      recordStatus: '',
      paymentId: '',
      claimId: '',
      paymentSource: '',
      insurancePolicyId: '',
      processedAsCode: '',
      insuranceInternalControlNumber: '',
      status: '',
      billedAmount: 0,
      allowedAmount: 0,
      paidAmount: 0,
      copayAmount: 0,
      coinsuranceAmount: 0,
      deductibleAmount: 0,
      otherPr: 0,
      writeOffAmount: 0,
      claimServiceLinePayments: paymentPostingClaim?.claimServiceLines, // Initial data
    },
  })

  const onSubmit = (data: SchemaType) => {
    // TODO : NEED API IMPLEMENTATION HERE (data, claimPostingId -> ID FOR GET DATA HERE)
  }

  const onCancel = () => {
    setPaymentPostingClaim(activeTab, paymentPostingClaim)
  }

  return (
    <Flex direction="column">
      <Text mb="1" size="3" weight="bold">
        Service Lines
      </Text>
      <FormContainer form={form} onSubmit={onSubmit}>
        <ScrollArea className="max-w-[calc(100vw-16px)]">
          <DataTable
            data={form.getValues('claimServiceLinePayments') ?? []}
            columns={columns}
            disablePagination
            sticky
          />
        </ScrollArea>
        <Flex justify="end" gapX="3" mt="3">
          <CancelButton onClick={onCancel} />
          <SaveButton />
          <SaveAndPostButton />
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { InsurancePaymentPostingTable }
