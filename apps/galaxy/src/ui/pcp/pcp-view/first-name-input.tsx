'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import z from 'zod'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { ExternalProvider } from '../types'
import { fetchExternalProvidersAction } from './actions/fetch-external-providers'
import { pcpAddressTypeEnum, PcpSchemaType } from './pcp-schema'
import { ServerSearchSelect } from './server-search-select'
import { transformData } from './utils'

const FirstNameInput = () => {
  const form = useFormContext<PcpSchemaType>()

  return (
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>First Name</FormFieldLabel>
        <ServerSearchSelect
          fieldName="firstName"
          placeholder=""
          initialValue={transformData(form.getValues())}
          fetchResults={fetchExternalProvidersAction}
          formatText={(value: ExternalProvider) => {
            if (typeof value === 'object' && value?.legalName?.firstName) {
              return `${value.legalName.firstName}`
            }
            return `${value || ''}`
          }}
          required
          onNoResult={(firstName: string) => {
            form.setValue('firstName', firstName)
            form.setValue('lastName', '')
            form.setValue('credentials', '')
            form.setValue('phone', '')
            form.setValue('fax', '')
            form.setValue('email', '')
            form.setValue('isMailingAddressSameAsHome', 'yes')
            form.setValue('officeAddress', {
              type: 'Home' as z.infer<typeof pcpAddressTypeEnum>,
              street1: '',
              street2: '',
              city: '',
              state: '',
              postalCode: '',
              country: 'US',
            })
            form.setValue('mailingAddress', {
              type: 'Mailing' as z.infer<typeof pcpAddressTypeEnum>,
              street1: '',
              street2: '',
              city: '',
              state: '',
              postalCode: '',
              country: 'US',
            })
          }}
          onChange={(value: ExternalProvider) => {
            form.setValue('firstName', value.legalName.firstName)
            form.setValue('lastName', value.legalName.lastName)
            form.setValue('credentials', value.legalName.title || '')
            form.setValue(
              'phone',
              value.contactDetails.phoneNumbers[0]?.number || '',
            )
            form.setValue(
              'fax',
              value.contactDetails.phoneNumbers[1]?.number || '',
            )
            form.setValue('email', value.contactDetails.email)
            form.setValue(
              'isMailingAddressSameAsHome',
              value.isMailingAddressSameAsHome ? 'yes' : 'no',
            )
            form.setValue('officeAddress', {
              type: value?.contactDetails.addresses[0]?.type as z.infer<
                typeof pcpAddressTypeEnum
              >,
              street1: value.contactDetails.addresses[0]?.street1 || '',
              street2: value.contactDetails.addresses[0]?.street2 || '',
              city: value.contactDetails.addresses[0]?.city || '',
              state: value.contactDetails.addresses[0]?.state || '',
              postalCode: value.contactDetails.addresses[0]?.postalCode || '',
              country: 'US',
            })
            form.setValue('mailingAddress', {
              type: value?.contactDetails.addresses[0]?.type as z.infer<
                typeof pcpAddressTypeEnum
              >,
              street1: value.contactDetails.addresses[1]?.street1 || '',
              street2: value.contactDetails.addresses[1]?.street2 || '',
              city: value.contactDetails.addresses[1]?.city || '',
              state: value.contactDetails.addresses[1]?.state || '',
              postalCode: value.contactDetails.addresses[1]?.postalCode || '',
              country: 'US',
            })
          }}
        />
        <FormFieldError name="physicianName" />
      </FormFieldContainer>
    </Flex>
  )
}

export { FirstNameInput }
