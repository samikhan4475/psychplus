'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useShallow } from 'zustand/react/shallow'
import { getClinicsOptionsAction } from '@/actions'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '@/store'
import { capitalizeName, constructQuickNotesUrl, getPatientMRN } from '@/utils'
import { useStore as useQuickNotesStore } from '../quicknotes/store'
import { getProvidersOptionsAction } from '../schedule/client-actions'
import { getInsurancePlanOptionsAction } from './actions'
import { FilterForm } from './filter-form'
import { useStore } from './store'
import { getSchedulingColumns as column } from './table-columns'
import { SchedulingHistoryData } from './types'

const SchedulingHistoryTable = () => {
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)
  const patient = useQuickNotesStore((state) => state.patient)
  const { id } = useParams<{ id: string }>()
  const {
    data,
    fetchSchedulingHistory,
    loading,
    isTCMVisitType,
    sort,
    setPatientId,
    sortData,
    fetchAsync,
  } = useStore(
    useShallow((state) => ({
      data: state.data,
      fetchSchedulingHistory: state.fetchSchedulingHistory,
      loading: state.loading,
      isTCMVisitType: state.isTCMVisitType,
      sort: state.sort,
      setPatientId: state.setPatientId,
      sortData: state.sortData,
      fetchAsync: state.fetchAsync,
    })),
  )

  useEffect(() => {
    setPatientId(id)
    Promise.all([
      fetchAsync('providers', getProvidersOptionsAction),
      fetchAsync('insurancePlans', getInsurancePlanOptionsAction),
      fetchAsync('clinics', getClinicsOptionsAction),
      fetchSchedulingHistory(id),
    ])
  }, [id])

  const onRowCLick = (row: Row<SchedulingHistoryData>) => {
    const href = constructQuickNotesUrl(
      Number(id),
      row.original.appointmentId,
      row.original.visitTypeCode,
      row.original.visitSequenceType,
    )

    const label = `${capitalizeName(
      `${patient?.legalName?.firstName ?? ''} ${
        patient?.legalName?.lastName ?? ''
      }`,
    )}-${getPatientMRN(patient.id)}-${row.original.appointmentId}`
    addTab({ href, label })
    router.push(href)
  }
  return (
    <Flex direction="column" className="gap-1">
      <FilterForm />
      <ScrollArea className={ScrollAreaClassName} scrollbars="horizontal">
        {loading ? (
          <Flex height="100%" align="center" justify="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <Box className="min-w-max">
            <DataTable
              onRowClick={onRowCLick}
              columns={column(isTCMVisitType, sort, sortData)}
              data={data?.list ?? []}
              isRowSpan
            />
          </Box>
        )}
      </ScrollArea>
    </Flex>
  )
}
const ScrollAreaClassName =
  'bg-white max-w-[calc(100vw_-_190px)] overflow-x-auto p-2'

export { SchedulingHistoryTable }
