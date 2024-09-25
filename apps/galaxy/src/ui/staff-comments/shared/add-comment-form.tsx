'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { createStaffCommentAction } from '../actions'
import { AddCommentField, commentSchema, CommentSchemaType } from '../shared'
import { useStore } from '../store'

interface AddCommentFormProps {
  patientId: string
}

const AddCommentForm = ({ patientId }: AddCommentFormProps) => {
  const { fetchComments, activeTab } = useStore((state) => ({
    fetchComments: state.fetchComments,
    activeTab: state.activeTab,
  }))

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      staffComment: '',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit: SubmitHandler<CommentSchemaType> = async (data) => {
    const isBilling = activeTab === 'Billing'

    const requestData = {
      PatientId: patientId,
      StaffCommment: data.staffComment,
      AppointmentId: 11938,
      IsTreatmentComment: !isBilling,
      IsBillingComment: isBilling,
    }

    const result = await createStaffCommentAction(requestData)

    if (result.state === 'error') {
      toast.error(result.error)
      return
    }

    toast.success('Comment created successfully')
    form.reset()
    fetchComments({
      PatientId: patientId,
      IsTreatment: !isBilling,
      IsBilling: isBilling,
    })
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white w-full gap-2.5 rounded-1 p-2 shadow-2"
    >
      <Heading size="3">Add Comments</Heading>
      <Flex className="max-w-[561px] gap-[6px]" width="100%">
        <AddCommentField />
        <Button highContrast size="1" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { AddCommentForm }
