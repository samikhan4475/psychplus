'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CODESETS } from '@psychplus-v2/constants'
import { getUserFullName } from '@psychplus-v2/utils'
import { TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CodesetFormSelect,
  EditableFieldValue,
  FieldPlaceholder,
  FormField,
  LabelAndValue,
  PhoneNumberInput,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '../../../actions'
import { useProfileStore } from '../../../store'

const schema = z.object({
  firstName: z.string().min(1, 'Required.'),
  lastName: z.string().min(1, 'Required.'),
  middleName: z.string().optional(),
  relationship: z.string().min(1, 'Required.'),
  phoneNumber: z.string().min(1, 'Required.'),
  email: z.string().min(1, 'Required').email('Invalid email.'),
})

type SchemaType = z.infer<typeof schema>

const GuardianForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: profile.guardian?.name?.firstName,
      middleName: profile.guardian?.name?.middleName,
      lastName: profile.guardian?.name?.lastName,
      relationship: profile.guardian?.relationship,
      phoneNumber: profile.guardian?.contact?.phoneNumbers?.[0]?.number,
      email: profile.guardian?.contact?.email,
    },
  })

  const onSubmit = async (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      guardian: {
        isEmergencyContact: false,
        name: {
          ...profile.guardian?.name,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
        },
        relationship: data.relationship,
        contact: {
          ...profile.guardian?.contact,
          email: data.email,
          phoneNumbers: [
            {
              type: 'Contact',
              number: data.phoneNumber,
            },
          ],
        },
      },
    })

  const trigger =
    profile.guardian && profile.guardian.name ? (
      <EditableFieldValue>{`${getUserFullName(profile.guardian.name)} (${
        profile.guardian.relationship
      })`}</EditableFieldValue>
    ) : (
      <FieldPlaceholder>+ add guardian</FieldPlaceholder>
    )

  return (
    <LabelAndValue label="Guardian">
      <ToggleableForm
        form={form}
        trigger={trigger}
        submitAction={onSubmit}
        onSuccess={setProfile}
      >
        <FormField name="firstName" label="First Name">
          <TextFieldInput size="3" {...form.register('firstName')} autoFocus />
        </FormField>
        <FormField name="middleName" label="Middle Name">
          <TextFieldInput size="3" {...form.register('middleName')} />
        </FormField>
        <FormField name="lastName" label="Last Name">
          <TextFieldInput size="3" {...form.register('lastName')} />
        </FormField>
        <FormField name="relationship" label="Relationship">
          <CodesetFormSelect
            size="3"
            name="relationship"
            codeset={CODESETS.GuardianRelationship}
          />
        </FormField>
        <FormField name="phoneNumber" label="Phone Number">
          <PhoneNumberInput name="phoneNumber" />
        </FormField>
        <FormField
          name="email"
          label="Email"
          containerClassName="w-full max-w-[300px]"
        >
          <TextFieldInput size="3" {...form.register('email')} />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { GuardianForm }
