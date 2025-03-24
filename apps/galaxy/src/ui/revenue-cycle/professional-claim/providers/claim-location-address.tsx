'use client'

import { useEffect, useState } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { getBillingLocations } from '../../claim-detail-tab/actions/get-billing-locations'
import { ClaimAddSchemaType } from '../schema'

const ClaimLocationAddress = () => {
  const form = useFormContext<ClaimAddSchemaType>()
  const billingLocationId = useWatch({
    name: 'billingLocationId',
    control: form.control,
  })
  const [address, setAddress] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchBusinessAddress = async () => {
      if (!billingLocationId) return

      const data = await getBillingLocations()
      if (data.state === 'success') {
        const location = data.data.find((item) => item.id === billingLocationId)
        if (location?.contact?.addresses) {
          const businessAddresses = location.contact.addresses.filter(
            (addr) => addr.type === 'Business',
          )
          if (businessAddresses.length > 0) {
            setAddress(businessAddresses[0].street1)
            return
          }
        }
      }
      setAddress(undefined)
    }

    fetchBusinessAddress()
  }, [billingLocationId])
  return (
    <FormFieldContainer>
      <FormFieldLabel>Billing Location Address</FormFieldLabel>
      <TextField.Root
        value={address ?? undefined}
        size="1"
        placeholder=""
        disabled={true}
      />
    </FormFieldContainer>
  )
}

export { ClaimLocationAddress }
