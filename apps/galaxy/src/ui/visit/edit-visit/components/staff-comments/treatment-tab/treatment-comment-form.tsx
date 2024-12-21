'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { STAFF_COMMENT_STATUS } from '@/types'
import { createStaffCommentAction } from '@/ui/visit/actions/create-staff-comment'
import { StaffCommentParams } from '@/ui/visit/types'
import { AddButton } from './add-button'
import { TreatmentCommentInput } from './treatment-comment-input'

const schema = z.object({
  comment: z.string().min(1, 'Required'),
})

export type TreatmentCommentFormSchemaType = z.infer<typeof schema>

const TreatmentCommentForm = ({
  appointmentId,
  fetchStaffComments,
}: {
  appointmentId: number
  fetchStaffComments: (formValues: StaffCommentParams) => void
}) => {
  const form = useForm<TreatmentCommentFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit: SubmitHandler<TreatmentCommentFormSchemaType> = async (
    data,
  ) => {
    const requestData = {
      recordStatus: STAFF_COMMENT_STATUS.Active,
      comment: data.comment,
      appointmentId: appointmentId,
      isTreatmentComment: true,
      isBillingComment: false,
    }

    const result = await createStaffCommentAction(requestData)

    if (result.state === 'error') {
      return toast.error(result.error)
    }

    toast.success('Comment created successfully')
    form.reset()
    fetchStaffComments({
      isTreatment: true,
      isBilling: false,
      appointmentId: appointmentId,
      recordStatuses: [STAFF_COMMENT_STATUS.Active],
    })
  }

  return (
    <FormContainer className="flex-row gap-2" form={form} onSubmit={onSubmit}>
      <TreatmentCommentInput />
      <AddButton />
    </FormContainer>
  )
}

export { TreatmentCommentForm }
