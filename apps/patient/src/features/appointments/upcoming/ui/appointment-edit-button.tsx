'use client'

import { useRouter } from 'next/navigation'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { Button, Tooltip } from '@radix-ui/themes'
import { EditIcon } from '@/components-v2'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'

interface AppointmentEditButtonProps {
  appointmentType: AppointmentType
  providerType: ProviderType
  appointmentId: number
  specialistId: number
}

const AppointmentEditButton = ({
  appointmentType,
  providerType,
  appointmentId,
  specialistId,
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
          state: 'Texas',
        },
      }),
    )

    router.push(
      `/appointments/search?appointmentId=${appointmentId}&specialistId=${specialistId}`,
    )
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
        className="bg-white height-[16px] cursor-pointer p-0"
      >
        <EditIcon />
      </Button>
    </Tooltip>
  )
}

export { AppointmentEditButton }
