'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Dialog,
  Flex,
  Grid,
  Separator,
  TextArea,
} from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import {
  CheckboxInput,
  CodesetSelect,
  FormContainer,
  FormError,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { Experience } from '@/types'
import { updateRatingReasonAction } from '../actions'

const schema = z.object({
  staffComments: z.string().trim().optional(),
  appointmentRatingReason: z.string().min(1, 'Required').trim(),
  isValidateRating: z.boolean().optional(),
})

type SchemaType = z.infer<typeof schema>

interface EditExperienceFormProps {
  onClose?: () => void
  handleCloseDialog: () => void
  experience: Experience
}

const EditExperienceForm = ({
  experience,
  onClose,
  handleCloseDialog,
}: EditExperienceFormProps) => {
  const defaultFormValues = {
    staffComments: experience.staffComments || '',
    appointmentRatingReason: experience.ratingReason || '',
    isValidateRating: experience.isValidateRating || false,
    rating: experience.rating ? String(experience.rating) : '',
  }

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  })

  const [formError, setFormError] = useState<string>()

  const ratings = Array.from({ length: 5 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
    disabled: false,
  }))

  const handleSubmit: SubmitHandler<SchemaType> = async (data) => {
    setFormError(undefined)

    const response = await updateRatingReasonAction(experience.appointmentId, {
      appointmentId: experience.appointmentId,
      ...data,
    })

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    toast.success('Updated successfully!')
    onClose?.()
    handleCloseDialog()
  }

  const renderFormFields = () => (
    <Flex direction="column" gap="2">
      <CheckboxInput
        label={'have not been able to validate this rating'}
        labelClassName="max-w-max"
        field="isValidateRating"
        checked={form.watch('isValidateRating')}
      />
      <Grid columns="2" gap="2">
        <FormFieldContainer className={'flex-col items-start gap-1'}>
          <FormFieldLabel>Rating</FormFieldLabel>
          <SelectInput
            field="rating"
            className={'w-full min-w-0'}
            disabled={true}
            buttonClassName={
              'w-full min-w-0 h-6 border border-solid border-pp-gray-2 !outline-none [box-shadow:none]'
            }
            options={ratings}
          />
        </FormFieldContainer>

        <FormFieldContainer className={'flex-col items-start gap-1'}>
          <FormFieldLabel required>Reason</FormFieldLabel>

          <Flex className={'w-full min-w-0'}>
            <CodesetSelect
              name="appointmentRatingReason"
              codeset={CODESETS.AppointmentRatingReason}
              className="border-pp-gray-2 h-7 w-full min-w-0 border border-solid text-1 !outline-none [box-shadow:none]"
              size="1"
              placeholder="Select reason"
            />
          </Flex>
          <FormFieldError name="appointmentRatingReason" />
        </FormFieldContainer>
        <FormFieldContainer className="col-span-full">
          <FormFieldLabel className="!text-1">Staff Comments</FormFieldLabel>
          <TextArea
            size="1"
            id="staffComments"
            placeholder="Add a comment"
            className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
            rows={5}
            {...form.register('staffComments')}
          />
          <FormFieldError name="comments" />
        </FormFieldContainer>
      </Grid>
    </Flex>
  )

  const renderButtons = () => (
    <Flex gap="3" justify="end">
      <Dialog.Close>
        <Button variant="outline" color="gray" size="2">
          Cancel
        </Button>
      </Dialog.Close>
      <Button highContrast size="2">
        Save
      </Button>
    </Flex>
  )

  return (
    <FormContainer form={form} onSubmit={handleSubmit}>
      <FormError message={formError} />
      {renderFormFields()}
      <Separator
        className="border-pp-grey my-4 w-full"
        orientation="horizontal"
      />
      {renderButtons()}
    </FormContainer>
  )
}

export { EditExperienceForm, type SchemaType }
