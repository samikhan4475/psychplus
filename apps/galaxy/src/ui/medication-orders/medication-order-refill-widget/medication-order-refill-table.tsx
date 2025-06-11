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
  const {
    searchMedicationsList,
    data,
    loading,
    sort,
    sortData,
    activeTab,
    changeRequestData,
  } = useStore((state) => ({
    searchMedicationsList: state.searchMedicationsList,
    loading: state.loading,
    data: state.data,
    changeRequestData: state.changeRequestData,
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
    let newList = isRefillTab
      ? data.refillRequests
      : changeRequestData?.refillRequests

    return newList
      .map((request) => {
        let finalDrugs
        if (isRefillTab) {
          finalDrugs = request.drugList?.filter(
            (drug) => drug.medicationType === RefillMedicationType.Dispensed,
          )
        } else {
          const requestedDrugs = request.drugList?.filter(
            (drug) => drug.medicationType === RefillMedicationType.Requested,
          )
          finalDrugs =
            requestedDrugs && requestedDrugs.length > 0
              ? requestedDrugs
              : request.drugList?.filter(
                  (drug) =>
                    drug.medicationType === RefillMedicationType.Prescribed,
                )
        }
        return {
          ...request,
          drugList: finalDrugs,
        }
      })
      .filter((request) => request.drugList && request.drugList.length > 0)
  }, [data?.refillRequests, changeRequestData?.refillRequests])

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
