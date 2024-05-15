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
  genderExpression: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

const GenderExpressionForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      genderExpression: profile.genderExpression,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({ ...profile, ...data })

  const trigger = profile.genderExpression ? (
    <EditableFieldValue>{profile.genderExpression}</EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add gender expression</FieldPlaceholder>
  )

  return (
    <LabelAndValue label="Gender Expression">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="genderExpression" label="Gender Expression">
          <CodesetFormSelect
            name="genderExpression"
            codeset={CODESETS.GenderExpression}
            placeholder="Select gender expression"
          />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { GenderExpressionForm }
