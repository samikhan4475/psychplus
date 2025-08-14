'use client'

import * as React from 'react'
import { useStore } from '../../store/store'
import { ImmunizationTypeEnum } from '../../types'
import { ImmunizationFormProps } from '../types'
import { getHistoricalInitialValues } from '../utils'
import { GenericImmunizationForm } from './generic-immunization-form'

const HistoricalForm = ({ data, closeDialog }: ImmunizationFormProps) => {
  const { appointmentId, fetchImmunizations } = useStore()
  const handleSuccess = () => {
    closeDialog()
    if (appointmentId) fetchImmunizations(appointmentId)
  }

  return (
    <GenericImmunizationForm
      initialValues={getHistoricalInitialValues(data)}
      data={data}
      closeDialog={handleSuccess}
      appointmentId={appointmentId!}
      entryType={ImmunizationTypeEnum.Historical}
    />
  )
}

export { HistoricalForm }
