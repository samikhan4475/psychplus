import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Toast from '@radix-ui/react-toast'
import { Box, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAssessmentPlanOfTreatments } from '@psychplus/assessment-and-treatment-plan/api.client'
import { STATUSES, TYPES } from '@psychplus/assessment-and-treatment-plan/types'
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
import { AssessmentAndTreatmentPlanSearchDropdown } from '.'
import { formatAssessmentPayload } from './utils'

const schema = z.object({
  symptomCode: validate.anyString,
  planType: validate.anyString,
  planOfTreatmentNotes: validate.anyString,
  planDate: validate.anyString,
  symptomCodeDescription: validate.anyString,
  symptomCodesetUsed: validate.anyString,
  status: validate.anyString,
  assessment: validate.anyString,
  assessmentPlanDate: validate.anyString,
})

export type SchemaType = z.infer<typeof schema>

type FunctionalCognitiveFormProps = {
  closeDialog: () => void
}

const AssessmentAndTreatmentPlanForm: React.FC<
  FunctionalCognitiveFormProps
> = ({ closeDialog }) => {
  const {
    patientId,
    noteId,
    assessmentAndTreatmentPlans,
    setAssessmentAndTreatmentPlans,
  } = useStore()

  const { toast } = useToast()

  const DATE_FORMAT = 'yyyy-MM-dd'
  const CURRENT_DATE = format(new Date(), DATE_FORMAT)
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      assessmentPlanDate: CURRENT_DATE,
      planDate: CURRENT_DATE,
    },
  })

  const onSubmit = async () => {
    const formData = form.getValues()
    const payload = {
      ...formData,
      patientId: patientId,
      noteId: noteId,
    }

    const fomatedPayload = formatAssessmentPayload(payload)

    try {
      const res = await createAssessmentPlanOfTreatments(fomatedPayload)
      setAssessmentAndTreatmentPlans([...assessmentAndTreatmentPlans, res])
      toast({ type: 'success', title: 'Created' })
      closeDialog()
    } catch (err) {
      if (err instanceof Error) {
        toast({ type: 'error', title: err.message })
      } else {
        toast({ type: 'error', title: (err as { message: string }).message })
      }
    }
  }

  return (
    <Toast.Provider>
      <FormContainer onSubmit={onSubmit} form={form}>
        <Box className="mt-4 grid grid-cols-6 gap-4 font-light">
          <Box className="col-span-3">
            <FormTextInput
              type="date"
              label="Date"
              max="9999-12-31"
              value={form.watch('assessmentPlanDate') ?? CURRENT_DATE}
              {...form.register('assessmentPlanDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-3">
            <FormSelect
              label="Status"
              placeholder="Select"
              {...form.register('status')}
              options={STATUSES}
            />
          </Box>
        </Box>

        <Box mt="4">
          <Text size="8">Add Treatment of Plan</Text>
        </Box>
        <Box mt="4">
          <Text>Search Plan of treatment</Text>
        </Box>
        <AssessmentAndTreatmentPlanSearchDropdown form={form} />

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
              value={form.watch('planDate') ?? CURRENT_DATE}
              data-testid="plan-date"
              {...form.register('planDate')}
              className="mr-4"
            />
          </Box>
          <Box className="col-span-3">
            <FormSelect
              label="Type"
              data-testid="plan-type"
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

        <Text size="8" mt="8">
          Add Assessment
        </Text>

        <FormFieldLabel id="notes">Notes</FormFieldLabel>
        <TextArea size="3" id="notes" {...form.register('assessment')} />
        <Box className="mt-9 flex justify-end">
          <FormSubmitButton className=" rounded-2 bg-[#151B4A] px-4 py-2 text-[white]">
            Save
          </FormSubmitButton>
        </Box>
      </FormContainer>
    </Toast.Provider>
  )
}

export { AssessmentAndTreatmentPlanForm }
