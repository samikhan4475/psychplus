import { useState } from 'react'
import { Flex, Text, TextField } from '@radix-ui/themes'
import { useDiagnosticData } from '../hooks/use-fetch-data'
import { Diagnostic, DiagnosticInterface } from '../types'
import { deleteLabDignosis, removeDuplicates } from '../utils'
import { CustomMultiSelect, Pill } from './index'
import { RowDeleteConfirmDialog } from './row-delete-confirm-dialog'

const Diagnostics = ({
  isEdit,
  setSelectedDiagnostics,
  selectedDiagnostics,
  patientId,
  appointmentId,
  orderId,
  toast,
}: DiagnosticInterface) => {
  const { diagnosticData, setDiagnosticData, fetchDiagnosis, loading } =
    useDiagnosticData({
      appointmentId,
      orderId,
      patientId,
      setSelectedDiagnostics,
      isEdit,
    })
  const [searchDiagnosticTerm, setSearchDiagnosticTerm] = useState<string>('')
  const [diagnosisId, setDiagnosisId] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const closeDialog = () => {
    setOpenModal(false)
    setDiagnosisId(0)
  }

  const handleToggleDiagnostic = (clickedItem: Diagnostic) => {
    try {
      if (
        !clickedItem.newDignoses &&
        clickedItem.disabled &&
        orderId &&
        clickedItem.id
      ) {
        setDiagnosisId(clickedItem.id)
        setOpenModal(true)
      } else {
        const existingItem = selectedDiagnostics.find(
          (item) =>
            item.symptomCodeDescription === clickedItem.symptomCodeDescription,
        )

        const updatedSelected = existingItem
          ? selectedDiagnostics.filter(
              (item) =>
                item.symptomCodeDescription !==
                clickedItem.symptomCodeDescription,
            )
          : [
              ...selectedDiagnostics,
              { ...clickedItem, checked: true, newDignoses: true },
            ]

        setSelectedDiagnostics(updatedSelected)

        const updatedData = diagnosticData.map((item) =>
          item.symptomCodeDescription === clickedItem.symptomCodeDescription
            ? { ...item, checked: !item.checked }
            : item,
        )
        setDiagnosticData(
          removeDuplicates(updatedData, 'symptomCodeDescription'),
        )
      }
      setSearchDiagnosticTerm('')
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

  const handleDiagnosticChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target
    setSearchDiagnosticTerm(value)
    if (value === '') {
      setDiagnosticData(diagnosticData)
    } else {
      fetchDiagnosis(value)
    }
  }
  const deleteHandler = async () => {
    if (appointmentId && orderId && diagnosisId) {
      try {
        await deleteLabDignosis(appointmentId, orderId, diagnosisId)

        setSelectedDiagnostics((prevSelected) =>
          prevSelected.filter((item) => item.id !== diagnosisId),
        )

        const updatedData = diagnosticData.map((item) =>
          item.id === diagnosisId ? { ...item, checked: !item.checked } : item,
        )

        setDiagnosticData(
          removeDuplicates(updatedData, 'symptomCodeDescription'),
        )
        toast({
          type: 'success',
          title: 'LabDignosis deleted successfully',
        })
        closeDialog()
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
  }
  const handlerCanceled = () => {
    setDiagnosisId(0)
    closeDialog()
  }
  return (
    <>
      <RowDeleteConfirmDialog
        isOpen={openModal}
        closeDialog={closeDialog}
        deleteHandler={deleteHandler}
        handlerCanceled={handlerCanceled}
      />
      <Flex gap="2" align="center" mt="3">
        <Text size="4" m="0" weight="medium" className="text-[#000000]">
          Diagnoses
        </Text>
        <TextField.Root
          className="h-30 w-[170px] rounded-2 border-[#01012E22] text-1"
          value={searchDiagnosticTerm}
          placeholder={'Search Diagnoses'}
          onChange={handleDiagnosticChange}
        />
      </Flex>

      <Flex mt="2">
        {diagnosticData && !loading
          ? diagnosticData
              .slice(0, 6)
              .map((item: Diagnostic) => (
                <Pill
                  key={item.symptomCodeDescription}
                  onToggle={() => handleToggleDiagnostic(item)}
                  checked={item.checked}
                  text={`${item?.symptomCode ?? item?.diagnosisCode} - ${
                    item.symptomCodeDescription
                  }`}
                />
              ))
          : null}
      </Flex>
      <CustomMultiSelect
        label="Selected Diagnoses"
        optionKey="symptomCodeDescription"
        code="symptomCode"
        code1="diagnosisCode"
        defaultSelected={selectedDiagnostics}
        handleRemoveOption={handleToggleDiagnostic}
      />
    </>
  )
}

export { Diagnostics }
