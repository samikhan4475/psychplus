import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import { Box, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  PatientPlanOfTreatment,
  TYPES,
} from '@psychplus/assessment-and-treatment-plan/types'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { FormContainer, FormFieldLabel } from '@psychplus/ui/form'
import { TextArea } from '@psychplus/ui/text-area'
import { useToast } from '@psychplus/ui/toast-provider'
import { useStore } from '@/widgets/assessment-and-treatment-plan-list/store'
import { TreatmentPlanSearchDropdown } from '.'

const schema = z.object({
  planType: validate.anyString,
  symptomCodeDescription: validate.anyString,
  symptomCode: validate.anyString,
  planOfTreatmentNotes: validate.anyString,
  planDate: validate.anyString,
})

export type SchemaType = z.infer<typeof schema>

type TreatmentPlanProps = {
  data?: PatientPlanOfTreatment
  isEdit?: boolean
  closeDialog: () => void
  rowId: string | undefined
}

const TreatementPlanForm: React.FC<TreatmentPlanProps> = ({
  data,
  isEdit,
  closeDialog,
  rowId,
}) => {
  const DATE_FORMAT = 'yyyy-MM-dd'
  const { assessmentAndTreatmentPlans, setAssessmentAndTreatmentPlans } =
    useStore()

  const { toast } = useToast()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      symptomCode: data?.symptomCode || '',
      symptomCodeDescription: data?.symptomCodeDescription || '',
      planType: data?.planType || '',
      planOfTreatmentNotes: data?.planOfTreatmentNotes || '',

      planDate: data?.planDate
        ? format(new Date(data?.planDate), 'yyyy-MM-dd')
        : '',
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()

    const updatedAssessmentAndTreatmentPlans = assessmentAndTreatmentPlans.map(
      (record) => {
        if (record.id !== rowId) {
          return record
        }

        const existingPatientPlanOfTreatmentIndex = isEdit
          ? record.patientPlanOfTreatments?.findIndex(
              (treatment) =>
                treatment.id === data?.id || treatment.uniqId === data?.uniqId,
            ) ?? -1
          : -1

        const updatedPatientPlanOfTreatment: PatientPlanOfTreatment[] = isEdit
          ? record.patientPlanOfTreatments?.map((treatment, index) =>
              index === existingPatientPlanOfTreatmentIndex
                ? {
                    ...treatment,
                    planDate: formData.planDate,
                    planOfTreatmentNotes: formData.planOfTreatmentNotes,
                    symptomCode: formData.symptomCode,
                    symptomCodeDescription: formData.symptomCodeDescription,
                    planType: formData.planType,
                  }
                : treatment,
            ) ?? []
          : [
              ...(record.patientPlanOfTreatments ?? []),
              {
                recordStatus: 'Active',
                planDate: formData.planDate,
                planOfTreatmentNotes: formData.planOfTreatmentNotes,
                symptomCode: formData.symptomCode,
                symptomCodesetUsed: 'ICD',
                symptomCodeDescription: formData.symptomCodeDescription,
                planType: formData.planType,
                patientAssessmentPlanId: rowId,
                uniqId: crypto.randomUUID(),
              },
            ]

        return {
          ...record,
          patientPlanOfTreatments: updatedPatientPlanOfTreatment,
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
      <Text mt="3">Search Plan of treatment</Text>
      <TreatmentPlanSearchDropdown form={form} />
      <FormContainer onSubmit={onSubmit} form={form}>
        <Box className="mt-4 grid grid-cols-6 gap-4 font-light">
          <Box className="col-span-1">
            <FormTextInput
              readOnly
              label={'Code'}
              value={form.watch('symptomCode')}
              {...form.register('symptomCode')}
            />
          </Box>
          <Box className="col-span-5">
            <FormTextInput
              readOnly
              label={'Description'}
              value={form.watch('symptomCodeDescription')}
              {...form.register('symptomCodeDescription')}
            />
          </Box>
          <Box className="col-span-3">
            <FormTextInput
              type="date"
              label="Plan Date"
              max="9999-12-31"
              value={form.watch('planDate') ?? format(new Date(), DATE_FORMAT)}
              data-testid="expiration-date"
              {...form.register('planDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-3">
            <FormSelect
              label="Type"
              data-testid="history-type"
              placeholder="Select"
              {...form.register('planType')}
              options={TYPES}
            />
          </Box>
        </Box>
        <FormFieldLabel id="notes">Notes</FormFieldLabel>
        <TextArea
          size="3"
          id="notes"
          {...form.register('planOfTreatmentNotes')}
        />
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className="rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            Save
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { TreatementPlanForm }
