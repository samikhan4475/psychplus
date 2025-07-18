'use client'

import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'

function TransferPatientButton() {
  const [isExporting, setIsExporting] = useState(false)

  const onPressButton = () => {
    setIsExporting(true)
  }

  return (
    <Button
      size="1"
      highContrast
      type="button"
      disabled={isExporting}
      onClick={onPressButton}
    >
      <Plus color="white" width={15} height={15} strokeWidth={1.75} />
      Transfer patient
    </Button>
  )
}

export default TransferPatientButton
