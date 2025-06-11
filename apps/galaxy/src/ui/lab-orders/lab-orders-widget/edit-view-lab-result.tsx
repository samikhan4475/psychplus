'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DataTable, FormContainer } from '@/components'
import { LabOrders, LabResult, LabTest } from '@/types'
import { getCalendarDate, sanitizeFormData } from '@/utils'
import { useStore as useLabResultsStore } from '../../lab-result/patient-lab-result-widget/store'
import { LabOrderStatusEnum } from '../add-lab-order/blocks/types'
import { updateLabOrdersResultAction } from './actions'
import { addLabOrdersResultAction } from './actions/add-lab-order-result'
import { CancelButton } from './cancel-button'
import { transformOut } from './data'
import { LabTestHeader } from './lab-test-header'
import { getColumns } from './results-table-columns'
import { SaveButton } from './save-button'
import { SchemaType } from './schema'
import { useStore } from './store'
import { OrderingLabName } from './types'

interface LabResultsProps {
  row: Row<LabOrders>
  form: UseFormReturn<SchemaType>
  setSelectedTestName: React.Dispatch<React.SetStateAction<string>>
  shouldEditLabResult: boolean
  onSubmitSuccess?: () => void
}

const EditViewLabResult = ({
  row,
  form,
  setSelectedTestName,
  shouldEditLabResult,
  onSubmitSuccess,
}: LabResultsProps) => {
  const [loadingSave, setLoadingSave] = useState(false)
  const { orderStatus } = row.original

  const orderingLab = row?.original?.orderingLab

  const shouldAddLabResult =
    orderingLab?.name === OrderingLabName.PsychPlus &&
    orderStatus === LabOrderStatusEnum.Signed

  const {
    setLabResult,
    addLabResult,
    setSelectedTestId,
    selectedTestId,
    editAbleLabResults,
    setEditAbleLabResults,
    testLabResult,
    setTestLabResult,
  } = useStore()

  const { updateLabResults } = useLabResultsStore((state) => ({
    updateLabResults: state.updateLabResults,
  }))
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')
  const newRow = {
    id: '',
    labTestId: selectedTestId,
    orderId: row.original.id,
    observationTime: getCalendarDate(),
    resultName: '',
    statusCode: '',
    resultCode: '',
    resultValue: '',
    resultValueUnit: '',
    recomendedValue: '',
    abnormalRangeCode: '',
    physicianComments: '',
  }
  const handleLabTest = (test: LabTest) => {
    setSelectedTestId(test.id)
    setSelectedTestName(test.testName)
    const labResults = row?.original?.labResults ?? []

    if (shouldAddLabResult) {
      setEditAbleLabResults(newRow)
      setTestLabResult([
        ...labResults.filter(
          (result) =>
            result.labTestId === test.id && result.recordStatus !== 'Deleted',
        ),
        {
          ...newRow,
          labTestId: test.id,
        },
      ])
      form.setValue('labResults', {
        ...newRow,
        labTestId: test.id,
      })
    } else {
      setEditAbleLabResults(undefined)
      setTestLabResult(
        labResults.filter(
          (result) =>
            result.labTestId === test.id && result.recordStatus !== 'Deleted',
        ),
      )
      form.reset({ labResults: undefined })
    }
  }

  useEffect(() => {
    if (
      row.original?.labTests &&
      row.original?.labTests.length > 0 &&
      !selectedTestId
    ) {
      handleLabTest(row.original?.labTests[0])
    }
  }, [])

  const handleAddLabResult = async (payload: LabResult) => {
    if (appointmentId) {
      const response = await addLabOrdersResultAction(
        { ...payload, orderId: row.original.id },
        appointmentId,
        row.original?.id ?? '',
      )
      if (response.state === 'error') {
        toast.error('Error Adding lab result')
      } else {
        addLabResult(response.data)
        updateLabResults(response.data)
        toast.success('Result Added successfully against lab order')
      }
    }
    setLoadingSave(false)
  }

  const hanldeEditLabResult = async (payload: LabResult) => {
    if (appointmentId) {
      const response = await updateLabOrdersResultAction(
        { ...payload, orderId: row.original.id },
        appointmentId,
        row.original?.id ?? '',
        payload.id ?? '',
      )

      if (response.state === 'error') {
        toast.error('Error updating lab result')
      } else {
        setLabResult(response?.data)
        updateLabResults(response.data)
        toast.success('Result updated successfully against lab order')
      }
    }
    setLoadingSave(false)
  }

  const onSubmit = async (data: SchemaType) => {
    setLoadingSave(true)
    const payload = transformOut(data.labResults, selectedTestId)
    const formattedData = sanitizeFormData(payload)
    if (editAbleLabResults?.id === '') {
      await handleAddLabResult(formattedData)
    } else {
      await hanldeEditLabResult(formattedData)
    }
    if (onSubmitSuccess) onSubmitSuccess()
  }

  const handleCancel = () => {
    setEditAbleLabResults(undefined)
    const updatedLabResults = testLabResult.filter((result) => result.id)
    setTestLabResult(updatedLabResults)
  }

  const handleAdd = () => {
    const existingEmptyRow = testLabResult.some((result) => result.id === '')
    if (existingEmptyRow) {
      return
    }
    setTestLabResult([...testLabResult, newRow])
    setEditAbleLabResults(newRow)
    form.reset({ labResults: newRow })
  }

  const shouldShowButtons = (): boolean =>
    !!row.original?.labTests?.length && !!editAbleLabResults

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      {row.original?.labTests?.length === 0 ? (
        <Text className="flex items-center justify-center">No Test Found</Text>
      ) : (
        <>
          {shouldAddLabResult && (
            <Box className="flex justify-end">
              <Button
                type="button"
                highContrast
                className="flex justify-end"
                onClick={handleAdd}
              >
                Add
              </Button>
            </Box>
          )}
          <LabTestHeader
            labTests={row.original?.labTests ?? []}
            selectedTestId={selectedTestId}
            handleLabTest={handleLabTest}
          />
          <DataTable
            data={testLabResult ?? []}
            columns={getColumns(shouldEditLabResult)}
            disablePagination
            sticky
          />
        </>
      )}

      {shouldShowButtons() && (
        <Flex className="mt-3 justify-end gap-3">
          <CancelButton onCancel={handleCancel} />
          <SaveButton loading={loadingSave} />
        </Flex>
      )}
    </FormContainer>
  )
}

export { EditViewLabResult }
