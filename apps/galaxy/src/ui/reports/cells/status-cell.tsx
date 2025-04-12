'use client'

import { useState, useTransition } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { disableScheduleJobAction, enableScheduleJobAction } from '../actions'
import { ScheduledReport } from '../types'

const StatusCell = ({
  row: {
    original: { isEnabled, jobId },
  },
}: PropsWithRow<ScheduledReport>) => {
  const [isPending, startTransition] = useTransition()
  const [checked, setChecked] = useState(isEnabled)

  const handleEnable = async () => {
    setChecked(true)
    startTransition(() => {
      enableScheduleJobAction(jobId)
    })
  }

  const handleDisable = async () => {
    setChecked(false)
    startTransition(() => {
      disableScheduleJobAction(jobId)
    })
  }

  return (
    <Flex align="center" gap="2">
      <Switch
        checked={checked}
        onCheckedChange={(value) => (value ? handleEnable() : handleDisable())}
        size="1"
        disabled={isPending}
      />
      <Text size="1">{checked ? 'Active' : 'Inactive'}</Text>
    </Flex>
  )
}

export { StatusCell }
