'use client'

import { useRouter } from 'next/navigation'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { CareTeamMember } from '@psychplus-v2/types'
import { Button } from '@radix-ui/themes'
import { EditIcon } from '@/components'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'

interface CareTeamBookButtonProps {
  careTeamMember: CareTeamMember
  icon?: boolean
}

const CareTeamBookButton = ({
  careTeamMember,
  icon = false,
}: CareTeamBookButtonProps) => {
  const router = useRouter()

  const onBookAppointment = () => {
    sessionStorage.setItem(
      APPOINTMENTS_SEARCH_SESSION_KEY,
      JSON.stringify({
        state: {
          providerType:
            careTeamMember.specialist ===
            ProviderType[ProviderType.Psychiatrist]
              ? ProviderType.Psychiatrist
              : ProviderType.Therapist,
          appointmentType: AppointmentType.Virtual,
          zipCode: '77070',
          state: 'Texas',
        },
      }),
    )

    router.push(`/appointments/search`)
  }

  if (icon) {
    return (
      <Button variant="ghost" onClick={onBookAppointment}>
        <EditIcon width="14" height="14" />
      </Button>
    )
  }
  return (
    <Button
      variant="outline"
      className="px-6 py-2 text-[14px]"
      highContrast
      onClick={onBookAppointment}
    >
      Book Appointment
    </Button>
  )
}

export { CareTeamBookButton }
