'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Appointment } from '@psychplus-v2/types'
import { cn } from '@psychplus-v2/utils'
import { Button } from '@radix-ui/themes'
import { acs_enabled } from '../api/acs-feature'

interface AppointmentJoinCallProps {
  virtualRoomLink: string
  appointment: Appointment
}

const JoinVirtualCallBtn = ({
  virtualRoomLink,
  appointment: row,
}: AppointmentJoinCallProps) => {
  const router = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const appointmentDateTime = new Date(row.startDate)

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date()
      const timeDifference =
        (appointmentDateTime.getTime() - currentTime.getTime()) / 1000 / 60 // in minutes

      if (timeDifference <= 15) {
        setIsButtonDisabled(false)
      }
    }

    checkTime()

    const interval = setInterval(checkTime, 60000)

    return () => clearInterval(interval)
  }, [appointmentDateTime])

  const onJoinVirtualCall = async () => {
    const payload = {
      staffEmail: row.specialist.contactInfo?.email || '',
    }
    const res = await acs_enabled(payload)

    if (res.state === 'success') {
      router.push(`/call?email=${payload.staffEmail}`)
    } else {
      router.push(virtualRoomLink)
    }
  }

  return (
    <Button
      onClick={onJoinVirtualCall}
      highContrast
      disabled={isButtonDisabled}
      className={cn(
        'w-full bg-[#194595]',
        isButtonDisabled && 'cursor-not-allowed text-[#758fbf] opacity-60',
      )}
    >
      Join Virtual Call Now
    </Button>
  )
}

export { JoinVirtualCallBtn }
