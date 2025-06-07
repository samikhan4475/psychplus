'use client'

import { Grid } from '@radix-ui/themes'
import { AccidentDate } from './accident-date'
import { AccidentState } from './accident-state'
import { AccidentType } from './accident-type'
import { LabCharges } from './lab-charges'
import { FormCheckbox } from '@/components/form-checkbox'

const AccidentAndLabView = () => {
  return (
    <Grid columns="5" gap="1" rows="repeat(2)" width="auto">
      <AccidentDate />
      <AccidentState />
      <AccidentType />
      <LabCharges />
      <FormCheckbox label="New Employment" fieldName="isEmployment" />
      <FormCheckbox label="Auto Accident" fieldName="isAutoAccident" />
      <FormCheckbox label="Other Accident" fieldName="isOtherAccident" />
      <FormCheckbox label="Outside Lab" fieldName="isOutsideLab" />
    </Grid>
  )
}

export { AccidentAndLabView }
