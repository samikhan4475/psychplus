'use client'

import React from 'react'
import { CreatePcpHeader, PcpFormView } from '.'
import { PcpViewWithInitialValueProps } from '../types'
import { CreatePcpForm } from './create-pcp-form'

const PcpView = ({
  patientId,
  googleApiKey,
  initialValue,
}: PcpViewWithInitialValueProps) => {
  return (
    <CreatePcpForm patientId={patientId} initialValue={initialValue}>
      <CreatePcpHeader patientId={patientId} />
      <PcpFormView patientId={patientId} googleApiKey={googleApiKey} />
    </CreatePcpForm>
  )
}

export { PcpView }
