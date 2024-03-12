import { useEffect, useState } from 'react'
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { type SubmitHandler } from 'react-hook-form'
import { AuthorityCode, AuthorityCodeSet, Code } from '@psychplus/codeset'
import { getUsStates } from '@psychplus/codeset/api.client'
import {
  Form,
  FormPhoneNumberInput,
  FormSsnInput,
  FormSubmitButton,
  FormTextInput,
  useForm,
} from '@psychplus/form'
import { useStore } from '@/app/(auth)/store'
import { DropDownOptions } from './edit-patient-profile'
import { schema, type SchemaType } from './schema'

const EditPatientProfileForm = () => {
  const { codeSetIndex } = useStore()
  const [usStates, setUsStates] = useState<AuthorityCodeSet>()

  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  useEffect(() => {
    getUsStates().then(setUsStates)
  }, [])

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    console.log('=-=-=-=-=-=', form.getValues())
  }

  const renderTextInput = ({ name, label, placeholder }: TextInputProps) => (
    <FormTextInput
      type="text"
      label={label ?? spacedUppercase(name)}
      placeholder={placeholder ?? spacedUppercase(name)}
      data-testid={`edit-patient-${name}-input`}
      {...form.register(name)}
      maxLength={35}
    />
  )

  const renderDropDownOptions = ({ name, options, label }: DropDownProps) => (
    <>
      <Text className="font-bold" size="2">
        {label ?? spacedUppercase(name)}
      </Text>
      <DropDownOptions
        options={options?.map((item: AuthorityCode | Code) =>
          isAuthorityCode(item)
            ? item.displayName ?? item.displayName
            : item.display,
        )}
        type={name}
        form={form}
      />
    </>
  )

  const radioButton = ({ name, value, label }: RadioButtonProps) => (
    <Flex gap="2" align="center" justify="between">
      <Text as="div" size="4" mb="1">
        {label}
      </Text>

      <RadioGroup.Root
        value={value}
        data-testid={`edit-patient-${name}-input`}
        onValueChange={(value) => {
          const newValue =
            name === 'isEmergencyContactSameAsParentOrGuardian'
              ? value === 'Yes' && form.watch('isParentOrGuardian')
              : value === 'Yes'

          form.setValue(name, newValue)

          if (form.formState.isSubmitted) form.trigger()
        }}
      >
        <Flex gap="4">
          {['Yes', 'No'].map((option) => (
            <Text as="label" key={option} size="2">
              <Flex gap="1">
                <RadioGroup.Item value={option} />
                {option}
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  )

  return (
    <Form form={form} onSubmit={onSubmit} className="w-full">
      <Flex gap="5" direction="column">
        <Flex gap="4" className="w-full">
          {(['firstName', 'middleName', 'lastName'] as const).map((name) => (
            <Box className="w-1/3" key={name}>
              {renderTextInput({ name })}
            </Box>
          ))}
        </Flex>

        <Flex gap="4" className="w-full">
          <Box className="w-1/3">
            {renderTextInput({ name: 'preferredName' })}
          </Box>

          <Box className="w-1/3">
            {renderTextInput({
              name: 'drivingLicenseNo',
              label: 'Driving License#',
              placeholder: 'Driving License',
            })}
          </Box>

          <Box className="w-1/3">
            {renderDropDownOptions({
              name: 'drivingLicenseState',
              options: usStates?.codes,
            })}
          </Box>
        </Flex>

        <Flex gap="4" className="w-full">
          <Box className="w-1/3">
            <FormTextInput
              type="date"
              max={format(new Date(), 'yyyy-MM-dd')}
              label="Date of Birth"
              data-testid="edit-patient-date-of-birth-input"
              {...form.register('dateOfBirth')}
              style={{ marginLeft: -12 }}
              onChange={(e) => {
                form.setValue('dateOfBirth', e.target.value)

                if (form.formState.isSubmitted) form.trigger('dateOfBirth')
              }}
            />
          </Box>

          <Box className="w-1/3">
            {renderDropDownOptions({
              name: 'language',
              options: codeSetIndex.Language,
            })}
          </Box>

          <Box className="w-1/3">{renderTextInput({ name: 'email' })}</Box>
        </Flex>

        <Flex gap="4" className="w-full">
          <Box className="w-1/3">
            <FormPhoneNumberInput
              label="Cell"
              data-testid="edit-patient-phone-number-input"
              {...form.register('phoneNumber')}
            />
          </Box>

          <Box className="w-1/3">
            <FormSsnInput
              label="SSN"
              data-testid="patient-lookup-input-ssn"
              {...form.register('ssn')}
            />
          </Box>

          <Box className="w-1/3">
            {renderDropDownOptions({
              name: 'stateOfResidence',
              options: usStates?.codes,
            })}
          </Box>
        </Flex>

        <Text size="7" className="font-bold" align="center">
          Gender
        </Text>

        <Flex gap="4" className="w-full">
          <Box className="w-1/4">
            {renderDropDownOptions({
              name: 'gender',
              options: codeSetIndex.Gender,
            })}
          </Box>

          <Box className="w-1/4">
            {renderDropDownOptions({
              name: 'genderOrientation',
              options: codeSetIndex.GenderOrientation,
            })}
          </Box>

          <Box className="w-1/4">
            {renderDropDownOptions({
              name: 'genderExpression',
              options: codeSetIndex.GenderExpression,
            })}
          </Box>

          <Box className="w-1/4">
            {renderDropDownOptions({
              name: 'pronoun',
              options: codeSetIndex.GenderPronoun,
            })}
          </Box>
        </Flex>

        <Text size="7" className="font-bold" align="center">
          Home/Mailing Address
        </Text>

        <Flex gap="4" className="w-full">
          <Box className="flex-1">
            {renderTextInput({
              name: 'address1',
              label: 'Address line 1',
              placeholder: 'Enter Address',
            })}
          </Box>

          <Box className="w-1/3">
            {renderTextInput({
              name: 'address2',
              label: 'Address line 2',
              placeholder: 'Enter Address',
            })}
          </Box>
        </Flex>

        <Flex gap="4" className="w-full">
          {(['state', 'city', 'zipCode'] as FormField[]).map((name) => (
            <Box key={name} className="w-1/3">
              {renderTextInput({ name })}
            </Box>
          ))}
        </Flex>

        {radioButton({
          name: 'isMailingAddressSameAsHome',
          value: form.watch('isMailingAddressSameAsHome') ? 'Yes' : 'No',
          label: 'Is your mailing address same as above?',
        })}

        {!form.watch('isMailingAddressSameAsHome') && (
          <>
            <Flex gap="4" className="w-full">
              <Box className="flex-1">
                {renderTextInput({
                  name: 'mailingAddress1',
                  label: 'Address line 1',
                  placeholder: 'Enter Address',
                })}
              </Box>

              <Box className="w-1/3">
                {renderTextInput({
                  name: 'mailingAddress2',
                  label: 'Address line 2',
                  placeholder: 'Enter Address',
                })}
              </Box>
            </Flex>

            <Flex gap="4" className="w-full">
              {(
                ['mailingState', 'mailingCity', 'mailingZipCode'] as FormField[]
              ).map((name) => (
                <Box key={name} className="w-1/3">
                  {renderTextInput({
                    name,
                    label: name.replace('mailing', ''),
                    placeholder: name.replace('mailing', ''),
                  })}
                </Box>
              ))}
            </Flex>
          </>
        )}

        <Text size="7" className="font-bold" align="center">
          Guardian/Emergency Contact
        </Text>

        {radioButton({
          name: 'isParentOrGuardian',
          value: form.watch('isParentOrGuardian') ? 'Yes' : 'No',
          label:
            'Does the patient have a parent, guardian, or legal representative?',
        })}

        {form.watch('isParentOrGuardian') && (
          <>
            <Flex gap="4" className="w-full">
              {(
                [
                  'guardianFirstName',
                  'guardianMiddleName',
                  'guardianLastName',
                ] as const
              ).map((name) => (
                <Box className="w-1/3" key={name}>
                  {renderTextInput({
                    name,
                    label: spacedUppercase(name.replace('guardian', '')),
                    placeholder: spacedUppercase(name.replace('guardian', '')),
                  })}
                </Box>
              ))}
            </Flex>

            <Flex gap="4" className="w-full">
              <Box className="w-1/3">
                {renderDropDownOptions({
                  name: 'guardianRelationship',
                  options: codeSetIndex.GuardianRelationship,
                  label: 'Relationship to the Contact',
                })}
              </Box>

              <Box className="w-1/3">
                <FormPhoneNumberInput
                  label="Phone"
                  data-testid="edit-patient-guardian-phone-number-input"
                  {...form.register('guardianPhoneNumber')}
                />
              </Box>

              <Box className="w-1/3">
                {renderTextInput({
                  name: 'guardianEmail',
                  label: 'guardianEmail'.replace('guardian', ''),
                  placeholder: 'guardianEmail'.replace('guardian', ''),
                })}
              </Box>
            </Flex>
          </>
        )}

        {radioButton({
          name: 'isEmergencyContactSameAsParentOrGuardian',
          value: form.watch('isEmergencyContactSameAsParentOrGuardian')
            ? 'Yes'
            : 'No',
          label:
            'Is the parent, guardian, or legal representative the same as Emergency Contact?',
        })}

        <Flex gap="4" className="w-full">
          {(
            [
              'emergencyContactFirstName',
              'emergencyContactMiddleName',
              'emergencyContactLastName',
            ] as const
          ).map((name) => (
            <Box className="w-1/3" key={name}>
              {renderTextInput({
                name,
                label: spacedUppercase(name.replace('emergencyContact', '')),
                placeholder: spacedUppercase(
                  name.replace('emergencyContact', ''),
                ),
              })}
            </Box>
          ))}
        </Flex>

        <Flex gap="4" className="w-full">
          <Box className="w-1/3">
            {renderDropDownOptions({
              name: 'emergencyContactRelationship',
              options: codeSetIndex.GuardianRelationship,
              label: 'Relationship',
            })}
          </Box>

          <Box className="w-1/3">
            <FormPhoneNumberInput
              label="Phone"
              data-testid="edit-patient-emergency-contact-phone-number-input"
              {...form.register('emergencyContactPhoneNumber')}
            />
          </Box>

          <Box className="w-1/3">
            {renderTextInput({
              name: 'emergencyContactEmail',
              label: 'emergencyContactEmail'.replace('emergencyContact', ''),
              placeholder: 'emergencyContactEmail'.replace(
                'emergencyContact',
                '',
              ),
            })}
          </Box>
        </Flex>

        <FormSubmitButton data-testid="edit-patient-submit-button">
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

type FormField = keyof SchemaType

type RadioButtonProps = {
  name: FormField
  value: string
  label: string
}

type DropDownProps = {
  name: FormField
  options?: (AuthorityCode | Code)[]
  label?: string
}

type TextInputProps = {
  name: FormField
  label?: string
  placeholder?: string
}

const spacedUppercase = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (str) => str.toUpperCase())

const isAuthorityCode = (item: AuthorityCode | Code): item is AuthorityCode => {
  return (item as AuthorityCode).displayName !== undefined
}

export { EditPatientProfileForm }
