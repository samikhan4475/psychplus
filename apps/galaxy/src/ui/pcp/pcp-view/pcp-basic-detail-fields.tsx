'use client'

import React from 'react'
import { Grid } from '@radix-ui/themes'
import { CredentialSelect } from './credentials-select'
import { EmailInput } from './email-input'
import { FaxInput } from './fax-input'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { PhoneInput } from './phone-input'

const PcpBasicDetailFields = () => {
  return (
    <Grid className="w-full gap-4" columns="9">
      <FirstNameInput />
      <LastNameInput />
      <CredentialSelect />
      <PhoneInput />
      <EmailInput />
      <FaxInput />
    </Grid>
  )
}

export { PcpBasicDetailFields }
