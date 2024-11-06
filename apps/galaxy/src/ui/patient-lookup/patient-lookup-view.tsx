'use client'

import { Flex } from '@radix-ui/themes'
import { PatientFilterForm } from './patient-filter-form'
import { PatientLookupHeader } from './patient-header'
import { PatientLookupTable } from './patient-lookup-table'
import { PatientLookupTablePagination } from './patient-lookup-table-pagination'

interface PatientLookupViewProps {
  googleApiKey: string
}
const PatientLookupView = ({ googleApiKey }: PatientLookupViewProps) => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <PatientLookupHeader googleApiKey={googleApiKey} />
      <PatientFilterForm />
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <PatientLookupTable />
        <PatientLookupTablePagination />
      </Flex>
    </Flex>
  )
}

export { PatientLookupView }
