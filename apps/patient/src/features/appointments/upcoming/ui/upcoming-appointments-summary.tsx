import Link from 'next/link'
import { AppointmentType } from '@psychplus-v2/constants'
import {
  formatCurrency,
  getAppointmentTypeLabel,
  getProviderTypeLabel,
  getUserFullName,
  withSuspense,
} from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { CalendarDaysIcon, ChevronRightIcon, DotIcon } from 'lucide-react'
import { getProfile } from '@/api'
import {
  Badge,
  CardContainer,
  FeatureEmpty,
  FileLineIcon,
  LoadingPlaceholder,
  ParentLineIcon,
  ProviderAvatar,
  ShieldFlashLineIcon,
} from '@/components-v2'
import { getCreditCards } from '../../../billing/payments/api'
import { ScheduleAppointmentButton } from '../../search'
import { getUpcomingAppointments } from '../api'
import { AppointmentTimeLabel } from './appointment-time-label'
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
      {upcomingAppointments.map((row) => (
        <CardContainer key={row.id}>
          <Flex direction="column" gap="3">
            <Flex
              direction={{ initial: 'column', xs: 'row' }}
              gap="5"
              className="justify-between"
            >
              <Flex gap="3">
                <ProviderAvatar provider={row.specialist} size="6" />
                <Flex direction="column">
                  <Text className="text-[20px] font-[600] leading-6 -tracking-[0.25px] text-[#24366B] xs:text-[24px] sm:text-[28px]">
                    {getUserFullName(row.specialist.legalName)}
                    {row.specialist.legalName.honors &&
                      `, ${row.specialist.legalName.honors}`}
                  </Text>
                  <Flex
                    mt="1"
                    direction={{ initial: 'row', xs: 'row' }}
                    align="center"
                  >
                    <Text className="text-[14px] text-[#194595]">
                      {getProviderTypeLabel(
                        row.specialistTypeCode,
                      ).toLocaleUpperCase()}
                    </Text>
                    <DotIcon color="gray" />
                    <Text className="whitespace-nowrap text-[14px] text-[#194595]">
                      {getAppointmentTypeLabel(row.type).toLocaleUpperCase()}{' '}
                      VISIT
                    </Text>
                  </Flex>
                  <AppointmentTimeLabel appointment={row} />
                </Flex>
              </Flex>

              {/* Non functional buttons started from here */}
              <Flex>
                {row?.virtualRoomLink &&
                  row.type === AppointmentType.Virtual && (
                    <Link href={row?.virtualRoomLink} target="_blank"></Link>
                    <Button highContrast className="w-full py-5">
                      Join Virtual Call now
                    </Button>
                    </Link>
                  )}
                {row.type === AppointmentType.InPerson && (
                  <Button highContrast className="w-full py-5">
                    Get Direction
                  </Button>
                )}
              </Flex>
              {/* Non functional buttons ending here */}
            </Flex>

            <Flex
              wrap="wrap"
              direction={{ initial: 'column', xs: 'row' }}
              className="lg:ml-20"
              gap={{ initial: '2', xs: '6' }}
            >
              {/* Non functional insurance related code started from here */}
              <Flex align="center" gap="1" ml={{ initial: '0', xs: '3' }}>
                <ShieldFlashLineIcon />
                <Text className="text-[12px] xs:text-[15px]">Blue Shield</Text>
                <Badge label="Pending" type="warning" />
              </Flex>
              {/* Non functional insurance related code ending here */}

              <Flex align="center" gap="1">
                <ParentLineIcon />
                <Text className="text-[12px] xs:text-[15px]">{`Copay: ${formatCurrency(
                  row.coPay,
                )}`}</Text>
                {!row?.isCopayPaid && row.coPay > 0 && (
                  <PayCopayButton
                    creditCards={creditCardResponse.data}
                    user={profileResponse.data}
                    appointmentId={row.id}
                    copay={row.coPay}
                  />
                )}

                {row.isCopayPaid && row.coPay > 0 && (
                  <Badge label="Paid" type="success" addIcon={true} />
                )}
              </Flex>
            </Flex>

            {/* Non functional previsit assesment and buttons started from here */}
            <Flex
              wrap="wrap"
              gap="3"
              align="center"
              justify="between"
              className="w-full"
              direction={{ initial: 'column', xs: 'row' }}
            >
              <Flex gap="1" width={{ initial: '100%', xs: 'auto' }}>
                <Flex gap="1" align="center">
                  <FileLineIcon />
                  <Text className="whitespace-nowrap text-[12px] xs:text-[15px]">
                    Pre-Visit Assessment
                  </Text>
                </Flex>
                <Badge label="Not Completed" type="warning" addIcon={true} />
                <Button highContrast className="rounded-2 bg-[#194595]">
                  <Flex gap="1" align="center">
                    <Text className="whitespace-nowrap text-[11px] xs:text-[15px]">
                      Fill Now
                    </Text>
                    <ChevronRightIcon height="16" width="16" />
                  </Flex>
                </Button>
              </Flex>

              <Flex gap="2" width={{ initial: '100%', xs: 'auto' }}>
                <Flex className="w-1/3">
                  <Button
                    variant="outline"
                    highContrast
                    className="w-full px-6 py-5"
                    color="gray"
                  >
                    Edit
                  </Button>
                </Flex>
                <Flex className="flex-1">
                  <Button
                    variant="outline"
                    highContrast
                    className="w-full py-5"
                    color="gray"
                  >
                    <Text className="whitespace-nowrap">
                      {row.type === AppointmentType.InPerson
                        ? 'Change to Virtual'
                        : 'Change to In-Person'}
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            {/* Non functional previsit assesment and buttons ending from */}
          </Flex>
        </CardContainer>
      ))}
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
