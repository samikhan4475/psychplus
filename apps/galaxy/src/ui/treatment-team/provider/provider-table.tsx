'use client'

import { Flex } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { ProviderTeam } from '../actions/get-providers-of-patients'
import { TableHeader } from '../table-header'
import { columns } from './columns'

const ProviderTable = ({
  isPsychiatry = false,
  data,
  patientId,
}: {
  isPsychiatry?: boolean
  data: ProviderTeam[]
  patientId: string
}) => {
  const heading = isPsychiatry ? 'Psychiatrist' : 'Therapist'

  return (
    <Flex
      className="bg-white  min-h-[150px] max-w-[calc(100vw_-_198px)] p-2"
      direction="column"
    >
      <TableHeader heading={isPsychiatry ? 'Psychiatry' : 'Therapy'} />
      <DataTable
        columns={columns(heading, patientId, isPsychiatry)}
        data={data}
        tdClass="!p-0"
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

export { ProviderTable }
