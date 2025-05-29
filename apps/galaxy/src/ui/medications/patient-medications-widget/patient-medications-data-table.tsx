'use client'

import React, { useMemo, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { DataTable, LoadingPlaceholder } from '@/components'
import { usePatientMedicationColumns } from './columns'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { useStore } from './store'
import { PatientMedication } from './types'

const PatientMedicationsDataTable = ({ actionsHide = false }) => {
  const { data, loading } = useStore(
    useShallow((state) => ({
      data: state.data,
      loading: state.loading,
    })),
  )
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] =
    useState<PatientMedication | null>(null)

  const handleEditClick = (medication: PatientMedication) => {
    setSelectedMedication(medication)
    setDialogOpen(true)
  }

  const columns = usePatientMedicationColumns({ onEditClick: handleEditClick })
  const filteredColumns = useMemo(
    () =>
      actionsHide
        ? columns.filter((col) => col.id !== 'medication-actions')
        : columns,
    [actionsHide, columns],
  )

  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }

  return (
    <>
      <ScrollArea className="bg-white h-full flex-1 p-2">
        <DataTable
          data={data ?? []}
          columns={filteredColumns}
          disablePagination
          sticky
          theadClass="z-[1]"
        />
      </ScrollArea>

      <PatientMedicationDialog
        title="Edit Medication"
        medication={selectedMedication ?? undefined}
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedMedication(null)
          setDialogOpen(open)
        }}
      />
    </>
  )
}

export { PatientMedicationsDataTable }
