'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PatientProfile, PhoneNumberEnum } from '@psychplus-v2/types'
import { Flex, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ExtensionInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { getPlaceholder } from '@/features/account/profile/utils'
import { schema } from './schema'

type SchemaType = z.infer<typeof schema>

const AdditionalContactForm = ({
  isEdit,
  handleSave,
}: {
  isEdit: boolean
  handleSave: () => void
}) => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const homeContact = profile.contactDetails.phoneNumbers?.find(
    (phone) => phone.type === PhoneNumberEnum.HOME,
  )

  const workContact = profile.contactDetails.phoneNumbers?.find(
    (phone) => phone.type === PhoneNumberEnum.BUSINESS,
  )

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      homeContactNumber: homeContact?.number ?? '',
      homeContactExtension: homeContact?.extension ?? '',
      homeContactComment: homeContact?.comment ?? '',
      workContactNumber: workContact?.number ?? '',
      workContactExtension: workContact?.extension ?? '',
      workContactComment: workContact?.comment ?? '',
    },
  })

  const submitAction = (data: SchemaType) => {
    const phoneNumbers =
      profile.contactDetails.phoneNumbers?.filter(
        (phone) =>
          phone.type !== PhoneNumberEnum.HOME &&
          phone.type !== PhoneNumberEnum.BUSINESS,
      ) ?? []

    phoneNumbers.push({
      type: PhoneNumberEnum.HOME,
      number: data.homeContactNumber ?? '',
      extension: data.homeContactExtension,
      comment: data.homeContactComment,
    })

    phoneNumbers.push({
      type: PhoneNumberEnum.BUSINESS,
      number: data.workContactNumber ?? '',
      extension: data.workContactExtension,
      comment: data.workContactComment,
    })

    const body: PatientProfile = {
      ...profile,
      contactDetails: {
        ...profile.contactDetails,
        phoneNumbers,
      },
    }

    console.log('--body--', body)

    return updateProfileAction(body)
  }

  const onSuccess = (data: PatientProfile) => {
    setProfile(data)
    handleSave()
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={onSuccess}
      onFormClose={handleSave}
      isEdit={isEdit}
    >
      <Flex direction="column" gap="3" className="w-full" mb="4">
        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Home Phone</FormFieldLabel>
            <PhoneNumberInput
              size="3"
              {...form.register('homeContactNumber')}
              editable={!isEdit}
              placeholder={getPlaceholder('home phone', isEdit)}
            />
            <FormFieldError name="homeContactNumber" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Ext</FormFieldLabel>
            <ExtensionInput
              size="3"
              {...form.register('homeContactExtension')}
              value={form.getValues('homeContactExtension')}
              disabled={!isEdit}
              placeholder={getPlaceholder('extension', isEdit)}
            />
            <FormFieldError name="homeContactExtension" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Comment</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('homeContactComment')}
              disabled={!isEdit}
              placeholder={getPlaceholder('comment', isEdit)}
            />
            <FormFieldError name="homeContactComment" />
          </FormFieldContainer>
        </Flex>

        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Work Phone</FormFieldLabel>
            <PhoneNumberInput
              size="3"
              {...form.register('workContactNumber')}
              editable={!isEdit}
              placeholder={getPlaceholder('work phone', isEdit)}
            />
            <FormFieldError name="workContactNumber" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Ext</FormFieldLabel>
            <ExtensionInput
              size="3"
              {...form.register('workContactExtension')}
              value={form.getValues('workContactExtension')}
              disabled={!isEdit}
              placeholder={getPlaceholder('extension', isEdit)}
            />
            <FormFieldError name="workContactExtension" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Comment</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('workContactComment')}
              disabled={!isEdit}
              placeholder={getPlaceholder('comment', isEdit)}
            />
            <FormFieldError name="workContactComment" />
          </FormFieldContainer>
        </Flex>
      </Flex>
    </ToggleableForm>
  )
}

export { AdditionalContactForm }
