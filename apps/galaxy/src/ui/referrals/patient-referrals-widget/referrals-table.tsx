'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useGenericEventListener } from '@/hooks'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { columns } from './columns'
import { useStore } from './store'
import { isReferralDeleted } from './utils'

const ReferralsTable = ({ isTabView }: { isTabView?: boolean }) => {
  const store = useStore()
  const { loading, data, fetchPatientReferrals } = zustandUseStore(
    store,
    (state) => ({
      data: state.data,
      fetchPatientReferrals: state.fetchPatientReferrals,
      loading: state.loading,
    }),
  )
  useEffect(() => {
    fetchPatientReferrals()
  }, [fetchPatientReferrals])

  useGenericEventListener({
    onEventTrigger: fetchPatientReferrals,
    eventType: 'widget:save',
    widgetId: QuickNoteSectionName.QuicknoteSectionAutoReferrals,
  })

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }
  return (
    <ScrollArea scrollbars="both" className="bg-white h-full p-2">
      <DataTable
        data={data?.referrals ?? []}
        columns={columns(isTabView)}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        tableRowClass="relative"
        theadClass="z-[1]"
        isRowDisabled={(row) => isReferralDeleted(row.original?.resourceStatus)}
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { ReferralsTable }
