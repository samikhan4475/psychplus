'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getPatientSsn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  EditableFieldValue,
  FieldPlaceholder,
  FormField,
  LabelAndValue,
  SSNInput,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'

const schema = z.object({
  socialSecurityNumber: z.string().trim().length(9, 'Invalid SSN'),
})

type SchemaType = z.infer<typeof schema>

const SSNForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      socialSecurityNumber: getPatientSsn(profile.socialSecurityNumber),
    },
  })

  const submitAction = (data: SchemaType) =>
    updateProfileAction({
      ...profile,
      ...data,
    })

  const trigger = profile.socialSecurityNumber ? (
    <EditableFieldValue>
      <Flex align="center">
        <Text size="1" className="tracking-[0.5px]">
          &#9679;&#9679;&#9679;-&#9679;&#9679;-
        </Text>
        {profile.socialSecurityNumber.slice(-4)}
      </Flex>
    </EditableFieldValue>
  ) : (
    <FieldPlaceholder>+ add social security number</FieldPlaceholder>
  )

  return (
    <LabelAndValue label="SSN">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={setProfile}
        trigger={trigger}
      >
        <FormField
          name="socialSecurityNumber"
          label="SSN"
          containerClassName="w-full max-w-[200px]"
        >
          <SSNInput name="socialSecurityNumber" />
        </FormField>
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { SSNForm }
