import React from 'react'
import { Grid } from '@radix-ui/themes'
import { AddressField } from './address-field'
import { BillingFrequencySelect } from './billing-frequency-select'
import { CoupleField } from './couple-field'
import { DateFromField } from './date-from-field'
import { DateToField } from './date-to-field'
import { FamilyField } from './family-field'
import { IndividualField } from './individual-field'
import { NextPaymentField } from './next-payment-date-field'
import { PaymentStatusSelect } from './payment-status-select'
import { PPNameField } from './pp-name-field'
import { PPPayerStatusSelect } from './pp-payer-status-select'
import { PPStatusSelect } from './pp-status-select'
import { StartDateField } from './start-date-field'
import { TotalChargePlusField } from './total-charge-plus-field'
import { TotalChargeServiceField } from './total-charge-service-field'

const Filters = () => {
  return (
    <>
      <Grid className="col-span-full" columns="4" gap="2" align="baseline">
        <DateFromField />
        <DateToField />
        <PPNameField />
        <PPStatusSelect />
      </Grid>
      <Grid className="col-span-full" columns="4" gap="2" align="baseline">
        <PPPayerStatusSelect />
        <IndividualField />
        <CoupleField />
        <FamilyField />
      </Grid>
      <Grid className="col-span-full" columns="5" gap="2" align="baseline">
        <TotalChargePlusField />
        <TotalChargeServiceField />
        <BillingFrequencySelect />
        <StartDateField />
        <NextPaymentField />
        <PaymentStatusSelect />
        <AddressField />
      </Grid>
    </>
  )
}

export { Filters }
