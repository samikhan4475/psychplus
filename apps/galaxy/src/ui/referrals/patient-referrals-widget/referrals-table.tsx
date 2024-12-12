'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'
import { isContactStatusError } from './utils'

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
        isRowDisabled={(row) =>
          isContactStatusError(row.original.contactStatus)
        }
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { ReferralsTable }
