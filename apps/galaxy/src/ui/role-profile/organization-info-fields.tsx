'use client'

import { Grid } from '@radix-ui/themes'
import { DisplayNameField } from './display-name-field'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { TitleField } from './title-field'

const OrganizationInfoFields = () => {
  return (
    <Grid columns="4" gap="2" px="2" py="1">
      <TitleField />
      <StaffTypeSelect />
      <DisplayNameField />
      <StatusSelect />
    </Grid>
  )
}

export { OrganizationInfoFields }
