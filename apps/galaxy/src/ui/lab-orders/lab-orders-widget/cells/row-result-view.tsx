'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DataTable, FormContainer } from '@/components'
import { LabOrders, LabResult, LabTest } from '@/types'
import { updateLabOrdersResultAction } from '../actions/update-lab-orders_result'
import { CancelButton } from '../cancel-button'
import { transformInDefault, transformOut } from '../data'
import { LabResultDialog } from '../lab-result-dialog'
import { LabTestHeader } from '../lab-test-header'
import { columns } from '../results-table-colums'
import { SaveButton } from '../save-button'
import { schema, SchemaType } from '../schema'
import { useStore } from '../store'

interface LabResultsProps {
  row: Row<LabOrders>
}

const RowResultView = ({ row }: LabResultsProps) => {
  const { setLabResult } = useStore()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')
  const [selectedTestId, setSelectedTestId] = useState('')
  const [selectedTestName, setSelectedTestName] = useState('')

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      labResults: [],
      editingLabResultId: undefined,
    },
  })

  const handleLabTest = (test: LabTest) => {
    setSelectedTestId(test.id)
    setSelectedTestName(test.testName)
    form.setValue(
      'labResults',
      transformInDefault(test.id, row.original.labResults).labResults || [],
    )
  }

  useEffect(() => {
    if (row.original.labTests.length > 0 && !selectedTestId) {
      handleLabTest(row.original.labTests[0])
    }
  }, [])

  const onSubmit = async (data: SchemaType) => {
    const labResult = data.labResults.find(
      (labResult) => labResult.id === data.editingLabResultId,
    )

    if (!labResult) {
      return
    }

    const payload = transformOut(labResult)
    if (appointmentId) {
      const response = await updateLabOrdersResultAction(
        payload,
        appointmentId,
        labResult.orderId,
        labResult.id,
      )

      if (response.state === 'error') {
        toast.error('Error updating lab result')
      } else {
        setLabResult(response?.data)
        form.setValue('editingLabResultId', undefined)
        toast.success('Result updated successfully against lab order')
      }
    }
  }

  const labEditResults = form
    .getValues('labResults')
    .filter((labResult) => labResult.labTestId === selectedTestId)

  const editingLabResultId = form.watch('editingLabResultId')

  const isEditing = editingLabResultId !== undefined

  const handleCancel = () => {
    form.setValue('editingLabResultId', undefined)
    form.setValue(
      'labResults',
      transformInDefault(selectedTestId, row.original.labResults).labResults ||
        [],
    )
  }

  return (
    <IconButton size="1" color="gray" variant="ghost">
      <LabResultDialog
        title={selectedTestName ? `View Results of ${selectedTestName}` : ''}
        onClose={handleCancel}
      >
        <FormContainer form={form} onSubmit={onSubmit}>
          <LabTestHeader
            labTests={row.original.labTests}
            selectedTestId={selectedTestId}
            handleLabTest={handleLabTest}
          />
          <DataTable
            data={labEditResults ?? []}
            columns={columns as LabResult[]}
            disablePagination
            sticky
          />

          {isEditing && (
            <Flex className="mt-3 justify-end gap-3">
              <CancelButton onCancel={handleCancel} />
              <SaveButton />
            </Flex>
          )}
        </FormContainer>
      </LabResultDialog>
    </IconButton>
  )
}

export { RowResultView }
