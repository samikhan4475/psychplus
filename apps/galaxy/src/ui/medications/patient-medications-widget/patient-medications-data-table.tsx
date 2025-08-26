'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import type { Row } from '@tanstack/react-table'
import { useShallow } from 'zustand/react/shallow'
import { DataTable, LoadingPlaceholder } from '@/components'
import { usePatientMedicationColumns } from './columns'
import { PatientMedicationDialog } from './patient-medication-dialog'
import { Step } from './patient-medication-dialog/types'
import { useStore } from './store'
import { EditOptions, PatientMedication } from './types'

const PatientMedicationsDataTable = ({ actionsHide = false }) => {
  const { data, loading, fetchProviderOptions, setSelectedMedicationIds } =
    useStore(
      useShallow((state) => ({
        data: state.data,
        loading: state.loading,
        fetchProviderOptions: state.fetchProviderOptions as () => Promise<void>,
        setSelectedMedicationIds: state.setSelectedMedicationIds as (
          ids: string[],
        ) => void,
      })),
    )

  useEffect(() => {
    fetchProviderOptions()
  }, [fetchProviderOptions])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] =
    useState<PatientMedication | null>(null)
  const [editOptions, setEditOptions] = useState<EditOptions | undefined>()
  const [initialStep, setInitialStep] = useState<Step | undefined>(undefined)

  const handleEditClick = (
    medication: PatientMedication,
    options?: EditOptions,
    step?: Step,
  ) => {
    setSelectedMedication(medication)
    setEditOptions(options)
    setDialogOpen(true)
    setInitialStep(step)
  }

  const columns = usePatientMedicationColumns({ onEditClick: handleEditClick })
  const filteredColumns = useMemo(
    () =>
      actionsHide
        ? columns.filter((col) => col.id !== 'medication-actions')
        : columns,
    [actionsHide, columns],
  )

  const handleRowSelectionChange = (rows: Row<PatientMedication>[]) => {
    const ids = rows.map((r) => r.original.id)
    setSelectedMedicationIds(ids)
  }

  if (loading) return <LoadingPlaceholder className="h-full w-full" />

  return (
    <>
      <ScrollArea className="bg-white h-full flex-1 p-2">
        <DataTable
          data={data ?? []}
          columns={filteredColumns}
          disablePagination
          sticky
          theadClass="z-[1]"
          onRowSelectionChange={handleRowSelectionChange}
        />
      </ScrollArea>

      <PatientMedicationDialog
        title={
          editOptions?.rePrescribe
            ? 'Re-Prescribe Medication'
            : 'Edit Medication'
        }
        medication={selectedMedication ?? undefined}
        open={dialogOpen}
        editOptions={editOptions}
        initialStep={initialStep}
        onOpenChange={(open) => {
          if (!open) setSelectedMedication(null)
          setDialogOpen(open)
        }}
      />
    </>
  )
}

export { PatientMedicationsDataTable }
