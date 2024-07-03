'use client'

import React, { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import {
  DeleteConfirmDialog,
  useDeleteConfirmDialog,
} from 'node_modules/@psychplus/ui/src/delete-confirm-dialog'
import { deletePlanTreatment } from '@psychplus/assessment-and-treatment-plan/api.client'
import { PatientPlanOfTreatment } from '@psychplus/assessment-and-treatment-plan/types'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useToast } from '@psychplus/ui/toast-provider'
import { useStore } from '@/widgets/assessment-and-treatment-plan-list/store'
import { TreatmentPlanDialogWidgetClient } from '@/widgets/treatment-plan-dialog/treatment-plan-dialog-widget.client'

interface DataTableRowActionsProps {
  data: PatientPlanOfTreatment
}

const RowActionDropdown = ({ data }: DataTableRowActionsProps) => {
  const { isDeleteConfirmDialogOpen, toggleDeleteConfirmDialog } =
    useDeleteConfirmDialog()

  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const {
    patientId,
    assessmentAndTreatmentPlans,
    setAssessmentAndTreatmentPlans,
  } = useStore()

  const openDialogWithType = () => {
    setIsOpen(true)
  }

  const onDelete = async () => {
    try {
      if (data.id !== undefined) {
        await deletePlanTreatment(patientId, data.id)
      }

      const updatedAssessmentAndTreatmentPlans =
        assessmentAndTreatmentPlans.map((record) => {
          if (record.id !== data.patientAssessmentPlanId) {
            return record
          }

          const updatedPatientPlanOfTreatments: PatientPlanOfTreatment[] =
            record.patientPlanOfTreatments?.filter(
              (treatment) =>
                treatment.id !== data.id || treatment.uniqId !== data.uniqId,
            ) ?? []

          return {
            ...record,
            patientPlanOfTreatments: updatedPatientPlanOfTreatments,
          }
        })

      setAssessmentAndTreatmentPlans(updatedAssessmentAndTreatmentPlans)
      toast({ type: 'success', title: 'Deleted successfully' })
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: 'An unknown error occurred' })
      }
    }
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <IconButton size="1" variant="ghost" mr="1">
            <DotsHorizontalIcon height={16} width={16} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <React.Fragment key="Edit">
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={openDialogWithType}
            >
              <Flex className=" hover:text-[white]">
                <Text size="3">Edit</Text>
              </Flex>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="m-0 p-0" />
          </React.Fragment>
          <React.Fragment key="Delete">
            <DropdownMenu.Item
              className="w-full py-4 hover:bg-[#151B4A]"
              onSelect={() => {
                toggleDeleteConfirmDialog()
              }}
            >
              <Flex className=" hover:text-[white]">
                <Text size="3">Delete</Text>
              </Flex>
            </DropdownMenu.Item>
          </React.Fragment>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <TreatmentPlanDialogWidgetClient
        isOpen={isOpen}
        isEdit={true}
        closeDialog={closeDialog}
        data={data}
        rowId={data.patientAssessmentPlanId}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteConfirmDialogOpen}
        closeDialog={toggleDeleteConfirmDialog}
        onDelete={onDelete}
      />
    </>
  )
}

export { RowActionDropdown }
