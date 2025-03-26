'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getDateString } from '@/ui/schedule/utils'
import { getCalendarDate } from '@/utils'
import { getLicenseHistoryAction, GetLicenseHistoryParams } from '../../actions'
import { useStore } from '../../store'
import { License } from '../../types'
import { columns } from './columns'
import { FilterForm, LicenseHistorySchemaType } from './filter-form'

const LicenseHistoryTable = () => {
  const [licenses, setLicenses] = useState<License[]>([])
  const { historyRow } = useStore()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async (filters?: LicenseHistorySchemaType) => {
    if (!historyRow) return
    setLoading(true)
    const payload: GetLicenseHistoryParams = {
      id: historyRow.id,
      historyCreatedFrom: filters?.historyCreatedFrom
        ? getDateString(filters?.historyCreatedFrom)
        : null,
      historyCreatedTo: filters?.historyCreatedTo
        ? getDateString(filters?.historyCreatedTo)
        : null,
    }
    const result = await getLicenseHistoryAction(payload)
    setLoading(false)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching history')
      return
    }
    const { licenses = [] } = result.data
    const data = licenses.map((license) => {
      return {
        ...license,
        startDate: getCalendarDate(license?.startDate),
        endDate: getCalendarDate(license?.endDate),
      }
    })
    setLicenses(data)
  }

  return (
    <Flex direction="column" className="gap-1">
      <FilterForm getHistory={getHistory} />

      <ScrollArea className="bg-white min-h-[100px] max-w-[calc(100vw_-_198px)] py-2">
        {loading ? (
          <LoadingPlaceholder className="bg-white min-h-[20vh]" />
        ) : (
          <DataTable
            columns={columns}
            data={licenses}
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
