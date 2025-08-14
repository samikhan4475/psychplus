'use client'

import * as React from 'react'
import { useStore } from '../../store/store'
import { ImmunizationTypeEnum } from '../../types'
import { ImmunizationFormProps } from '../types'
import { getRefusalInitialValues } from '../utils'
import { GenericImmunizationForm } from './generic-immunization-form'

const RefusalForm = ({ data, closeDialog }: ImmunizationFormProps) => {
  const { appointmentId, fetchImmunizations } = useStore(
    ({ appointmentId, fetchImmunizations }) => ({
      appointmentId,
      fetchImmunizations,
    }),
  )

  const handleSuccess = () => {
    closeDialog()
    if (appointmentId) {
      fetchImmunizations(appointmentId)
    }
  }

  return (
    <GenericImmunizationForm
      initialValues={getRefusalInitialValues(data)}
      data={data}
      closeDialog={handleSuccess}
      appointmentId={appointmentId!}
      entryType={ImmunizationTypeEnum.Refusal}
    />
  )
}

export { RefusalForm }
