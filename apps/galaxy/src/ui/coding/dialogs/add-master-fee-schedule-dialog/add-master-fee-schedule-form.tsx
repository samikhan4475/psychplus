import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AgeRangeField } from './age-range-field'
import { CategorySelectField } from './category-select-field'
import { ClearButton } from './clear-button'
import { CptCodeField } from './cpt-code-field'
import { DescriptionField } from './description-field'
import { GenderSelectField } from './gender-select-field'
import { MastersField } from './masters-field'
import { MdDoField } from './md-do-field'
import { MedicareAmountField } from './medicare-amount-field'
import { NpPaField } from './np-pa-field'
import { PosSelectField } from './pos-field'
import { PsyDField } from './psyd-field'
import { RequirementField } from './requirement-field'
import { schema, SchemaType } from './schema'
import { StatusSelectField } from './status-select-field'

const AddMasterFeeScheduleForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      minimumAge: '',
      maximumAge: '',
      gender: '',
      category: '',
      effectiveFrom: '',
      effectiveTill: '',
      placeOfService: '',
      recordStatus: '',
      cptCode: '',
      description: '',
      requirement: '',
      medicareAmount: '',
      mdDoAmount: '',
      npPaAmount: '',
      paDAmount: '',
      mastersAmount: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    // todo: need to handle save action
  }

  return (
    <FormContainer className="gap-2" form={form} onSubmit={onSubmit}>
      <Grid columns="3" gapX="2">
        <CptCodeField />
        <PosSelectField />
        <MedicareAmountField />
      </Grid>
      <Grid columns="4" gapX="2">
        <MastersField />
        <MdDoField />
        <NpPaField />
        <PsyDField />
      </Grid>
      <Grid columns="2" gapX="2">
        <DescriptionField />
        <RequirementField />
      </Grid>
      <Grid columns="2" gapX="2">
        <CategorySelectField />
        <GenderSelectField />
      </Grid>
      <Grid columns="3" gapX="2">
        <AgeRangeField />
        <StatusSelectField />
        <ClearButton />
      </Grid>
      <Button highContrast size="1" className="ml-auto w-fit" type="submit">
        Add
      </Button>
    </FormContainer>
  )
}

export { AddMasterFeeScheduleForm, type SchemaType }
