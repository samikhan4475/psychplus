'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@radix-ui/themes'
import { Row, Table } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useStore as useRootStore } from '@/store'
import { Appointment } from '@/types'
import { capitalizeName, constructQuickNotesUrl, getPatientMRN } from '@/utils'
import { useStore as RootStore } from '../store'
import { useStore } from './store'
import { columns } from './table-columns'

const DataTableHeader = (table: Table<Appointment>) => {
  const listViewFilters = RootStore((state) => state.tableFilters)

  useEffect(() => {
    // reset columns visibility
    table.getAllColumns().forEach((column) => {
      column.toggleVisibility(true)
      column.columns.forEach((column) => column.toggleVisibility(true))
    })
    // set column visibility
    table
      .getAllColumns()
      .filter(
        (column) => column.getCanHide() && listViewFilters.includes(column.id),
      )
      .forEach((column) => {
        column.columns.forEach((column) => column.toggleVisibility(false))
        column.toggleVisibility(false)
      })
  }, [table, listViewFilters])

  return null
}

const ListViewTable = () => {
  const data = useStore((state) => state.appointments)
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)
  const visitStatusCodes = useCodesetCodes(CODESETS.AppointmentStatus)

  const statusCodes = useMemo(() => {
    return visitStatusCodes
      .filter((code) => {
        const group = code.attributes?.[0].value ?? ''
        const role = code.attributes?.[1].value ?? ''
        if (group === 'Inactive' && role === 'Timed') {
          return true
        }
        return false
      })
      .map((code) => code.value)
  }, [visitStatusCodes])

  const isRowDisabled = (row: Row<Appointment>) => {
    const visitStatus = row.getValue('visitStatus') as string
    const inactiveVisitStatusCodes = statusCodes.filter(
      (code) => code !== 'CheckedOut',
    )
    return inactiveVisitStatusCodes.includes(visitStatus)
  }

  const isTcmVisit = (row: Row<Appointment>) => {
    const isTcmVisit = row.original.visitTypeCode === 'TransitionalCare'
    const visitStatus = row.original.visitStatus
    if (isTcmVisit) {
      if (row.original.isTcmBlockComplete) {
        return false
      }
      return visitStatus !== 'CheckedOut'
    }
    return false
  }

  const isTestPatient = (row: Row<Appointment>) => row.original.isTestPatient

  return (
    <ScrollArea
      className="bg-white h-full flex-1 px-2.5 py-2"
      scrollbars="both"
    >
      <DataTable
        onRowClick={(row) => {
          const href = constructQuickNotesUrl(
            row.original.patientId,
            row.original.appointmentId,
            row.original.visitTypeCode,
            row.original.visitSequence,
          )

          addTab({
            href,
            label: `${capitalizeName(row.original?.name)}-${getPatientMRN(
              row.original.patientId,
            )}-${row.original.appointmentId}`,
          })
          router.push(href)
        }}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-10"
        disablePagination
        columns={columns}
        isRowDisabled={isRowDisabled}
        isTestResource={isTestPatient}
        isRowHighlightedRed={isTcmVisit}
        data={data}
        renderHeader={DataTableHeader}
        isRowSpan
        sticky
        defaultSorting={[{ id: 'appointment-date', desc: false }]}
      />
    </ScrollArea>
  )
}

export { ListViewTable }
