'use client'

import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormTextInput } from '@psychplus/components/form'
import { Button } from '@psychplus/ui/button'

interface UpdatePasswordFormFields {
  password: string
  confirmPassword: string
}

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormFields>({
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<UpdatePasswordFormFields> = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    location.assign('/login')
  }

  return (
    <Flex direction="column" gap="4" asChild>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="password"
          type="password"
          register={register}
          errors={errors}
          placeholder="password"
          data-testid="update-password-password-input"
        />
        <FormTextInput
          name="confirmPassword"
          type="password"
          register={register}
          errors={errors}
          placeholder="confirm password"
          data-testid="update-password-confirm-input"
        />
        <Button data-testid="update-password-button" size="3" type="submit">
          Submit
        </Button>
      </form>
    </Flex>
  )
}

export { UpdatePasswordForm }
