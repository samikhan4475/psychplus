'use client'

import { Flex } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { CareTeam } from '@/ui/staff-treatment-team/care-teams/types'
import { TableHeader } from '../table-header'
import { columns } from './columns'

const StaffTable = ({
  data,
  isAdmin = false,
}: {
  data: CareTeam[]
  isAdmin?: boolean
}) => {
  const heading = isAdmin ? 'Admin' : 'Clinical Support Staff'

  return (
    <Flex
      className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2"
      direction="column"
    >
      <TableHeader heading={heading} />
      <DataTable
        columns={columns(heading)}
        data={data}
        tdClass="!py-0 pr-0"
        isRowSpan
        sticky
        disablePagination
        tableRowClass="border-b border-red-200"
        tableClass="w-[90%] sm:w-[80%] md:w-[50%]"
        theadClass="z-10"
        defaultSorting={[{ id: 'added-on', desc: true }]}
      />
    </Flex>
  )
}

export { StaffTable }
