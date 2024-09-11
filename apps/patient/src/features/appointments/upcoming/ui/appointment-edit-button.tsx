'use client'

import { useRouter } from 'next/navigation'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { Button, Tooltip } from '@radix-ui/themes'
import { EditIcon } from '@/components-v2'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'

interface AppointmentEditButtonProps {
  appointmentType: AppointmentType,
  providerType: ProviderType
}

const AppointmentEditButton = ({
  appointmentType,
  providerType,
}: AppointmentEditButtonProps) => {
  const router = useRouter()

  const onSchedule = () => {
    sessionStorage.setItem(
      APPOINTMENTS_SEARCH_SESSION_KEY,
      JSON.stringify({
        state: {
          providerType: providerType,
          appointmentType: appointmentType,
          zipCode: '77070',
        },
      }),
    )

    router.push(`/appointments/search`)
  }

  return (
    <Tooltip 
      content="Change Provider for appointment"
      delayDuration={300}
      className="max-w-[200px]"
    >
      <Button
        variant="soft"
        onClick={onSchedule}
        radius="small"
        className="bg-white p-0 height-[16px] cursor-pointer"
      >
        <EditIcon />
      </Button>
    </Tooltip>
  )
}

export { AppointmentEditButton }
