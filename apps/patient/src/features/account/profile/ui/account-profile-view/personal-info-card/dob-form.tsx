'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  getAgeFromDate,
  getCalendarDate,
  getDateLabel,
  getPaddedDateString,
} from '@psychplus-v2/utils'
import { type DateValue } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  DobInput,
  EditableFieldValue,
  FormField,
  LabelAndValue,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({
  birthdate: z.custom<DateValue>().superRefine((val, ctx) => {
    if (getAgeFromDate(val) < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be at least 4 years of age',
        fatal: true,
      })
    }
  }),
})

type SchemaType = z.infer<typeof schema>

const DobForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      birthdate: getCalendarDate(profile.birthdate),
    },
  })

  const submitAction = async (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      birthdate: getPaddedDateString(data.birthdate),
    })

  const trigger = (
    <EditableFieldValue>
      {getDateLabel(getCalendarDate(profile.birthdate))}
    </EditableFieldValue>
  )

  return (
    <LabelAndValue label="Date of Birth">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="birthdate" label="Date of Birth">
          <DobInput name="birthdate" />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { DobForm }
