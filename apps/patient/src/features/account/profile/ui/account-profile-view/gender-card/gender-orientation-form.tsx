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
  genderOrientation: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

const GenderOrientationForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      genderOrientation: profile.genderOrientation,
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      ...data,
    })

  const trigger = profile.genderOrientation ? (
    <EditableFieldValue>{profile.genderOrientation}</EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add gender orientation</FieldPlaceholder>
  )

  return (
    <LabelAndValue label="Orientation">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="genderOrientation" label="Orientation">
          <CodesetFormSelect
            name="genderOrientation"
            codeset={CODESETS.GenderOrientation}
            placeholder="Select orientation"
          />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { GenderOrientationForm }
