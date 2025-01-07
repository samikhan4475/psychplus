'use client'

import React from 'react'

import { PcpViewWithInitialValueProps } from '../types'
import { CreatePcpForm } from './create-pcp-form'
import { CreatePcpHeader } from './create-pcp-header'
import { PcpFormView } from './pcp-form-view'

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
