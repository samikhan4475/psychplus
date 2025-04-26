'use client'

import { Grid } from '@radix-ui/themes'
import { ContactNameField } from './contact-name-field'
import { EmailField } from './email-field'
import { OrganizationNameField } from './organization-name-field'
import { PhoneField } from './phone-field'
import { StatusSelect } from './status-select'

const OrganizationInfoFields = () => {
  return (
    <Grid columns="5" gap="2" px="2" py="1">
      <OrganizationNameField />
      <ContactNameField />
      <PhoneField />
      <EmailField />
      <StatusSelect />
    </Grid>
  )
}

export { OrganizationInfoFields }
