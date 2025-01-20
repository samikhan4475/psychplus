'use client'

import { useEffect, useState } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { getBillingLocations } from '../actions/get-billing-locations'
import { ClaimUpdateSchemaType } from '../schema'

const BillingLocationAddress = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const locationId = form.getValues('locationId')
  
  const [businessAddress, setBusinessAddress] = useState<string | undefined>(
    undefined,
  )

  const getBusinessAddress = async (): Promise<string | undefined> => {
    if (!locationId) {
      return
    }
    const data = await getBillingLocations()
    if (data.state === 'success') {
      const location = data.data.find((item) => item.id === locationId)
      if (location?.contact?.addresses) {
        const businessAddresses = location.contact.addresses.filter(
          (address) => address.type === 'Business',
        )
        if (businessAddresses.length > 0) {
          return businessAddresses[0].street1
        }
      }
    }
  }
  useEffect(() => {
    const fetchBusinessAddress = async () => {
      const address = await getBusinessAddress()
      setBusinessAddress(address)
    }

    fetchBusinessAddress()
  }, [locationId])

  return (
    <FormFieldContainer>
      <FormFieldLabel>Billing Location Address</FormFieldLabel>
      <TextField.Root
        disabled={true}
        value={businessAddress ?? undefined}
        size="1"
        placeholder="123455"
      />
    </FormFieldContainer>
  )
}

export { BillingLocationAddress }
