'use client'

import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useRXFlowSteps } from '../hooks'
import { RequestedDrugTable } from '../requested-drugs/drugs-table'
import { useStore } from '../store'
import {
  MedicationRefill,
  MedicationRefillAPIRequest,
  PharmacyNotificationDrugModel,
  PharmacyNotificationType,
  PharmacyRxChangeRequest,
  Step,
} from '../types'
import { UpdateMedicationForm } from './update-medication-form'

interface UpdateMedicationDialogProps {
  row: Row<MedicationRefill>
}
const UpdateMedicationDialog = ({ row }: UpdateMedicationDialogProps) => {
  const [open, setOpen] = useState(false)
  const [filteredData, setFilteredData] = useState<MedicationRefill>(
    row.original,
  )
  const [proceedToForm, setProceedToForm] = useState(false)
  const [selectedDrug, setSelectedDrug] =
    useState<PharmacyNotificationDrugModel | null>(null)
  const { searchMedicationsList, activeTab, payload } = useStore()
  const isRefillTab = activeTab.includes('Refill')

  const { step, stepCount, totalSteps, ...stepsProp } = useRXFlowSteps()

  const handleDrugSelect = (drug: PharmacyNotificationDrugModel) => {
    setSelectedDrug(drug)
  }
  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (open) {
      const firstDrug = row.original.drugList?.[0] ?? null
      setSelectedDrug(firstDrug)
    } else {
      setFilteredData(row.original)
      setSelectedDrug(null)
      setProceedToForm(false)
      const formattedData: MedicationRefillAPIRequest = {
        notificationType: isRefillTab
          ? PharmacyNotificationType.PharmacyRxRenewalRequest
          : PharmacyNotificationType.PharmacyRxChangeRequest,
        ...payload,
      }

      searchMedicationsList(formattedData)
    }
  }

  const handleNextClick = () => {
    if (!selectedDrug) return
    const updatedDrugList =
      filteredData.drugList?.filter((drug) => drug.id === selectedDrug.id) ?? []
    setFilteredData({
      ...filteredData,
      drugList: updatedDrugList,
    })
    setProceedToForm(true)
  }

  const getDialogTitle = () => {
    if (
      filteredData?.rxChangeRequestCode ===
        PharmacyRxChangeRequest.TherapeuticSubstitution &&
      shouldShowDrugTable
    )
      return 'Therapeutic Alternatives'
    return ' Modify Prescription Request'
  }

  const shouldShowDrugTable =
    (filteredData?.drugList?.length ?? 0) > 1 && !proceedToForm
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
        >
          <Text className="text-pp-black-3 text-1">
            {row.original?.rxChangeRequestCode ===
            'PrescriberAuthorizationRequired'
              ? 'Validate'
              : 'Approve'}
          </Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        className={`relative ${
          shouldShowDrugTable
            ? 'min-h-[10dvh] max-w-[1000px]'
            : 'min-h-[50dvh] max-w-[600px]'
        } ${step === Step.Form ? 'max-w-[1070px]' : ''} overflow-y-hidden`}
      >
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={16} height={16} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>{getDialogTitle()} </Dialog.Title>
        {shouldShowDrugTable ? (
          <>
            <RequestedDrugTable
              filteredData={filteredData}
              onSelectDrug={handleDrugSelect}
              selectedDrug={selectedDrug}
            />
            <Flex gap="2" justify="end" mt="4">
              <Button
                type="button"
                size="2"
                highContrast
                disabled={!selectedDrug}
                onClick={handleNextClick}
              >
                Next
              </Button>
            </Flex>
          </>
        ) : (
          <UpdateMedicationForm
            data={filteredData}
            onCloseModal={onOpenChange}
            step={step}
            {...stepsProp}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { UpdateMedicationDialog }
