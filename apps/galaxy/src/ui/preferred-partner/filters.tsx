import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { AddressField } from './address-field'
import { BillingFrequencySelect } from './billing-frequency-select'
import { CoupleField } from './couple-field'
import { CoupleRateField } from './couple-rate-field'
import { DateFromField } from './date-from-field'
import { DateToField } from './date-to-field'
import { FamilyField } from './family-field'
import { FamilyRateField } from './family-rate-field'
import { IndividualField } from './individual-field'
import { IndividualRateField } from './individual-rate-field'
import { NextPaymentField } from './next-payment-date-field'
import { PaymentStatusSelect } from './payment-status-select'
import { PPIdField } from './pp-Id-field'
import { PPNameField } from './pp-name-field'
import { PPPayerStatusSelect } from './pp-payer-status-select'
import { PPStatusSelect } from './pp-status-select'
import { StartDateField } from './start-date-field'
import { TotalChargePlusField } from './total-charge-plus-field'
import { TotalChargeServiceField } from './total-charge-service-field'
import { TotalIdsField } from './total-ids-field'
import { TotalUserField } from './total-user-field'

const Filters = () => {
  return (
    <>
      <Grid className="col-span-full" columns="7" gap="2" align="baseline">
        <DateFromField />
        <DateToField />
        <PPIdField />
        <PPNameField />
        <TotalUserField />
        <TotalIdsField />
        <PPStatusSelect />
      </Grid>
      <Grid className="col-span-full" columns="6" gap="2" align="baseline">
        <PPPayerStatusSelect />

        <Flex gapX="2">
          <IndividualField />
          <IndividualRateField />
        </Flex>
        <Flex gapX="2">
          <CoupleField />
          <CoupleRateField />
        </Flex>
        <Flex gapX="2">
          <FamilyField />
          <FamilyRateField />
        </Flex>
        <TotalChargePlusField />
        <TotalChargeServiceField />
      </Grid>
      <Grid className="col-span-full" columns="6" gap="2" align="baseline">
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
