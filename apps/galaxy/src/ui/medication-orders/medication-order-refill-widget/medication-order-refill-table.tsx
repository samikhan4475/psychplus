'use client'

import { useEffect, useMemo } from 'react'
import { CalendarDate } from '@internationalized/date'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useStore as useGlobalStore } from '@/store'
import { getCurrentLocalDate } from '@/ui/schedule/utils'
import { formatDateToISOString } from '@/utils'
import { columns } from './columns'
import { useStore } from './store'
import {
  MedicationRefillAPIRequest,
  PharmacyNotificationType,
  RefillMedicationType,
} from './types'

const MedicationOrderRefillTable = () => {
  const {
    data,
    loading,
    sort,
    sortData,
    activeTab,
    changeRequestData,
    searchMedicationsList,
  } = useStore((state) => ({
    loading: state.loading,
    data: state.data,
    changeRequestData: state.changeRequestData,
    sort: state.sort,
    sortData: state.sortData,
    activeTab: state.activeTab,
    searchMedicationsList: state.searchMedicationsList,
  }))
  const today = new Date()
  const { staffId, staffRoleCode } = useGlobalStore((state) => ({
    staffId: state.user.staffId,
    staffRoleCode: state.staffResource.staffRoleCode,
  }))
  const isPrescriber = staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER
  const defaultOrderingStaffId = isPrescriber ? String(staffId) : ''
  const isRefillTab = activeTab.includes('Refill')
  useEffect(() => {
    const todayDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    )
    const startOfMonthDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    )
    const formattedData: MedicationRefillAPIRequest = {
      notificationType: isRefillTab
        ? PharmacyNotificationType.PharmacyRxRenewalRequest
        : PharmacyNotificationType.PharmacyRxChangeRequest,
      notificationDateFrom:
        formatDateToISOString(startOfMonthDate) ?? undefined,
      notificationDateTo: formatDateToISOString(todayDate, true) ?? undefined,
      isResponsePending: true,
      staffId: Number(defaultOrderingStaffId),
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
        stickyLastColumn={true}
      />
    </ScrollArea>
  )
}

export { MedicationOrderRefillTable }
