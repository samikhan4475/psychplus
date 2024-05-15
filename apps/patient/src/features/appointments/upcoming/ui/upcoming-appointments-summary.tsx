import { AppointmentType } from '@psychplus-v2/constants'
import {
  formatCurrency,
  getAppointmentTypeLabel,
  getClinicAddressLabel,
  getProviderTypeLabel,
  getUserFullName,
  withSuspense,
} from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import {
  CalendarDaysIcon,
  CheckIcon,
  HandCoinsIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import { getProfile } from '@/api'
import {
  CardContainer,
  FeatureEmpty,
  LoadingPlaceholder,
  ProviderAvatar,
} from '@/components-v2'
import { getCreditCards } from '../../../billing/payments/api'
import { ScheduleAppointmentButton } from '../../search'
import { getUpcomingAppointments } from '../api'
import { ActionButton } from './action-button'
import { AppointmentTimeLabel } from './appointment-time-label'
import { CancelAppointment } from './cancel-appointment'
import { PayCopayButton } from './pay-copay-button'

const UpcomingAppointmentsSummaryComponent = async () => {
  const [creditCardResponse, profileResponse, upcomingAppointmentResponse] =
    await Promise.all([
      getCreditCards(),
      getProfile(),
      getUpcomingAppointments(),
    ])

  if (upcomingAppointmentResponse.state === 'error') {
    throw new Error(upcomingAppointmentResponse.error)
  }

  if (creditCardResponse.state === 'error') {
    throw new Error(creditCardResponse.error)
  }

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  const upcomingAppointments = upcomingAppointmentResponse.data.appointments

  if (upcomingAppointments.length === 0) {
    return (
      <CardContainer className="p-0">
        <FeatureEmpty
          title="No Upcoming Appointments"
          action={<ScheduleAppointmentButton />}
          Icon={CalendarDaysIcon}
        />
      </CardContainer>
    )
  }

  return (
    <Flex direction="column" gap="4">
      {upcomingAppointments.map((row) => {
        return (
          <CardContainer key={row.id}>
            <CancelAppointment appointmentId={row.id} />
            <Flex direction="column" gap="5">
              <Flex direction={{ initial: 'column', sm: 'row' }} gap="4">
                <Flex
                  direction={{ initial: 'column', xs: 'row' }}
                  className="flex-1"
                  gap="5"
                >
                  <ProviderAvatar provider={row.specialist} size="6" />
                  <Flex direction="column">
                    <Text className="text-[20px] font-[600] leading-6 -tracking-[0.25px] xs:text-[24px] sm:text-[28px]">
                      {getUserFullName(row.specialist.legalName)}
                    </Text>
                    <Flex
                      mt="1"
                      direction={{ initial: 'row', xs: 'row' }}
                      gap={{ initial: '2', xs: '5' }}
                    >
                      <Text className="text-[14px] text-accent-12">
                        {getProviderTypeLabel(row.specialistTypeCode)}
                      </Text>
                      <Text className="text-[14px] text-accent-12">
                        {getAppointmentTypeLabel(row.type)}
                      </Text>
                    </Flex>
                    <AppointmentTimeLabel appointment={row} />
                  </Flex>
                </Flex>
                <Flex direction="column" gap="3" className="flex-1">
                  {row.type === AppointmentType.InPerson ? (
                    <Flex align="start" gap="1">
                      <MapPinIcon
                        width={22}
                        height={22}
                        strokeWidth={1.5}
                        fill="var(--accent-2)"
                        className="mt-[2px] min-w-[22px] text-accent-12 xs:mt-0"
                      />
                      <Text className="text-[15px]">
                        {row?.clinic
                          ? getClinicAddressLabel(row.clinic.contact.addresses)
                          : 'N/A'}
                      </Text>
                    </Flex>
                  ) : null}
                  <Flex gap="3" wrap="wrap">
                    <Flex align="center" gap="1">
                      <ShieldCheckIcon
                        width={22}
                        height={22}
                        strokeWidth={1.5}
                        fill="var(--accent-2)"
                        className="min-w-[22px] text-accent-12"
                      />
                      <Text className="text-[15px]">Primary</Text>
                    </Flex>
                    <Flex align="center" gap="1">
                      <HandCoinsIcon
                        width={22}
                        height={22}
                        strokeWidth={1.5}
                        fill="var(--accent-2)"
                        className="min-w-[22px] text-accent-12"
                      />
                      <Text className="text-[15px]">{`Copay: ${formatCurrency(
                        row.coPay,
                      )}`}</Text>
                      {row.isCopayPaid && row.coPay > 0 && (
                        <Flex
                          align="center"
                          className="rounded-1 border border-green-6 bg-green-3 px-2"
                        >
                          <CheckIcon
                            width={16}
                            height={16}
                            strokeWidth={2.5}
                            color="green"
                          />
                          <Text size="2">Paid</Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex wrap="wrap" gap="3">
                {row?.virtualRoomLink && (
                  <Button highContrast>Join Virtual Call now</Button>
                )}
                {!row?.isCopayPaid && (
                  <PayCopayButton
                    creditCards={creditCardResponse.data}
                    user={profileResponse.data}
                    appointmentId={row.id}
                    copay={row.coPay}
                  />
                )}
              </Flex>
            </Flex>
          </CardContainer>
        )
      })}
    </Flex>
  )
}

const UpcomingAppointmentsSummary = withSuspense(
  UpcomingAppointmentsSummaryComponent,
  {
    fallback: (
      <CardContainer>
        <LoadingPlaceholder />
      </CardContainer>
    ),
  },
)

export { UpcomingAppointmentsSummary }
