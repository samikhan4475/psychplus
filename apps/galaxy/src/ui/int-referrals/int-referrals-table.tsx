'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { DataTable, LoadingPlaceholder } from '@/components'
import { isReferralDeleted } from '../referrals/patient-referrals-widget/utils'
import { columns } from './columns'
import { useStore } from './store'

const IntReferralsTable = () => {
  const store = useStore()
  const {
    loading,
    data,
    sort,
    sortData,
    fetchPatientReferrals,
    getProvidersList,
    getLocationsList,
  } = zustandUseStore(store, (state) => ({
    data: state.data,
    fetchPatientReferrals: state.fetchPatientReferrals,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    getProvidersList: state.getProvidersList,
    getLocationsList: state.getLocationsList,
  }))

  useEffect(() => {
    fetchPatientReferrals()
    getProvidersList()
    getLocationsList()
  }, [fetchPatientReferrals])

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }
  return (
    <ScrollArea scrollbars="both" className="bg-white h-full p-2">
      <DataTable
        data={data?.referrals ?? []}
        columns={columns(sort, sortData)}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        tableRowClass="relative"
        theadClass="z-[1]"
        isRowDisabled={(row) => isReferralDeleted(row.original.resourceStatus)}
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { IntReferralsTable }
