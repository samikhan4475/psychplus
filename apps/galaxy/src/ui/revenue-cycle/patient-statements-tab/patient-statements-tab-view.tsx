'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { PatientStatementsListFilterForm } from './patient-statements-list-filter-form'
import { PatientStatementsListTable } from './patient-statements-list-table'
import { PatientStatementsListTablePagination } from './patient-statements-list-table-pagination'

const PatientStatementsTabView = () => {
  return (
    <>
      <Flex direction="column" className="gap-0.5">
        <TabContentHeading title="Patient Statements" />
      </Flex>
      <Flex direction="column" gap="1" className="bg-white w-full py-1 flex-1">
        <PatientStatementsListFilterForm />
        <PatientStatementsListTable />
        <PatientStatementsListTablePagination />
      </Flex>
    </>
  )
}

export { PatientStatementsTabView }
