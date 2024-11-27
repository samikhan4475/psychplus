'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getCalendarDate } from '@/utils'
import { getLicenseHistoryAction } from '../../actions'
import { LicenseHistory as LicenseHistoryType } from '../../types'
import { columns } from './columns'
import { FilterForm } from './filter-form'

const LicenseHistoryTable = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<LicenseHistoryType[]>([])
  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async () => {
    setLoading(true)
    const res = await getLicenseHistoryAction({
      staffId: 1,
      payload: {},
    })
    setLoading(false)
    if (res.state === 'error') {
      toast.error(res.error ?? 'Error while fetching data')
      return setLoading(false)
    }
    setData(
      res.data.map((license) => ({
        ...license,
        createdAt: getCalendarDate(license.createdAt),
        startDate: getCalendarDate(license.startDate),
        endDate: getCalendarDate(license.endDate),
      })),
    )
  }

  return (
    <Flex direction="column" className="gap-1">
      <FilterForm />

      <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] py-2">
        {loading ? (
          <LoadingPlaceholder className="bg-white min-h-[46vh]" />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            tdClass="!p-0"
            isRowSpan
            sticky
            disablePagination
            tableRowClass="border-b border-red-200"
          />
        )}
      </ScrollArea>
    </Flex>
  )
}

export { LicenseHistoryTable }
