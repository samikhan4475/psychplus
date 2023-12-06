'use client'

import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormPhoneNumberInput,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { getPatients } from '../api'
import { useStore } from '../store'

const schema = z.object({
  name: validate.nullOrChar,
  gender: validate.nullOrString,
  dateOfBirth: validate.nullOrString,
  age: validate.nullOrNumber,
  email: validate.nullOrString,
  telephone: validate.nullOrString,
  ssn: validate.nullOrString,
  city: validate.nullOrString,
  postalCode: validate.nullOrString,
  mrn: validate.nullOrString,
  patientCreatedFrom: validate.nullOrString,
  patientCreatedTo: validate.nullOrString,

  patientStatuses: validate.emptyOrStringArray,
  contactMadeStatuses: validate.emptyOrStringArray,

  hasNextAppointment: validate.nullOrBoolean,
  hasGuardian: validate.nullOrBoolean,
})

type SchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const { setPatients, getDropdowns } = useStore()

  const GENDERS = getDropdowns('Gender')
  const GuardianRelationship = getDropdowns('GuardianRelationship')
  const VerificationStatus = getDropdowns('VerificationStatus')
  const CustomerStatus = getDropdowns('CustomerStatus')

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      age: null,
      city: null,
      contactMadeStatuses: [],
      dateOfBirth: null,
      email: null,
      gender: null,
      hasGuardian: null,
      hasNextAppointment: null,
      mrn: null,
      name: null,
      patientCreatedFrom: null,
      patientCreatedTo: null,
      patientStatuses: [],
      postalCode: null,
      ssn: null,
      telephone: null,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    const payload = form.getValues()
    getPatients(payload)
      .then((res) => {
        setPatients(res)
      })
      .catch((error) => alert(error.message))
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" mb="4">
        <FormSubmitButton data-testid="patient-lookup-submit-button">
          Search
        </FormSubmitButton>
        <FormTextInput
          label="Name"
          placeholder="Enter Name..."
          data-testid="patient-lookup-input-name"
          autoFocus
          {...form.register('name')}
        />

        <FormTextInput
          type="number"
          label="Age"
          maxLength={2}
          placeholder="Enter age"
          data-testid="patient-lookup-input-age"
          {...form.register('age')}
        />
        <FormSelect
          label="Gender"
          data-testid="patient-lookup-input-gender"
          {...form.register('gender')}
          options={GENDERS}
        />
        <FormTextInput
          type="number"
          label="MRN"
          data-testid="patient-lookup-input-mrn"
          {...form.register('mrn')}
        />
        <FormTextInput
          type="date"
          label="DOB"
          data-testid="patient-lookup-input-dateOfBirth"
          {...form.register('dateOfBirth')}
        />
        <FormTextInput
          label="City"
          data-testid="patient-lookup-input-city"
          {...form.register('city')}
        />
        <FormTextInput
          type="number"
          label="Zip"
          data-testid="patient-lookup-input-postalCode"
          {...form.register('postalCode')}
        />
        <FormSelect
          label="Guardian"
          data-testid="patient-lookup-input-hasGuardian"
          {...form.register('hasGuardian')}
          options={GuardianRelationship}
        />
        <FormPhoneNumberInput
          label="phone"
          data-testid="patient-lookup-input-telephone"
          {...form.register('telephone')}
        />
        <FormTextInput
          type="email"
          label="email"
          data-testid="patient-lookup-input-email"
          {...form.register('email')}
        />
        <FormTextInput
          label="SSN"
          data-testid="patient-lookup-input-ssn"
          {...form.register('ssn')}
        />
        <FormSelect
          label="status"
          data-testid="patient-lookup-input-contactMadeStatuses"
          {...form.register('contactMadeStatuses')}
          options={CustomerStatus}
        />
        <FormSelect
          label="Patient Status"
          data-testid="patient-lookup-input-patientStatuses"
          {...form.register('patientStatuses')}
          options={VerificationStatus}
        />

        <FormTextInput
          type="date"
          label="patientCreatedFrom"
          data-testid="patient-lookup-input-patientCreatedFrom"
          {...form.register('patientCreatedFrom')}
        />
        <FormTextInput
          type="date"
          label="patientCreatedTo"
          data-testid="patient-lookup-input-patientCreatedTo"
          {...form.register('patientCreatedTo')}
        />

        <FormSelect
          label="Next Appointment"
          data-testid="patient-lookup-input-hasNextAppointment"
          {...form.register('hasNextAppointment')}
          options={VerificationStatus}
        />
      </Flex>
    </Form>
  )
}

export { FilterForm }
