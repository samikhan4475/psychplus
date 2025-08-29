import { Badge, EmptyFileIcon } from '@/components-v2'
import { DataTable } from '@/components-v2/data-table'
import { TableColumn } from '@/features/appointments/avs/types'
import { TextCell } from '@/features/appointments/avs/ui/components/text-cell'
import {
  InsuranceChipVariantType,
  InsurancePayer,
  InsurancePolicy,
} from '@/features/billing/payments/types'
import { InsuranceForm } from '@/features/billing/payments/ui/insurance-card/insurance-form'
import { Flex, Text } from '@radix-ui/themes'

const InsuranceList = ({
  patientInsurances,
  insurancePayers,
  isCall = false
}: {
  patientInsurances: InsurancePolicy[]
  insurancePayers: InsurancePayer[]
  isCall?: boolean
}) => {
  const columns: TableColumn<InsurancePolicy>[] = [
    {
      key: 'isPrimary',
      label: 'Priority',
      enableSorting: true,
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => (
        <InsuranceForm
          insurance={row}
          insurancePayers={insurancePayers}
          isList
          isCall={isCall}
        />
      ),
    },
    {
      key: 'name',
      label: 'Payer',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => {
        return <TextCell>{row?.payerName}</TextCell>
      },
    },
    {
      key: 'numberLastFour',
      label: 'insurance Plan',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => {
        return <TextCell>{row?.policyName}</TextCell>
      },
    },
    {
      key: 'exp',
      label: 'Member ID',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => {
        return <TextCell>{row?.memberId}</TextCell>
      },
    },
    {
      key: 'cardStatus',
      label: 'Verification Status',
      accessorFn: (row) => new Date(row.metadata.createdOn),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.metadata.createdOn)
        const dateB = new Date(rowB.metadata.createdOn)
        return dateA.getTime() - dateB.getTime()
      },
      render: (row) => (
        <Badge
          label={row.verificationStatus}
          type={
            InsuranceChipVariantType[
              row.verificationStatus as keyof typeof InsuranceChipVariantType
            ]
          }
          addIcon={false}
          className="w-fit"
        />
      ),
    },
  ]

  return (
    <Flex direction="column" gap="2" mb="4">
      <Text size="4">List of Insurance</Text>
      <DataTable
        columns={columns}
        data={patientInsurances}
        emptyDescription="No Insurance added"
        EmptyIcon={EmptyFileIcon}
        getRowKey={(row) => String(row?.id)}
        enableSorting
      />
    </Flex>
  )
}

export default InsuranceList
