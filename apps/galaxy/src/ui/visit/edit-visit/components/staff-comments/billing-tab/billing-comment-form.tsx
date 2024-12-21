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
import { BillingCommentInput } from './billing-comment-input'

const schema = z.object({
  comment: z.string().min(1, 'Required'),
})

export type BillingCommentFormSchemaType = z.infer<typeof schema>

const BillingCommentForm = ({
  appointmentId,
  fetchStaffComments,
}: {
  appointmentId: number
  fetchStaffComments: (payload: StaffCommentParams) => void
}) => {
  const form = useForm<BillingCommentFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit: SubmitHandler<BillingCommentFormSchemaType> = async (
    data,
  ) => {
    const requestData = {
      recordStatus: STAFF_COMMENT_STATUS.Active,
      comment: data.comment,
      appointmentId: Number(appointmentId),
      isTreatmentComment: false,
      isBillingComment: true,
    }

    const result = await createStaffCommentAction(requestData)

    if (result.state === 'error') {
      return toast.error(result.error)
    }

    toast.success('Comment created successfully')
    form.reset()
    fetchStaffComments({
      isTreatment: false,
      isBilling: true,
      appointmentId: appointmentId,
      recordStatuses: [STAFF_COMMENT_STATUS.Active],
    })
  }

  return (
    <FormContainer className="flex-row gap-2" form={form} onSubmit={onSubmit}>
      <BillingCommentInput />
      <AddButton />
    </FormContainer>
  )
}

export { BillingCommentForm }
