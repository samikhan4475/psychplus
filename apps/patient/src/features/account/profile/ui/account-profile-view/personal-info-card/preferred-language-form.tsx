'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CODESETS } from '@psychplus-v2/constants'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CodesetFormSelect,
  EditableFieldValue,
  FieldPlaceholder,
  FormField,
  LabelAndValue,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({
  preferredLanguage: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

const PreferredLanguageForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      preferredLanguage: profile?.preferredLanguage,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      ...data,
    })

  const trigger = profile.preferredLanguage ? (
    <EditableFieldValue>{profile.preferredLanguage}</EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add preferred language</FieldPlaceholder>
  )

  return (
    <LabelAndValue label="Preferred Language">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
        toastData={{
          title: 'Saved preferred language',
        }}
      >
        <FormField name="preferredLanguage" label="Preferred Language">
          <CodesetFormSelect
            name="preferredLanguage"
            codeset={CODESETS.Language}
            placeholder="Select language"
          />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { PreferredLanguageForm }
