'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DataTable, FormContainer } from '@/components'
import { LabOrders, LabResult, LabTest } from '@/types'
import { getCalendarDate, sanitizeFormData } from '@/utils'
import { updateLabOrdersResultAction } from './actions'
import { addLabOrdersResultAction } from './actions/add-lab-order-result'
import { CancelButton } from './cancel-button'
import { transformOut } from './data'
import { LabTestHeader } from './lab-test-header'
import { getColumns } from './results-table-columns'
import { SaveButton } from './save-button'
import { SchemaType } from './schema'
import { useStore } from './store'
import { OrderingLabName, OrderStatus } from './types'

interface LabResultsProps {
  row: Row<LabOrders>
  form: UseFormReturn<SchemaType>
  setSelectedTestName: React.Dispatch<React.SetStateAction<string>>
  selectedTestName: string
  shouldEditLabResult: boolean
}

const EditViewLabResult = ({
  row,
  form,
  setSelectedTestName,
  shouldEditLabResult,
}: LabResultsProps) => {
  const {
    orderingLab: { name: orderingLabName },
    orderStatus,
  } = row.original

  const shouldAddLabResult =
    orderingLabName === OrderingLabName.PsychPlus &&
    orderStatus === OrderStatus.OrderCompleted

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
    if (shouldAddLabResult) {
      setEditAbleLabResults(newRow)
      setTestLabResult([
        ...row.original.labResults.filter(
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
        row.original.labResults.filter(
          (result) =>
            result.labTestId === test.id && result.recordStatus !== 'Deleted',
        ),
      )
      form.reset({ labResults: undefined })
    }
  }

  useEffect(() => {
    if (row.original.labTests.length > 0 && !selectedTestId) {
      handleLabTest(row.original.labTests[0])
    }
  }, [])

  const handleAddLabResult = async (payload: LabResult) => {
    if (appointmentId) {
      const response = await addLabOrdersResultAction(
        payload,
        appointmentId,
        row.original.id,
      )
      if (response.state === 'error') {
        toast.error('Error Adding lab result')
      } else {
        addLabResult(response.data as LabResult)
        toast.success('Result Added successfully against lab order')
      }
    }
  }

  const hanldeEditLabResult = async (payload: LabResult) => {
    if (appointmentId) {
      const response = await updateLabOrdersResultAction(
        payload,
        appointmentId,
        row.original.id,
        payload.id ?? '',
      )

      if (response.state === 'error') {
        toast.error('Error updating lab result')
      } else {
        setLabResult(response?.data)
        toast.success('Result updated successfully against lab order')
      }
    }
  }

  const onSubmit = async (data: SchemaType) => {
    const payload = transformOut(data.labResults, selectedTestId)
    const formattedData = sanitizeFormData(payload)
    if (editAbleLabResults?.id === '') {
      handleAddLabResult(formattedData)
    } else {
      hanldeEditLabResult(formattedData)
    }
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

  const shouldShowButtons = (): boolean => {
    return row.original.labTests.length > 0 && !!editAbleLabResults
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      {row.original.labTests.length === 0 ? (
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
            labTests={row.original.labTests}
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
          <SaveButton />
        </Flex>
      )}
    </FormContainer>
  )
}

export { EditViewLabResult }
