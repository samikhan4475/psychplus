import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import { Box } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PatientAssessment } from '@psychplus/assessment-and-treatment-plan/types'
import { FormSubmitButton, validate } from '@psychplus/form'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useToast } from '@psychplus/ui/toast-provider'
import { useStore } from '@/widgets/assessment-and-treatment-plan-list/store'

const schema = z.object({
  assessmentPlanDate: validate.anyString,
  assessmentStatus: validate.anyString,
  assessment: validate.anyString,
})

export type SchemaType = z.infer<typeof schema>

type TreatmentPlanProps = {
  data?: PatientAssessment
  isEdit?: boolean
  closeDialog: () => void
  rowId: string
}

const AssessmentForm: React.FC<TreatmentPlanProps> = ({
  data,
  isEdit,
  closeDialog,
  rowId,
}) => {
  const { toast } = useToast()

  const { assessmentAndTreatmentPlans, setAssessmentAndTreatmentPlans } =
    useStore()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      assessment: data?.assessment || '',
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()

    const updatedAssessmentAndTreatmentPlans = assessmentAndTreatmentPlans.map(
      (record) => {
        if (record.id !== rowId) {
          return record
        }

        const existingAssessmentIndex = isEdit
          ? record.patientAssessments?.findIndex(
              (assessment) =>
                assessment.id === data?.id ||
                assessment.uniqId === data?.uniqId,
            ) ?? -1
          : -1

        const updatedAssessments: PatientAssessment[] = isEdit
          ? record.patientAssessments?.map((assessment, index) =>
              index === existingAssessmentIndex
                ? { ...assessment, assessment: formData.assessment }
                : assessment,
            ) ?? []
          : [
              ...(record.patientAssessments ?? []),
              {
                recordStatus: 'Active',
                patientAssessmentPlanId: rowId,
                assessment: formData.assessment,
                uniqId: crypto.randomUUID(),
              },
            ]

        return {
          ...record,
          patientAssessments: updatedAssessments,
        }
      },
    )

    setAssessmentAndTreatmentPlans(updatedAssessmentAndTreatmentPlans)
    closeDialog()
    toast({
      type: 'success',
      title: isEdit ? 'Edit successfully' : 'Added successfully',
    })
  }

  return (
    <Toast.Provider>
      <FormContainer onSubmit={onSubmit} form={form}>
        <Box className="mt-4 grid grid-cols-6 gap-4 font-light">
          <Box className="col-span-2"></Box>
        </Box>
        <FormFieldLabel id="notes">Notes</FormFieldLabel>
        <TextArea
          size="3"
          id="notes"
          placeholder="Start typing here"
          {...form.register('assessment')}
        />
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            {isEdit ? 'Update' : 'Save'}
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { AssessmentForm }
