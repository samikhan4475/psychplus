import { Grid } from '@radix-ui/themes'
import { Organization } from '@/types'
import { PayerAddressGroup } from './payer-address-group'
import { PrimaryAddressGroup } from './primary-address-group'

interface AddressGroupProps {
  organization?: Organization
}

const AddressGroup = ({ organization }: AddressGroupProps) => {
  return (
    <Grid columns="2" className="bg-white gap-2" px="2" py="1">
      <PrimaryAddressGroup
        organizationAddress={organization?.organizationAddress}
      />
      <PayerAddressGroup />
    </Grid>
  )
}

export { AddressGroup }
