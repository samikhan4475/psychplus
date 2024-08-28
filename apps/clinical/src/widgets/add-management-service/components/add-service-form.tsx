'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid, Separator } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { AddressComponent } from '@/components/address-fields'
import { useUsStatesOptions } from '../hooks'
import { QuestionFields } from './question-fields'
import { VisitTypeDiagnosisTable } from './visit-type-diagnosis-table'

const schema = z.object({
  locationID: validate.requiredString,
  locationType: validate.requiredString,
  state1: validate.requiredString,
  service: validate.requiredString,
  pos: validate.optionalString,
  providerType: validate.optionalString,
  psychPlusPolicyRequired: validate.requiredString,
  ehrUsePreferences: validate.requiredString,
  sendProviderReminderForNotes: validate.requiredString,
  sendProviderReminderForVisits: validate.requiredString,
  arePatientPotentiallySeenEveryDayOnThisService: validate.requiredString,
  automaticallyBillForThisService: validate.requiredString,
  createSimilarVisitForMedicalProvider: validate.nullOrBoolean,
  maxBookingFee: validate.requiredString,
  cosignerType: validate.requiredString,
  cosigner: validate.requiredString,
  claimAddressSameAsPrimary: validate.requiredString,
  address1: validate.requiredString,
  address2: validate.requiredString,
  state: validate.requiredString,
  city: validate.requiredString,
  zip: validate.requiredString,
})

export type SchemaType = z.infer<typeof schema>

const AddServiceForm = () => {
  const usStates = useUsStatesOptions()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      locationID: '125637MNV',
      locationType: 'Facility',
      state1: 'Taxes',
      service: 'Outpatient psychiatry service',
      pos: '',
      providerType: '',
      arePatientPotentiallySeenEveryDayOnThisService: 'Yes',
      automaticallyBillForThisService: 'Yes',
      createSimilarVisitForMedicalProvider: false,
      ehrUsePreferences: 'EHR + Coding',
      psychPlusPolicyRequired: 'Yes',
      sendProviderReminderForNotes: 'Yes',
      sendProviderReminderForVisits: 'Yes',
      maxBookingFee: '3',
      cosignerType: 'location',
      cosigner: '',
      claimAddressSameAsPrimary: 'No',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    },
  })
  const { register } = form

  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    console.log(formData)
  }

  return (
    <FormContainer onSubmit={onSubmit} form={form}>
      <Grid columns={'3'} className="gap-x-3 gap-y-[10px]">
        <FormSelect
          label="Location ID"
          size={'2'}
          options={dummyOptions}
          placeholder="Select"
          required
          {...register('locationID')}
        />
        <FormTextInput
          label="Location Type"
          size={'2'}
          disabled
          {...register('locationType')}
        />
        <FormTextInput
          label="State"
          size={'2'}
          disabled
          {...register('state1')}
        />
        <FormTextInput
          label="Service"
          size={'2'}
          disabled
          {...register('service')}
        />
        <FormSelect
          label="Place of Service (POS)"
          size={'2'}
          placeholder="Select"
          options={dummyOptions}
          {...register('pos')}
        />
        <FormSelect
          label="Provider Type"
          size={'2'}
          placeholder="Select"
          options={dummyOptions}
          {...register('pos')}
        />
        <Separator className="col-span-3 w-full bg-[#EBEBEF]" />
        <QuestionFields />
        <Separator className="col-span-3 w-full bg-[#EBEBEF]" />
        <FormSelect
          label="Max Booking Frequency"
          options={dummyOptions}
          placeholder="Select"
          required
          size={'2'}
          {...register('maxBookingFee')}
        />
        <FormSelect
          label="Cosigner Type"
          options={dummyOptions}
          placeholder="Select"
          required
          size={'2'}
          {...register('cosignerType')}
        />
        <FormSelect
          label="Cosigner"
          options={dummyOptions}
          placeholder="Select"
          required
          size={'2'}
          {...register('cosigner')}
        />
        <Box className="col-span-3">
          <AddressComponent usStates={usStates} />
        </Box>
        <VisitTypeDiagnosisTable />
      </Grid>
      <Box className="mt-6 flex justify-end">
        <FormSubmitButton
          size={'3'}
          className="rounded-3 bg-[#151B4A] px-3 py-2 text-[white]"
        >
          Save
        </FormSubmitButton>
      </Box>
    </FormContainer>
  )
}
const dummyOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: 'location', label: 'Location' },
  {
    value: '125637MNV',
    label: '125637MNV',
  },
]
export { AddServiceForm }
