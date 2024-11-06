'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid, Separator } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { addNoEmailPatienAction } from '../actions'
import { AddressDetails } from './address-details'
import { CancelButton } from './cancel-button'
import { DOBDatePicker } from './dob-date-picker'
import { FirstNameInput } from './first-name-input'
import { GenderSelect } from './gender-select'
import { GuardianFirstNameInput } from './guardian-first-name-input'
import { GuardianLastNameInput } from './guardian-last-name-input'
import { LastNameInput } from './last-name-input'
import { MiddleNameInput } from './middle-name-input'
import { PhoneNumberInput } from './phone-number-input'
import { ReferralNameInput } from './referral-name-input'
import { ReferralSource } from './referral-source'
import { SaveButton } from './save-button'
import { addPatientSchema, AddPatientSchemaType } from './schema'
import { transformOut } from './transform'

interface AddPatientFormProps {
  closeDialog: () => void
}

const AddPatientForm = ({ closeDialog }: AddPatientFormProps) => {
  const form = useForm<AddPatientSchemaType>({
    resolver: zodResolver(addPatientSchema),
    defaultValues: {
      legalName: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
      dateOfBirth: undefined,
      gender: '',
      referralSource: '',
      referralName: '',
      password: '',
      contactInfo: {
        phoneNumbers: [
          {
            number: '',
          },
        ],
        addresses: [
          {
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
          },
        ],
        isMailingAddressSameAsPrimary: true,
      },
    },
  })

  const onSubmit: SubmitHandler<AddPatientSchemaType> = async (data) => {
    const sanitizedFormData = sanitizeFormData(data)
    const result = await addNoEmailPatienAction(transformOut(sanitizedFormData))

    if (result.state === 'error') {
      toast.error(result.error)
    } else if (result.state === 'success') {
      toast.success('Patient added successfully')
      closeDialog()
    }
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="2" gap="2" py="4" className="px-[20px]">
        <FirstNameInput />
        <MiddleNameInput />
        <LastNameInput />
        <DOBDatePicker />
        <GenderSelect />
        <PhoneNumberInput />
        <ReferralSource />
        <ReferralNameInput />
        <AddressDetails />
        <GuardianFirstNameInput />
        <GuardianLastNameInput />
      </Grid>
      <Separator orientation="horizontal" className="border-pp-grey w-full" />
      <Flex justify="end" gap="2" py="4" className="px-[20px]">
        <CancelButton />
        <SaveButton />
      </Flex>
    </FormContainer>
  )
}

export { AddPatientForm }
