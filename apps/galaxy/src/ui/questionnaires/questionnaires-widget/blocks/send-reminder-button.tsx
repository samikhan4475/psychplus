'use client'

import { Button, Tooltip } from '@radix-ui/themes'

const SendReminderButton = () => {
  return (
    <Tooltip content="Patient will receive reminder Message">
      <Button
        size="1"
        color="gray"
        variant="surface"
        highContrast
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        Send Reminder
      </Button>
    </Tooltip>
  )
}

export { SendReminderButton }
