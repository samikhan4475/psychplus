'use client'

import React, { useEffect } from 'react'
import { Box, Table } from '@radix-ui/themes'
import { DateTimeCell, LoadingPlaceholder, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import {
  RECORD_STATUSES,
  UnitSystem,
  VITAL_TABLE_LABELS,
} from '../../constants'
import { useStore } from '../../store'
import { getVitalValue } from '../../utils'

interface AddVitalsTableProps {
  patientId: string
  appointmentId: string
  unitSystem: UnitSystem
}

const AddVitalsTable = ({
  patientId,
  appointmentId,
  unitSystem,
}: AddVitalsTableProps) => {
  const { data, loading, fetch } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch({ appointmentId, patientId, recordStatuses: RECORD_STATUSES })
  }, [])

  if (loading) return <LoadingPlaceholder />

  return (
    <Box className="w-full">
      <Table.Root variant="ghost" size="1">
        <Table.Header className="bg-pp-focus-bg-2">
          <Table.Row>
            <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 sticky left-0 z-10 h-6 border px-1 py-0">
              <TextCell>Vitals</TextCell>
            </Table.ColumnHeaderCell>

            {data?.map((vital) => (
              <Table.ColumnHeaderCell
                key={vital.metadata.createdOn}
                className="border-pp-table-border h-6 whitespace-nowrap border border-l-0 px-1 py-0"
              >
                <DateTimeCell>
                  {formatDateTime(vital.metadata.createdOn)}
                </DateTimeCell>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(VITAL_TABLE_LABELS).map((label, index) => (
            <Table.Row
              key={label}
              className={index % 2 === 1 ? 'bg-pp-bg-table-cell' : ''}
            >
              <Table.Cell className="border-pp-table-border bg-white min-w-36 sticky left-0 z-10 h-7 max-w-[50px] border border-t-0 px-1 py-0">
                <TextCell className="font-[590]">{label}</TextCell>
              </Table.Cell>
              {data?.map((vital) => (
                <Table.Cell
                  key={`${vital.id}-${label}`}
                  className="border-pp-table-border h-7 whitespace-nowrap border border-l-0 border-t-0 px-1 py-0"
                >
                  <TextCell>{getVitalValue(vital, label, unitSystem)}</TextCell>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export { AddVitalsTable }
