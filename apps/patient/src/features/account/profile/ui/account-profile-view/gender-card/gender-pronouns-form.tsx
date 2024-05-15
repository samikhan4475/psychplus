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
  genderPronoun: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

const GenderPronounsForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      genderPronoun: profile.genderPronoun,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({ ...profile, ...data })

  const trigger = profile.genderPronoun ? (
    <EditableFieldValue>{profile.genderPronoun}</EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add pronouns</FieldPlaceholder>
  )

  return (
    <LabelAndValue label="Pronouns">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="genderPronoun" label="Pronouns">
          <CodesetFormSelect
            name="genderPronoun"
            codeset={CODESETS.GenderPronoun}
            placeholder="Select pronouns"
          />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { GenderPronounsForm }
