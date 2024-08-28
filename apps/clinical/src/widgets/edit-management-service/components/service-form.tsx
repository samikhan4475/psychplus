'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { Save } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormSubmitButton, validate } from '@psychplus/form'
import { FormContainer } from '@psychplus/ui/form/form-container'
import { GooglePlacesContextProvider } from '@/providers'
import { ServiceFormProps } from '../types'
import { ClaimAddress } from './claim-address'
import { OtherInfo } from './other-info'
import { QuestionFields } from './question'
import { ServiceInfo } from './service-info'

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

type SchemaType = z.infer<typeof schema>

const ServiceForm = ({ googleApiKey }: ServiceFormProps) => {
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
  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data)
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit} className="gap-0">
      <Flex
        align={'center'}
        justify={'between'}
        className="bg-white mb-[1px] rounded-br-1  rounded-tr-1 bg-[#fff] px-2 py-1"
      >
        <Heading weight={'bold'} size={'4'}>
          Profile
        </Heading>
        <Flex align={'center'} className="gap-[9px]">
          <Button
            size={'2'}
            className="h-6 border border-solid border-[#9E9898] bg-transparent text-[12px] font-medium text-[#1C2024]"
          >
            Hx
          </Button>
          <FormSubmitButton
            size={'2'}
            className="h-6 bg-[#151B4A] text-[12px] font-regular"
          >
            <Save width={'12px'} height={'12px'} /> Save
          </FormSubmitButton>
        </Flex>
      </Flex>
      <GooglePlacesContextProvider apiKey={googleApiKey}>
        <ServiceInfo />
        <QuestionFields />
        <OtherInfo />
        <ClaimAddress />
      </GooglePlacesContextProvider>
    </FormContainer>
  )
}

export { ServiceForm }
