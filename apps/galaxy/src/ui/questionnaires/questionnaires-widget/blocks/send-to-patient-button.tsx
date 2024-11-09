'use client'

import { Button, Tooltip } from '@radix-ui/themes'

const SendToPatientButton = () => {
  return (
    <Tooltip content="Send a Request to the Patient to Complete Questionnaire">
      <Button
        size="1"
        color="gray"
        variant="surface"
        highContrast
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        Request patient to Fill
      </Button>
    </Tooltip>
  )
}

export { SendToPatientButton }
