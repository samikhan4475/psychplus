'use client'

import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { cn } from '@/utils'
import { useRXFlowSteps } from '../hooks'
import { useStore } from '../store'
import {
  MedicationRefill,
  MedicationRefillAPIRequest,
  PharmacyNotificationType,
  Step,
} from '../types'
import { UpdateMedicationForm } from './update-medication-form'

interface UpdateMedicationDialogProps {
  row: Row<MedicationRefill>
}
const UpdateMedicationDialog = ({ row }: UpdateMedicationDialogProps) => {
  const [open, setOpen] = useState(false)
  const { searchMedicationsList, activeTab, payload } = useStore()
  const isRefillTab = activeTab.includes('Refill')
  const onOpenChange = (open: boolean) => {
    if (!open) {
      const formattedData: MedicationRefillAPIRequest = {
        notificationType: isRefillTab
          ? PharmacyNotificationType.PharmacyRxRenewalRequest
          : PharmacyNotificationType.PharmacyRxChangeRequest,
        ...payload,
      }

      searchMedicationsList(formattedData)
    }

    setOpen(open)
  }
  const { step, stepCount, totalSteps, ...stepsProp } = useRXFlowSteps()
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
        className={cn(
          'relative min-h-[50dvh] max-w-[536px] !overflow-visible',
          {
            'max-w-[1070px]': step === Step.Form,
          },
        )}
      >
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={16} height={16} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>
          Modify Prescription Request{' '}
          <Text size="3" className="bg-pp-bg-accent rounded-full p-1">
            {stepCount}/{totalSteps}
          </Text>
        </Dialog.Title>

        <UpdateMedicationForm
          data={row.original}
          onCloseModal={onOpenChange}
          step={step}
          {...stepsProp}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { UpdateMedicationDialog }
