'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PatientProfile } from '@psychplus-v2/types'
import { Flex, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PlacesAutocomplete,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { getPlaceholder } from '@/features/account/profile/utils'
import { schema } from './schema'

type SchemaType = z.infer<typeof schema>

const AlternateInfoForm = ({
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

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: profile.alternateOrPreviousName?.firstName,
      lastName: profile.alternateOrPreviousName?.lastName,
      middleName: profile.alternateOrPreviousName?.middleName,
      title: profile.alternateOrPreviousName?.title,
      suffix: profile.alternateOrPreviousName?.suffix,
      honors: profile.alternateOrPreviousName?.honors,
      primaryStreet1:
        profile.alternateOrPreviousContactDetails?.addresses?.[0]?.street1,
      primaryStreet2:
        profile.alternateOrPreviousContactDetails?.addresses?.[0]?.street2,
      primaryCity:
        profile.alternateOrPreviousContactDetails?.addresses?.[0]?.city,
      primaryPostalCode:
        profile.alternateOrPreviousContactDetails?.addresses?.[0]?.postalCode,
      primaryZipLast4:
        profile.alternateOrPreviousContactDetails?.addresses?.[0]?.zipLast4 ??
        '',
    },
  })

  const submitAction = (data: SchemaType) => {
    const body: PatientProfile = {
      ...profile,
      alternateOrPreviousName: {
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        middleName: data.middleName ?? '',
        title: data.title ?? '',
        suffix: data.suffix ?? '',
        honors: data.honors ?? '',
      },
      alternateOrPreviousContactDetails: {
        addresses: [
          {
            street1: data.primaryStreet1 ?? '',
            street2: data.primaryStreet2,
            city: data.primaryCity ?? '',
            postalCode: data.primaryPostalCode ?? '',
            zipLast4: data.primaryZipLast4 ?? '',
          },
        ],
      },
    }

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
        <Flex className="w-full" gap="3" direction={{ initial: 'column', sm: 'row' }}>
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>First Name</FormFieldLabel>
            <TextFieldInput
              placeholder={getPlaceholder(`first name`, isEdit)}
              size={{ initial: '2', sm: '3' }}
              className="text-[13px] sm:text-[14px]"
              {...form.register('firstName')}
              disabled={!isEdit}
            />
            <FormFieldError name="firstName" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Middle Name</FormFieldLabel>
            <TextFieldInput
              placeholder={getPlaceholder(`middle name`, isEdit)}
              size={{ initial: '2', sm: '3' }}
              className="text-[13px] sm:text-[14px]"
              {...form.register('middleName')}
              disabled={!isEdit}
            />
            <FormFieldError name="middleName" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Last Name</FormFieldLabel>
            <TextFieldInput
              placeholder={getPlaceholder(`last name`, isEdit)}
              size={{ initial: '2', sm: '3' }}
              className="text-[13px] sm:text-[14px]"
              {...form.register('lastName')}
              disabled={!isEdit}
            />
            <FormFieldError name="lastName" />
          </FormFieldContainer>
        </Flex>

        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel>Prefix</FormFieldLabel>
            <TextFieldInput
              placeholder={getPlaceholder(`prefix`, isEdit)}
              size={{ initial: '2', sm: '3' }}
              className="text-[13px] sm:text-[14px]"
              {...form.register('title')}
              disabled={!isEdit}
            />
            <FormFieldError name="title" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Suffix</FormFieldLabel>
            <TextFieldInput
              placeholder={getPlaceholder(`suffix`, isEdit)}
              size={{ initial: '2', sm: '3' }}
              className="text-[13px] sm:text-[14px]"
              {...form.register('suffix')}
              disabled={!isEdit}
            />
            <FormFieldError name="suffix" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Prof. Suffix</FormFieldLabel>
            <TextFieldInput
              placeholder={getPlaceholder(`prof. suffix`, isEdit)}
              size={{ initial: '2', sm: '3' }}
              className="text-[13px] sm:text-[14px]"
              {...form.register('honors')}
              disabled={!isEdit}
            />
            <FormFieldError name="honors" />
          </FormFieldContainer>
        </Flex>

        <PlacesAutocomplete
          name="primary"
          editable={!isEdit}
          includeState={false}
        />
      </Flex>
    </ToggleableForm>
  )
}

export { AlternateInfoForm }
