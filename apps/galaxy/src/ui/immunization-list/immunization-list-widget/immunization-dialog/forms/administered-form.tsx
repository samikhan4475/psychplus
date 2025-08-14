'use client'

import * as React from 'react'
import { useStore } from '../../store/store'
import { ImmunizationTypeEnum } from '../../types'
import { ImmunizationFormProps } from '../types'
import { getAdministeredInitialValues } from '../utils'
import { GenericImmunizationForm } from './generic-immunization-form'

const AdministeredForm = ({ data, closeDialog }: ImmunizationFormProps) => {
  const { appointmentId, fetchImmunizations } = useStore((state) => ({
    appointmentId: state.appointmentId,
    fetchImmunizations: state.fetchImmunizations,
  }))
  const handleSuccess = () => {
    closeDialog()
    if (appointmentId) {
      fetchImmunizations(appointmentId)
    }
  }

  return (
    <GenericImmunizationForm
      initialValues={getAdministeredInitialValues(data)}
      data={data}
      closeDialog={handleSuccess}
      appointmentId={appointmentId!}
      entryType={ImmunizationTypeEnum.Administered}
    />
  )
}

export { AdministeredForm }
