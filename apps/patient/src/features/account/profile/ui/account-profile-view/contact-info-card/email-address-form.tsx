'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
  email: z.string().email().trim(),
})

type SchemaType = z.infer<typeof schema>

const EmailAddressForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: profile.contactDetails.email,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      contactDetails: { ...profile.contactDetails, ...data },
    })

  const trigger = (
    <EditableFieldValue>{profile.contactDetails.email}</EditableFieldValue>
  )

  return (
    <LabelAndValue
      label="Email"
      tooltip="This is the email address you use to log in."
    >
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField
          name="email"
          label="Email"
          containerClassName="w-full max-w-[300px]"
        >
          <TextFieldInput {...form.register('email')} autoFocus />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { EmailAddressForm }
