'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CODE_ETHNICITY,
  CODE_RACE,
  CODESETS,
  ETHNICITIES_GROUPING_CODES,
  RACES_GROUPING_CODES,
} from '@psychplus-v2/constants'
import { PatientProfile } from '@psychplus-v2/types'
import { Flex, Grid, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CodesetFormMultipleSelect,
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { schema } from './descriptive-schema'

type SchemaType = z.infer<typeof schema>

const DescriptiveForm = ({
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

  const contactNumber = profile.contactDetails.phoneNumbers?.find(
    (number) => number.type === 'Contact',
  )

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      preferredName: profile.legalName.preferredName,
      prefix: profile.legalName.title,
      suffix: profile.legalName.suffix,
      professionalSuffix: profile.legalName.honors,
      gender: profile.gender,
      genderExpression: profile.genderExpression,
      genderOrientation: profile.genderOrientation,
      genderPronoun: profile.genderPronoun,
      comment: contactNumber?.comment,
      religion: profile.religion,
      motherMaidenName: profile.motherMaidenName,
      language: profile.language,
      languageAbility: profile.languageAbility,
      languageProficiency: profile.languageProficiency,
      races: profile.races || [],
      ethnicities: profile.ethnicities || [],
    },
  })

  const submitAction = async (data: SchemaType) => {
    const body: PatientProfile = {
      ...profile,
      legalName: {
        ...profile.legalName,
        preferredName: data.preferredName,
        title: data.prefix,
        suffix: data.suffix,
        honors: data.professionalSuffix,
      },
      gender: data.gender,
      genderOrientation: data.genderOrientation,
      genderExpression: data.genderExpression,
      genderPronoun: data.genderPronoun,
      religion: data.religion,
      motherMaidenName: data.motherMaidenName,
      language: data.language,
      languageAbility: data.languageAbility,
      languageProficiency: data.languageProficiency,
      contactDetails: {
        ...profile.contactDetails,
        phoneNumbers: [
          {
            type: 'Contact',
            comment: data.comment,
            number: contactNumber?.number || '',
          },
        ],
      },
      races: data?.races || [],
      ethnicities: data?.ethnicities || [],
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
        <Grid columns="3" gap="3">
          <FormFieldContainer>
            <FormFieldLabel>Preferred Name</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('preferredName')}
              disabled={!isEdit}
            />
            <FormFieldError name="preferredName" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Prefix</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('prefix')}
              disabled={!isEdit}
            />
            <FormFieldError name="prefix" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Suffix</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('suffix')}
              disabled={!isEdit}
            />
            <FormFieldError name="suffix" />
          </FormFieldContainer>
        </Grid>

        <Grid columns="3" gap="3">
          <FormFieldContainer>
            <FormFieldLabel>Prof. Suffix</FormFieldLabel>
            <CodesetFormSelect
              name="professionalSuffix"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select prof suffix' : ''}
              codeset={CODESETS.ProfSuffix}
              size="3"
            />
            <FormFieldError name="professionalSuffix" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel required>Gender</FormFieldLabel>
            <CodesetFormSelect
              name="gender"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select gender' : ''}
              codeset={CODESETS.Gender}
              size="3"
            />
            <FormFieldError name="gender" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Orientation</FormFieldLabel>
            <CodesetFormSelect
              name="genderOrientation"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select orientation' : ''}
              codeset={CODESETS.GenderOrientation}
              size="3"
            />
            <FormFieldError name="genderOrientation" />
          </FormFieldContainer>
        </Grid>

        <Grid columns="3" gap="3">
          <FormFieldContainer>
            <FormFieldLabel>Gender Expression</FormFieldLabel>
            <CodesetFormSelect
              name="genderExpression"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select gender expression' : ''}
              codeset={CODESETS.GenderExpression}
              size="3"
            />
            <FormFieldError name="genderExpression" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Pronoun</FormFieldLabel>
            <CodesetFormSelect
              name="genderPronoun"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select pronoun' : ''}
              codeset={CODESETS.GenderPronoun}
              size="3"
            />
            <FormFieldError name="genderPronoun" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Comment</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('comment')}
              disabled={!isEdit}
            />
            <FormFieldError name="comment" />
          </FormFieldContainer>
        </Grid>

        <Grid columns="3" gap="3">
          <FormFieldContainer>
            <FormFieldLabel>Religion</FormFieldLabel>
            <CodesetFormSelect
              name="religion"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select religion' : ''}
              codeset={CODESETS.Religion}
              size="3"
            />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Mother Maiden Name</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('motherMaidenName')}
              disabled={!isEdit}
            />
            <FormFieldError name="motherMaidenName" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Language</FormFieldLabel>
            <CodesetFormSelect
              name="language"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select language' : ''}
              codeset={CODESETS.Language}
              size="3"
            />
            <FormFieldError name="language" />
          </FormFieldContainer>
        </Grid>

        <Grid columns="3" gap="3">
          <FormFieldContainer>
            <FormFieldLabel>Language Ability</FormFieldLabel>
            <CodesetFormSelect
              name="languageAbility"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select language ability' : ''}
              codeset={CODESETS.LanguageAbility}
              size="3"
            />
            <FormFieldError name="languageAbility" />
          </FormFieldContainer>

          <FormFieldContainer>
            <FormFieldLabel>Proficiency</FormFieldLabel>
            <CodesetFormSelect
              name="languageProficiency"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select proficiency' : ''}
              codeset={CODESETS.LanguageProficiency}
              size="3"
            />
            <FormFieldError name="languageProficiency" />
          </FormFieldContainer>
        </Grid>

        <FormFieldContainer>
          <FormFieldLabel>Race</FormFieldLabel>
          <CodesetFormMultipleSelect
            name="races"
            disabled={!isEdit}
            placeholder={isEdit ? 'Select race' : ''}
            codeset={CODESETS.RaceAndEthnicity}
            groupingCodes={RACES_GROUPING_CODES}
            size="3"
            exclude={[CODE_RACE]}
          />
        </FormFieldContainer>

        <FormFieldContainer>
          <FormFieldLabel>Ethnicity</FormFieldLabel>
          <CodesetFormMultipleSelect
            name="ethnicities"
            disabled={!isEdit}
            placeholder={isEdit ? 'Select ethnicity' : ''}
            codeset={CODESETS.RaceAndEthnicity}
            groupingCodes={ETHNICITIES_GROUPING_CODES}
            exclude={[CODE_ETHNICITY]}
            size="3"
          />
        </FormFieldContainer>
      </Flex>
    </ToggleableForm>
  )
}

export { DescriptiveForm }
