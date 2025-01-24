'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DataTable, FormContainer } from '@/components'
import { getDateString } from '@/ui/schedule/utils'
import { updateLicenseAction } from '../actions'
import { addLicenseAction } from '../actions/add-license'
import { columns } from '../columns'
import { PermissionAlert } from '../permission-alert'
import { schema, SchemaType } from '../schema'
import { useStore } from '../store'
import {
  License,
  LicenseStatus,
  LicenseType,
  RecordStatus,
  StaffData,
} from '../types'

const CDSTable = ({
  licenses,
  fetchLicenseList,
  staffData,
}: {
  licenses: License[]
  fetchLicenseList: () => void
  staffData: StaffData
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { editingRow, setEditingRow } = useStore()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      stateCode: '',
      stateName: '',
      status: undefined,
      licenseType: LicenseType.CDS,
      licenseNumber: '',
      startDate: undefined,
      endDate: undefined,
      isAlertCheck: false,
    },
  })

  const onSubmit = async (values: SchemaType) => {
    const rowToUpdate = values
    if (!editingRow?.stateCode || !rowToUpdate?.stateCode) return

    let res
    if (editingRow.id) {
      const payload = {
        ...editingRow,
        ...rowToUpdate,
        id: editingRow.id,
        startDate: getDateString(rowToUpdate.startDate),
        endDate: getDateString(rowToUpdate.endDate),
        providerStaffId: staffData?.staffId ?? 0,
        recordStatus: RecordStatus.Active,
      }
      res = await updateLicenseAction(staffData?.staffId ?? 0, payload)
    } else {
      const payload = {
        stateCode: editingRow.stateCode,
        licenseNumber: rowToUpdate.licenseNumber ?? '',
        licenseType: rowToUpdate.licenseType,
        isAlertCheck: rowToUpdate.isAlertCheck,
        status: rowToUpdate.status ?? LicenseStatus.Na,
        startDate: getDateString(rowToUpdate.startDate),
        endDate: getDateString(rowToUpdate.endDate),
        providerStaffId: staffData?.staffId ?? 0,
        recordStatus: RecordStatus.Active,
      }
      res = await addLicenseAction(staffData?.staffId ?? 0, payload)
    }
    if (res.state === 'error') {
      toast.error(res.error ?? 'Failed to update license')
      return
    }
    form.reset()
    fetchLicenseList()
    toast.success('License updated successfully')
    setEditingRow(null)
  }

  const isRowDisabled = (row: Row<License>) => {
    const data = row.original
    if (data.stateCode === editingRow?.stateCode) return false
    if (!data.id) return true
    return false
  }

  const showPermissionAlert = (isOpen: boolean, message: string) => {
    setIsOpen(isOpen)
    setAlertMessage(message)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <PermissionAlert
        isOpen={isOpen}
        message={alertMessage}
        onClose={() => {
          setIsOpen(false)
          setAlertMessage('')
        }}
      />
      <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
        <DataTable
          columns={columns(onSubmit, showPermissionAlert)}
          data={licenses}
          tdClass="!p-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b border-red-200"
          isRowDisabled={isRowDisabled}
        />
      </ScrollArea>
    </FormContainer>
  )
}

export { CDSTable }
