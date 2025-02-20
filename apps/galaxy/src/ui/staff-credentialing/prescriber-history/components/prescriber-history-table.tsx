'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder, PropsWithRow } from '@/components'
import { getSettingsHistoryAction } from '../../actions'
import { PrescriberDataResponse, PrescriberSettingResponse } from '../../types'
import { columns } from './columns'

const PrescriberHistoryTable = ({
  row,
}: PropsWithRow<PrescriberDataResponse>) => {
  
  const ids = Object.entries(row.original)
    .filter(
      ([key, value]) =>
        !['stateCode', 'stateName'].includes(key) && value.split('_')[1], // its stored like this Yes_[SettingId] or No_[SettingId] need to filter only with Ids in it.
    )
    .map(([, value]) => value.split('_')[1])

  const [loading, setLoading] = useState(ids.length !== 0)
  const [settingsHistory, setSettingsHistory] = useState<
    PrescriberSettingResponse[]
  >([])

  useEffect(() => {
    if (ids.length > 0) {
      ;(async () => {
        const result = await getSettingsHistoryAction({ settingIds: ids })
        if (result.state === 'success') {
          setSettingsHistory(result.data)
        } else if (result.state === 'error') {
          toast.error(result.error ?? 'Failed to get settings history')
        }
        setLoading(false)
      })()
    }
  }, [])

  if (loading)
    return <LoadingPlaceholder className="min-h-[20vh] min-w-[400px]" />

  return (
    <ScrollArea className="bg-white min-h-28 max-h-40 max-w-[calc(100vw_-_175px)] py-2">
      <DataTable
        columns={columns}
        data={settingsHistory}
        isRowSpan
        sticky
        disablePagination
        tableRowClass="border-b border-red-200"
      />
    </ScrollArea>
  )
}

export { PrescriberHistoryTable }