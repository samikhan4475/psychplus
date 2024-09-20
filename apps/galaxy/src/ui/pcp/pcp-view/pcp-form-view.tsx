'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import type { PcpViewProps } from '../types'
import { AddressSchemaType } from './address-schema'
import { MailAddressGroup } from './mail-address-group'
import { MailAddressRadio } from './mail-address-radio'
import { OfficeAddressGroup } from './office-address-group'
import { PcpBasicDetailFields } from './pcp-basic-detail-fields'

const PcpFormView = ({ patientId, googleApiKey }: PcpViewProps) => {
  const form = useFormContext<AddressSchemaType>()

  const mailingSameAsPrimary = form.watch('isMailingAddressSameAsHome')

  return (
    <Flex
      direction="column"
      className="bg-white rounded-b-[4px] rounded-t-[4px] px-2 py-1 shadow-2"
    >
      <Flex width="100%" gap="3" className="mb-2">
        <PcpBasicDetailFields />
      </Flex>
      <GooglePlacesContextProvider apiKey={googleApiKey}>
        <OfficeAddressGroup />
        <MailAddressRadio />
        {mailingSameAsPrimary === 'no' ? <MailAddressGroup /> : null}
      </GooglePlacesContextProvider>
    </Flex>
  )
}

export { PcpFormView }
