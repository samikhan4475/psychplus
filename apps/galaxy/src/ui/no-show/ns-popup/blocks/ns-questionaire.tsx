import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { useStore } from '@/store'
import { useRefetchAppointments } from '../../../schedule/hooks'
import { transformIn, updateVisit } from '../../../schedule/utils'
import { setNoShowStatusAction } from '../../actions'
import { NO_SHOW_QUESTIONS, NoSowDefaultValues } from '../../constants'
import { noShowFormSchema, NoShowFormSchema } from '../schema'
import { NoShowFormData, NoShowQuestionaireParams } from '../types'
import { CommentSection } from './ns-comment'
import { NoShowQuestion } from './ns-question'
import { SaveButton } from './save-button'

function NoShowQuestionaire({ appointment }: NoShowQuestionaireParams) {
  const form = useForm<NoShowFormSchema>({
    resolver: zodResolver(noShowFormSchema),
    mode: 'onChange',
    defaultValues: NoSowDefaultValues,
  })

  const refetch = useRefetchAppointments()
  const { user } = useStore((state) => ({
    user: state.user,
  }))

  const onSubmit = async (data: NoShowFormData) => {
    const res = await setNoShowStatusAction(appointment, data, user)

    if (res.state == 'error') {
      toast.error(res.error || 'Failed to update status')
    } else {
      let successMessage = undefined
      const transformedBody = transformIn(appointment)
      transformedBody.appointmentStatus = 'NoShow'
      await updateVisit({
        body: transformedBody,
        onSuccess: refetch,
        onError: () => toast.error('Error updating status'),
        successMessage,
      })
    }
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex className=" mt-2  flex-col gap-3">
        {NO_SHOW_QUESTIONS.map((item) => (
          <NoShowQuestion
            key={item.field}
            question={item.question}
            options={item.options}
            alert={item.alert}
            field={item.field}
            dependantField={item.dependantField}
            dependantValue={item.dependantValue}
            errorValue={item.errorValue}
          />
        ))}

        <CommentSection />
        <SaveButton />
      </Flex>
    </FormContainer>
  )
}

export default NoShowQuestionaire
