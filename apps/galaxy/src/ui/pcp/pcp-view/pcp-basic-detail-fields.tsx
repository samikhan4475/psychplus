'use client'

import React from 'react'
import { Grid } from '@radix-ui/themes'
import { CredentialSelect } from './credentials-select'
import { EmailInput } from './email-input'
import { FaxInput } from './fax-input'
import { NpiInput } from './npi-input'
import { PhoneInput } from './phone-input'
import { PhysicianNameInput } from './physician-name-input'

const PcpBasicDetailFields = () => {
  return (
    <Grid className="w-full gap-4" columns="9">
      <PhysicianNameInput />
      <CredentialSelect />
      <NpiInput />
      <PhoneInput />
      <EmailInput />
      <FaxInput />
    </Grid>
  )
}

export { PcpBasicDetailFields }
