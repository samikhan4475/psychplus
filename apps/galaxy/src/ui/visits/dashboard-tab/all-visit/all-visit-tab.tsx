'use client'

import { Box } from '@radix-ui/themes'
import { AllVisitListTablePagination } from './all-visit-list-table-pagination'
import { AllVisitsListFilterForm } from './all-visits-list-filter-form'
import { AllVisitsListTable } from './all-visits-list-table'

const AllVisit = () => {
  return (
    <>
      <AllVisitsListFilterForm />
      <Box className="bg-white pt-1">
        <AllVisitsListTable />
        <AllVisitListTablePagination />
      </Box>
    </>
  )
}

export { AllVisit }
