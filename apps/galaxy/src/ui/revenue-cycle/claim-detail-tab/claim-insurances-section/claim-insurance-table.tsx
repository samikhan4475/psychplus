import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { columns as getColumns } from './table-columns'

const ClaimInsuranceTable = () => {
  const { watch } = useFormContext()
  const claimInsurancePolicies = watch('claimInsurancePolicies') || []

  return <DataTable columns={getColumns()} data={claimInsurancePolicies} />
}

export { ClaimInsuranceTable }
