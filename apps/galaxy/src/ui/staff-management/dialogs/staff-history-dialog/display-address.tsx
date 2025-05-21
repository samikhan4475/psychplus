import { Box, Grid } from '@radix-ui/themes'
import { Address } from '../../types'
import { InfoField } from './info-field'

interface DisplayAddressProps {
  address: Address | undefined
}

const DisplayAddress = ({ address }: DisplayAddressProps) => {
  return (
    <>
      <InfoField label="Address 1" value={address?.street1} required />

      <InfoField label="Address 2" value={address?.street2} />

      <Grid columns="3" gap="3">
        <Box>
          <InfoField label="City" value={address?.city} required />
        </Box>

        <Box>
          <InfoField label="State" value={address?.state} required />
        </Box>
        <Box>
          <InfoField label="Zipcode" value={address?.postalCode} required />
        </Box>
      </Grid>
    </>
  )
}

export { DisplayAddress }
