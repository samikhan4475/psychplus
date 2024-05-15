'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getPatientPhoneNumber } from '@psychplus-v2/utils'
import { useForm } from 'react-hook-form'
import { patternFormatter } from 'react-number-format'
import z from 'zod'
import {
  EditableFieldValue,
  FieldPlaceholder,
  FormField,
  LabelAndValue,
  PhoneNumberInput,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({
  phoneNumber: z.string().trim().length(10, 'Invalid phone number'),
})

type SchemaType = z.infer<typeof schema>

const PhoneNumberForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      phoneNumber: getPatientPhoneNumber(profile.contactDetails.phoneNumbers),
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      contactDetails: {
        ...profile.contactDetails,
        phoneNumbers: [
          ...(profile.contactDetails.phoneNumbers ?? []),
          {
            type: 'Contact',
            number: data.phoneNumber,
          },
        ],
      },
    })

  const phoneNumber = getPatientPhoneNumber(profile.contactDetails.phoneNumbers)

  const trigger = phoneNumber ? (
    <EditableFieldValue>
      {patternFormatter(phoneNumber, {
        format: '(###) ###-####',
      })}
    </EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add contact number </FieldPlaceholder>
  )

  return (
    <LabelAndValue label="Phone Number">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField name="phoneNumber" label="Phone Number">
          <PhoneNumberInput name="phoneNumber" autoFocus />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { PhoneNumberForm }
