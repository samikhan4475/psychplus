'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CODE_NOT_SPECIFIED, CODESETS } from '@psychplus-v2/constants'
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
  gender: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

const GenderForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      gender:
        profile.gender !== CODE_NOT_SPECIFIED ? profile.gender : undefined,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({ ...profile, ...data })

  const trigger = profile.gender ? (
    <EditableFieldValue>{profile.gender}</EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add gender</FieldPlaceholder>
  )

  return (
    <LabelAndValue
      label="Legal Sex"
      tooltip="We collect this for insurance & clinical purposes."
    >
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="gender" label="Legal Sex">
          <CodesetFormSelect
            name="gender"
            codeset={CODESETS.Gender}
            placeholder="Select gender"
            exclude={[CODE_NOT_SPECIFIED]}
          />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { GenderForm }
