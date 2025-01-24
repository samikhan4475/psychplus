'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getDateString } from '@/ui/schedule/utils'
import { getCalendarDate } from '@/utils'
import { getLicensesAction, GetLicensesParams } from '../../actions'
import { useStore } from '../../store'
import { License } from '../../types'
import { columns } from './columns'
import { FilterForm, LicenseHistorySchemaType } from './filter-form'

const LicenseHistoryTable = ({ staffId }: { staffId: string }) => {
  const [licenses, setLicenses] = useState<License[]>([])
  const { historyRow } = useStore()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async (filters?: LicenseHistorySchemaType) => {
    if (!historyRow) return
    setLoading(true)
    const payload: GetLicensesParams = {
      providerStaffIds: [parseInt(staffId)],
      licenseTypes: [historyRow.licenseType],
      locationStateIds: historyRow.stateId ? [historyRow.stateId] : null,
      startDate: filters?.dateFrom ? getDateString(filters?.dateFrom) : null,
      endDate: filters?.dateTo ? getDateString(filters?.dateTo) : null,
      statuses: filters?.status ? [filters?.status] : null,
    }
    const result = await getLicensesAction(payload)
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

      <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] py-2">
        {loading ? (
          <LoadingPlaceholder className="bg-white min-h-[46vh]" />
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
