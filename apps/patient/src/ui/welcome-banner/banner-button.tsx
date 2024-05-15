'use client'

import { useRouter } from 'next/navigation'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { Button, Flex } from '@radix-ui/themes'
import { StoreIcon, VideoIcon } from 'lucide-react'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'

interface BannerAppointmentButtonProps {
  appointmentType: AppointmentType
}

const BannerAppointmentButton = ({
  appointmentType,
}: BannerAppointmentButtonProps) => {
  const router = useRouter()

  const onSchedule = () => {
    sessionStorage.setItem(
      APPOINTMENTS_SEARCH_SESSION_KEY,
      JSON.stringify({
        state: {
          providerType: ProviderType.Psychiatrist,
          appointmentType: appointmentType,
        },
      }),
    )

    router.push(`/appointments/search`)
  }

  return (
    <Button
      size={{ initial: '4' }}
      variant="soft"
      onClick={onSchedule}
      className="bg-white text-accent-12 hover:bg-accent-2 active:bg-accent-3 xs:flex-1 sm:flex-initial"
    >
      <Flex
        align="center"
        justify="center"
        className="rounded-full h-[35px] w-[35px] bg-accent-3"
      >
        {appointmentType === AppointmentType.InPerson ? (
          <StoreIcon size="20" fill="white" strokeWidth={1.5} />
        ) : (
          <VideoIcon size="20" fill="white" strokeWidth={1.5} />
        )}
      </Flex>
      {appointmentType === AppointmentType.InPerson ? 'Office ' : 'Virtual'}{' '}
      Visit
    </Button>
  )
}

export { BannerAppointmentButton }
