'use client'

import { useEffect, useMemo } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'
import {
  MedicationRefillAPIRequest,
  PharmacyNotificationType,
  RefillMedicationType,
} from './types'

const MedicationOrderRefillTable = () => {
  const { searchMedicationsList, data, loading, sort, sortData, activeTab } =
    useStore((state) => ({
      searchMedicationsList: state.searchMedicationsList,
      loading: state.loading,
      data: state.data,
      sort: state.sort,
      sortData: state.sortData,
      activeTab: state.activeTab,
    }))
  const isRefillTab = activeTab.includes('Refill')
  useEffect(() => {
    const formattedData: MedicationRefillAPIRequest = {
      notificationType: isRefillTab
        ? PharmacyNotificationType.PharmacyRxRenewalRequest
        : PharmacyNotificationType.PharmacyRxChangeRequest,
    }

    searchMedicationsList(formattedData)
  }, [activeTab])

  const filteredRefillRequests = useMemo(() => {
    if (!data?.refillRequests) return []

    return data.refillRequests
      .map((request) => ({
        ...request,
        drugList: request.drugList?.filter(
          (drug) =>
            drug.medicationType ===
            (isRefillTab
              ? RefillMedicationType.Dispensed
              : RefillMedicationType.Requested),
        ),
      }))
      .filter((request) => request.drugList && request.drugList.length > 0)
  }, [data?.refillRequests])

  const memoizedColumns = useMemo(() => columns(sort, sortData), [])
  
  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea>
      <DataTable
        data={filteredRefillRequests ?? []}
        columns={memoizedColumns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { MedicationOrderRefillTable }
