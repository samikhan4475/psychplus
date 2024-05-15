'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  EditableFieldValue,
  FieldPlaceholder,
  FormField,
  LabelAndValue,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({
  preferredName: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const PreferredNameForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      preferredName: profile.legalName.preferredName,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      legalName: { ...profile.legalName, ...data },
    })

  const trigger = profile.legalName.preferredName ? (
    <EditableFieldValue>{profile.legalName.preferredName}</EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add preferred name </FieldPlaceholder>
  )

  return (
    <LabelAndValue label="Preferred Name">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="preferredName" label="Preferred Name">
          <TextFieldInput {...form.register('preferredName')} autoFocus />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { PreferredNameForm }
