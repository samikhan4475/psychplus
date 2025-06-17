'use client'

import { useRouter } from 'next/navigation'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { Button, Flex, Text } from '@radix-ui/themes'
import { User } from '@psychplus/user'
import { HospitalIcon, MobileIcon } from '@/components-v2'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'

interface BannerAppointmentButtonProps {
  appointmentType: AppointmentType
  profile: User
}

const BannerAppointmentButton = ({
  appointmentType,
  profile,
}: BannerAppointmentButtonProps) => {
  const router = useRouter()

  const onSchedule = () => {
    sessionStorage.setItem(
      APPOINTMENTS_SEARCH_SESSION_KEY,
      JSON.stringify({
        state: {
          providerType: ProviderType.Psychiatrist,
          appointmentType: appointmentType,
          zipCode: '77070',
          state: 'Texas',
          stateCode: 'TX',
        },
      }),
    )
    // if (profile.contactDetails?.addresses) {
    //   router.push(`/appointments/search`)
    // } else {
      router.push(`/appointments/schedule-visit`)
    // }
  }

  return (
    <Button
      size={{ initial: '4' }}
      variant="soft"
      onClick={onSchedule}
      radius="small"
      className="bg-white text-accent-12 hover:bg-accent-2 active:bg-accent-3 xs:flex-1 sm:flex-initial"
    >
      <Flex
        align="center"
        justify="center"
        className={`rounded-full h-[35px] w-[35px] ${
          appointmentType === AppointmentType.InPerson
            ? 'bg-[#8BD5CA]'
            : 'bg-[#F5F2FF]'
        }`}
      >
        {appointmentType === AppointmentType.InPerson ? (
          <HospitalIcon />
        ) : (
          <MobileIcon />
        )}
      </Flex>
      <Text size="2">
        {appointmentType === AppointmentType.InPerson ? 'In-person' : 'Virtual'}{' '}
        Visit
      </Text>
    </Button>
  )
}

export { BannerAppointmentButton }
