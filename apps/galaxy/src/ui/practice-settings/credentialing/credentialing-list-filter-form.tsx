'use client'

import { Grid, Text } from '@radix-ui/themes'
import { LicenseManagerSelect } from './license-manager-select'

const CredentialingListFilterForm = () => {
  return (
    <Grid columns="12" gap="5" className="flex items-center z-10">
      <Text weight="bold" size="2">
        License Manager
      </Text>
      <LicenseManagerSelect />
    </Grid>
  )
}

export { CredentialingListFilterForm }
