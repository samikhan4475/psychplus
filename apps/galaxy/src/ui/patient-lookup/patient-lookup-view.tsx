'use client'

import { Flex } from '@radix-ui/themes'
import { PatientFilterForm } from './patient-filter-form'
import { PatientLookupHeader } from './patient-header'
import { PatientLookupTable } from './patient-lookup-table'
import { PatientLookupTablePagination } from './patient-lookup-table-pagination'

const PatientLookupView = () => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <PatientLookupHeader />
      <PatientFilterForm />
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <PatientLookupTable />
        <PatientLookupTablePagination />
      </Flex>
    </Flex>
  )
}

export { PatientLookupView }
