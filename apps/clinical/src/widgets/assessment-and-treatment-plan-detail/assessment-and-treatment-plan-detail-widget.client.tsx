'use client'

import React, { useState } from 'react'
import { Pencil2Icon, PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { updateAssessmentPlanOfTreatments } from '@psychplus/assessment-and-treatment-plan/api.client'
import { ToastProvider, useToast } from '@psychplus/ui/toast-provider'
import { useStore } from '../assessment-and-treatment-plan-list/store'
import { AssessmentDialogWidgetClient } from '../assessment-dialog/assessment-dialog-widget.client'
import { TreatmentPlanDialogWidgetClient } from '../treatment-plan-dialog/treatment-plan-dialog-widget.client'
import { AssessmentListTable, TreatmentPlanListTable } from './components'

const AssessmentAndTreatmnetPlansDetailWidgetClient = ({
  rowId,
}: {
  rowId: string
}) => {
  const { toast } = useToast()
  const [isOpenAssessment, setIsOpenAssessment] = useState(false)
  const [isOpenTreatment, setIsOpenTreatment] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const openDialogWithTypeAssessment = () => setIsOpenAssessment(true)
  const openDialogWithTypeTreatment = () => setIsOpenTreatment(true)
  const closeDialogAssessment = () => setIsOpenAssessment(false)
  const closeDialogTreatment = () => setIsOpenTreatment(false)

  const { assessmentAndTreatmentPlans, setAssessmentAndTreatmentPlans } =
    useStore()

  const data = assessmentAndTreatmentPlans.find((record) => record.id === rowId)
  const updatedAssessmentAndTreatmentPlans = async () => {
    try {
      const res = await updateAssessmentPlanOfTreatments(data)

      const updateAssessmentAndTreatmentPlans = assessmentAndTreatmentPlans.map(
        (assessmentAndTreatmentPlan) => {
          return assessmentAndTreatmentPlan.id === data?.id
            ? res
            : assessmentAndTreatmentPlan
        },
      )

      setAssessmentAndTreatmentPlans(updateAssessmentAndTreatmentPlans)
      toast({ type: 'success', title: 'Saved successfully' })
      setIsEditing(!isEditing)
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message })
      }
    }
  }

  return (
    <ToastProvider>
      <Box className="mt-4 flex items-center justify-between" p="4">
        <Text className="font-bold">Assessment & Treatment Plan</Text>
        <Button
          className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]"
          size="1"
          onClick={() =>
            isEditing
              ? updatedAssessmentAndTreatmentPlans()
              : setIsEditing(!isEditing)
          }
        >
          {isEditing ? <Pencil2Icon /> : 'Edit'} {isEditing ? 'Save' : ''}
        </Button>
      </Box>
      <Box p="1">
        <Flex
          p="3"
          mb="2"
          justify="between"
          align="center"
          className="bg-[#F0F4FF]"
        >
          <Text className="font-bold">Assessment</Text>
          {isEditing && (
            <Button
              className="bg-[white] text-[black]"
              size="1"
              onClick={openDialogWithTypeAssessment}
            >
              <PlusIcon /> Add Assessment
            </Button>
          )}
          <AssessmentDialogWidgetClient
            isOpen={isOpenAssessment}
            closeDialog={closeDialogAssessment}
            rowId={rowId}
          />
        </Flex>
        <AssessmentListTable rowId={rowId} isEditing={isEditing} />
      </Box>

      <Box p="1">
        <Flex
          p="3"
          mb="2"
          justify="between"
          align="center"
          className="bg-[#F0F4FF]"
        >
          <Text className="font-bold">Plan Of Tratment</Text>
          {isEditing && (
            <Button
              className="bg-[white] text-[black]"
              size="1"
              onClick={openDialogWithTypeTreatment}
            >
              <PlusIcon /> Add Plan
            </Button>
          )}
          <TreatmentPlanDialogWidgetClient
            isOpen={isOpenTreatment}
            closeDialog={closeDialogTreatment}
            rowId={rowId}
          />
        </Flex>
        <TreatmentPlanListTable rowId={rowId} isEditing={isEditing} />
      </Box>
    </ToastProvider>
  )
}

export { AssessmentAndTreatmnetPlansDetailWidgetClient }
