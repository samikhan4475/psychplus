import { Grid } from '@radix-ui/themes'
import { PayerAddressGroup } from './payer-address-group'
import { PrimaryAddressGroup } from './primary-address-group'

const AddressGroup = () => {
  return (
    <Grid columns="2" className='gap-2 bg-white' px="2" py="1">
      <PrimaryAddressGroup />
      <PayerAddressGroup />
    </Grid>
  )
}

export { AddressGroup }

