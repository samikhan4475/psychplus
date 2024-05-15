'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getUserFullName } from '@psychplus-v2/utils'
import { TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  EditableFieldValue,
  FormField,
  LabelAndValue,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({
  firstName: z.string().trim().min(1, 'Required'),
  lastName: z.string().trim().min(1, 'Required'),
  middleName: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const NameForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...profile.legalName,
    },
  })

  const submitAction = (data: SchemaType) => {
    return updateProfileAction({
      ...profile,
      legalName: { ...profile.legalName, ...data },
    })
  }

  const trigger = (
    <EditableFieldValue>
      {getUserFullName(profile.legalName, true)}
    </EditableFieldValue>
  )

  return (
    <LabelAndValue label="Name">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="firstName" label="First Name">
          <TextFieldInput {...form.register('firstName')} autoFocus />
        </FormField>
        <FormField name="middleName" label="Middle Name">
          <TextFieldInput {...form.register('middleName')} />
        </FormField>
        <FormField name="lastName" label="Last Name">
          <TextFieldInput {...form.register('lastName')} />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { NameForm }
