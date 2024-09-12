import React, { useState } from 'react'
import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { ErrorDialog } from '@psychplus/ui/error-dialog'
import { useTestData } from '../hooks/use-fetch-data'
import { LabTest, LabTestInterface } from '../types'
import { deleteLabTest, removeDuplicates } from '../utils'
import { CustomMultiSelect, Pill } from './index'
import { RowDeleteConfirmDialog } from './row-delete-confirm-dialog'

const LabTestComp = ({
  setSelectedTests,
  selectedTests,
  uniqueTestData,
  isEdit,
  appointmentId,
  orderId,
  toast,
}: LabTestInterface) => {
  const { testData, setTestData, fetchTest } = useTestData(uniqueTestData)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [labTestId, setLabTestId] = useState<string>('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const closeDialogDialog = () => setOpenModal(false)
  const closeDialog = () => {
    setOpenDeleteDialog(false)
    setLabTestId('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)
    if (value === '') {
      setTestData((prevTestData) => prevTestData)
    } else {
      fetchTest(value)
    }
  }

  const handleToggle = (clickedItem: LabTest) => {
    try {
      const nonNewSelectedTests = selectedTests.filter((test) => !test.newTest)
      if (
        nonNewSelectedTests.length === 1 &&
        clickedItem.disabled &&
        !clickedItem.newTest &&
        nonNewSelectedTests[0].labTestCode === clickedItem.labTestCode
      ) {
        setError('At least one existing test should remain in the lab order.')
        setOpenModal(true)
        return
      }

      if (
        !clickedItem.newTest &&
        orderId &&
        clickedItem.disabled &&
        clickedItem.labTestId
      ) {
        setLabTestId(clickedItem.labTestId)
        setOpenDeleteDialog(true)
      } else {
        const { papIndicator, temperatureType } = clickedItem
        const bothAreNotSameTypes = selectedTests.some(
          (item) =>
            (item.papIndicator === 'P' &&
              item.temperatureType === temperatureType) ||
            papIndicator === 'P',
        )
        if (bothAreNotSameTypes === false) {
          const hasPapIndicatorP = selectedTests.some(
            (item) => item.papIndicator === 'P' || papIndicator === 'P',
          )
          const hasDifferentTemperatureType = selectedTests.some(
            (item) => item.temperatureType !== temperatureType,
          )
          if (hasPapIndicatorP) {
            setError(
              "Create another order to add this test: PapIndicator 'P' exists.",
            )
            setOpenModal(true)
            return
          }

          if (hasDifferentTemperatureType) {
            setError(
              'Create another order to add this test: Different TemperatureType.',
            )
            setOpenModal(true)
            return
          }
        }
        const existingIndex = selectedTests.findIndex(
          (item) => item.labTestCode === clickedItem.labTestCode,
        )
        const updatedSelected =
          existingIndex !== -1
            ? selectedTests.filter(
                (item) => item.labTestCode !== clickedItem.labTestCode,
              )
            : [
                ...selectedTests,
                { ...clickedItem, checked: true, newTest: true },
              ]

        setSelectedTests(updatedSelected)

        const updatedData = testData.map((item: LabTest) =>
          item.labTestCode === clickedItem.labTestCode
            ? { ...item, checked: !item.checked }
            : item,
        )
        setTestData(removeDuplicates(updatedData, 'labTestCode'))
      }
      setSearchTerm('')
    } catch (error) {
      console.error('Error toggling lab test:', error)
    }
  }
  const deleteHandler = async () => {
    try {
      if (appointmentId && orderId && labTestId) {
        await deleteLabTest(appointmentId, orderId, labTestId)
        setSelectedTests((prevSelected) =>
          prevSelected.filter((item) => item.labTestId !== labTestId),
        )
        const updatedData = testData.map((item: LabTest) =>
          item.labTestId === labTestId
            ? { ...item, checked: !item.checked }
            : item,
        )
        setTestData(removeDuplicates(updatedData, 'labTestCode'))
        toast({
          type: 'success',
          title: 'LabTest deleted successfully',
        })
        closeDialog()
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({
          type: 'error',
          title: (err as { message: string }).message,
        })
      }
    }
  }
  const handlerCanceled = () => {
    setLabTestId('')
    closeDialog()
  }
  return (
    <>
      <RowDeleteConfirmDialog
        isOpen={openDeleteDialog}
        closeDialog={closeDialog}
        deleteHandler={deleteHandler}
        handlerCanceled={handlerCanceled}
      />
      {error && (
        <ErrorDialog
          text={error}
          isOpen={openModal}
          closeDialog={closeDialogDialog}
        />
      )}
      <Flex gap="2" mb="2" align="center">
        <Text size="4" m="0" weight="medium" className="text-[#000000]">
          {isEdit ? 'Edit Lab Order' : 'Add Lab Order'}
        </Text>

        <TextField.Root
          className="h-[28px] w-[188px] rounded-[4px] border-[#01012E22] text-1"
          value={searchTerm}
          placeholder={'Type lab name or test'}
          onChange={handleChange}
        />
      </Flex>

      <Box className="mb-2">
        <Flex>
          {testData
            ? testData
                .slice(0, 6)
                .map((item: LabTest) => (
                  <Pill
                    key={item.testName}
                    onToggle={() => handleToggle(item)}
                    checked={item.checked}
                    text={`${item?.labTestCode ?? item?.testCode} - ${
                      item.testName
                    }`}
                  />
                ))
            : null}
        </Flex>
      </Box>

      <CustomMultiSelect
        optionKey="testName"
        label="Selected Tests/Panels"
        code="labTestCode"
        code1="testCode"
        defaultSelected={selectedTests}
        handleRemoveOption={handleToggle}
      />
    </>
  )
}

export { LabTestComp }
