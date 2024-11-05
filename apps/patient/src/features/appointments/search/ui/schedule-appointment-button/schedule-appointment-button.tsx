'use client'

import { useRouter } from 'next/navigation'
import { Button, Flex } from '@radix-ui/themes'

const ScheduleAppointmentButton = ({ ...props }) => {
  const router = useRouter()

  return (
    <Flex className={props.className}>
      <Button
        size="3"
        highContrast
        {...props}
        onClick={() => router.push('/appointments/schedule-visit')}
      >
        Schedule Visit
      </Button>
    </Flex>
  )
}

export { ScheduleAppointmentButton }
