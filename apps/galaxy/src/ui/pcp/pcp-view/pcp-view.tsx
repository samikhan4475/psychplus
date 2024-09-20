'use client'

import React, { useState } from 'react'
import { CreatePcpHeader, HxDialog, PcpFormView } from '.'
import { PcpViewProps } from '../types'
import { CreatePcpForm } from './create-pcp-form'

const PcpView = ({ patientId, googleApiKey }: PcpViewProps) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  return (
    <CreatePcpForm>
      <CreatePcpHeader onClick={toggleOpen} />
      <PcpFormView patientId={patientId} googleApiKey={googleApiKey} />
      <HxDialog open={open} onClose={toggleOpen} patientId={patientId} />
    </CreatePcpForm>
  )
}

export { PcpView }
