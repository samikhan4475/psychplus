'use client'

import { Flex } from '@radix-ui/themes'
import { FilterForm } from './filter-form'
import { VacationTablePagination } from './vacation-table-pagination'
import { VacationTimeHeader } from './vacation-time-header'
import { VacationTimeTable } from './vacation-time-table'

interface VacationTimeTabProps {
  staffId: string
}
const VacationTimeTab = ({ staffId }: VacationTimeTabProps) => {
  return (
    <Flex direction="column" gap="1" flexGrow="1">
      <VacationTimeHeader staffId={staffId} />
      <FilterForm />
      <Flex
        direction="column"
        height="100%"
        className="bg-white h-[calc(100dvh-253px)] rounded-1"
      >
        <VacationTimeTable />
        <VacationTablePagination />
      </Flex>
    </Flex>
  )
}

export { VacationTimeTab }
