'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@psychplus-v2/utils'
import { Appointment } from '@psychplus-v2/types'
import { Button } from '@radix-ui/themes'

interface AppointmentJoinCallProps {
  virtualRoomLink: string,
  appointment: Appointment,
}

const JoinVirtualCallBtn = ({
  virtualRoomLink,
  appointment: row
}: AppointmentJoinCallProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const appointmentDateTime = new Date(row.startDate)

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date()
      const timeDifference = (appointmentDateTime.getTime() - currentTime.getTime()) / 1000 / 60 // in minutes

      if (timeDifference <= 15) {
        setIsButtonDisabled(false)
      }
    }

    checkTime()

    const interval = setInterval(checkTime, 60000)

    return () => clearInterval(interval)
  }, [appointmentDateTime])
  
  return (
    <Link 
      href={!isButtonDisabled ? virtualRoomLink : {}} 
      target="_blank"
      aria-disabled={isButtonDisabled}
    >
      <Button 
        highContrast 
        disabled={isButtonDisabled} 
        className={cn(
          'w-full bg-[#194595]',
          isButtonDisabled && 'cursor-not-allowed text-[#758fbf] opacity-60'
        )}>
        Join Virtual Call Now
      </Button>
    </Link>
  )
}

export { JoinVirtualCallBtn }
