'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { useShallow } from 'zustand/react/shallow'
import { DataTable, LoadingPlaceholder } from '@/components'
import { usePatientMedicationColumns } from './columns'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { useStore } from './store'
import { EditOptions, PatientMedication } from './types'

const PatientMedicationsDataTable = ({ actionsHide = false }) => {
 const { data, loading, fetchProviderOptions } = useStore(
    useShallow((state) => ({
      data: state.data,
      loading: state.loading,
      fetchProviderOptions: state.fetchProviderOptions,
    })),
  )
  useEffect(() => {
    fetchProviderOptions()
  }, [fetchProviderOptions])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] =
    useState<PatientMedication | null>(null)
  const [editOptions, setEditOptions] = useState<EditOptions | undefined>(
    undefined,
  )

  const handleEditClick = (
    medication: PatientMedication,
    options?: EditOptions,
  ) => {
    setSelectedMedication(medication)
    setEditOptions(options)
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
        title={editOptions?.rePrescribe ? 'Re-Prescribe Medication' : 'Edit Medication'}
        medication={selectedMedication ?? undefined}
        open={dialogOpen}
        editOptions={editOptions}
        onOpenChange={(open) => {
          if (!open) setSelectedMedication(null)
          setDialogOpen(open)
        }}
      />
    </>
  )
}

export { PatientMedicationsDataTable }
