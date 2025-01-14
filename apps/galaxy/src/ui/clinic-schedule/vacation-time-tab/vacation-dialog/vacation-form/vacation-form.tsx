'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { ActiveVisitDialog } from '../../active-visit-dialog'
import { DurationSelect } from './duration-select'
import { FromDatePicker } from './from-date-picker'
import { SaveButton } from './save-button'
import { AddVacationSchemaType, schema } from './schema'
import { StatusSelect } from './status-select'
import { ToDatePicker } from './to-date-picker'

const VacationForm = () => {
  const form = useForm<AddVacationSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
      toTime: '',
      fromTime: '',
      duration: '20',
      vacationStatus: '',
    },
  })

  const onSubmit: SubmitHandler<AddVacationSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="bg-white gap-5">
      <Grid columns="4" gap="2" align="start">
        <FromDatePicker />
        <ToDatePicker />
        <DurationSelect />
        <StatusSelect />
      </Grid>
      <Flex justify="between">
        <ActiveVisitDialog />
        <SaveButton />
      </Flex>
    </FormContainer>
  )
}

export { VacationForm }
