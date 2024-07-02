import Link from 'next/link'
import { AppointmentType, CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import {
  formatCurrency,
  getAppointmentTypeLabel,
  getProviderTypeLabel,
  getUserFullName,
  withSuspense,
} from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { CalendarDaysIcon, ChevronRightIcon, DotIcon } from 'lucide-react'
import { getCodesets, getProfile } from '@/api'
import {
  Badge,
  CardContainer,
  EditIcon,
  FeatureEmpty,
  FileLineIcon,
  LoadingPlaceholder,
  ParentLineIcon,
  ProviderAvatar,
  ShieldFlashLineIcon,
} from '@/components-v2'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'
import { getCreditCards } from '../../../billing/credit-debit-cards/api'
import { ScheduleAppointmentButton } from '../../search'
import { getUpcomingAppointments } from '../api'
import { AppointmentTimeLabel } from './appointment-time-label'
import { CancelAppointment } from './cancel-appointment'
import { ChangePaymentMethodDialog } from './change-payment-method-dialog'
import { PayCopayButton } from './pay-copay-button'

const UpcomingAppointmentsSummaryComponent = async () => {
  const [creditCardResponse, profileResponse, upcomingAppointmentResponse] =
    await Promise.all([
      getCreditCards(),
      getProfile(),
      getUpcomingAppointments(),
    ])

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.UsStates,
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
          action={<ScheduleAppointmentButton className="justify-center" />}
          Icon={CalendarDaysIcon}
        />
      </CardContainer>
    )
  }

  return (
    <CodesetStoreProvider codesets={codesets}>
      <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Flex direction="column" gap="4">
          {upcomingAppointments.map((row) => (
            <CardContainer key={row.id}>
              <CancelAppointment appointmentId={row.id} />
              <Flex direction="column" gap="3">
                <Flex
                  direction={{ initial: 'column', xs: 'row' }}
                  gap="5"
                  className="justify-between"
                >
                  <Flex gap="3">
                    <ProviderAvatar provider={row.specialist} size="6" />
                    <Flex direction="column">
                      <Flex align="center" gap="3">
                        <Text className="text-[20px] font-[600] leading-6 -tracking-[0.25px] text-[#24366B] xs:text-[24px] sm:text-[28px]">
                          {getUserFullName(row.specialist.legalName)}
                          {row.specialist.legalName.honors &&
                            `, ${row.specialist.legalName.honors}`}
                        </Text>
                        <EditIcon />
                      </Flex>
                      <Flex
                        mt="1"
                        direction={{ initial: 'row', xs: 'row' }}
                        align="center"
                        gap="3"
                      >
                        <Flex>
                          <Text className="text-[14px] text-[#194595]">
                            {getProviderTypeLabel(
                              row.specialistTypeCode,
                            ).toLocaleUpperCase()}
                          </Text>
                          <DotIcon color="gray" />
                          <Text className="whitespace-nowrap text-[14px] text-[#194595]">
                            {getAppointmentTypeLabel(
                              row.type,
                            ).toLocaleUpperCase()}{' '}
                            VISIT
                          </Text>
                        </Flex>
                        <Flex className="flex-1">
                          <Button
                            variant="outline"
                            highContrast
                            className="w-full"
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
                      <Flex gap="3" align="center">
                        <AppointmentTimeLabel appointment={row} />
                        <EditIcon />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  wrap="wrap"
                  direction={{ initial: 'column', xs: 'row' }}
                  className="lg:ml-20"
                  gap={{ initial: '2', xs: '6' }}
                >
                  {/* Non functional insurance related code started from here */}
                  <Flex align="center" gap="2" ml={{ initial: '0', xs: '3' }}>
                    <Flex align="center" gap="1">
                      <ShieldFlashLineIcon />
                      <Text className="text-[12px] xs:text-[15px]">
                        Blue Shield
                      </Text>
                      <Badge
                        label="Pending"
                        type="warning"
                        className="h-[32px]"
                      />
                    </Flex>
                    <ChangePaymentMethodDialog
                      creditCards={sortCreditCardsByPrimary(
                        creditCardResponse.data,
                      )}
                      stripeApiKey={STRIPE_PUBLISHABLE_KEY}
                    />
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
                      <Badge
                        label="Paid"
                        type="success"
                        addIcon={true}
                        className="h-[32px]"
                      />
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
                  mt="2"
                  direction={{ initial: 'column', xs: 'row' }}
                >
                  <Flex
                    gap="1"
                    width={{ initial: '100%', xs: 'auto' }}
                    align="center"
                  >
                    <Flex gap="1" align="center">
                      <FileLineIcon />
                      <Text className="whitespace-nowrap text-[12px] xs:text-[15px]">
                        Pre-Visit Assessment
                      </Text>
                    </Flex>
                    <Badge
                      label="Not Completed"
                      type="warning"
                      addIcon={true}
                      className="h-[32px]"
                    />
                    <Button highContrast className="bg-[#194595]" radius="full">
                      <Flex gap="1" align="center">
                        <Text className="whitespace-nowrap text-[11px] xs:text-[15px]">
                          Fill Now
                        </Text>
                        <ChevronRightIcon height="16" width="16" />
                      </Flex>
                    </Button>
                  </Flex>

                  {/* Non functional buttons started from here */}
                  <Flex width={{ initial: '100%', xs: 'auto' }}>
                    {row?.virtualRoomLink &&
                      row.type === AppointmentType.Virtual && (
                        <Link href={row?.virtualRoomLink} target="_blank">
                          <Button highContrast className="w-full bg-[#194595]">
                            Join Virtual Call now
                          </Button>
                        </Link>
                      )}
                    {row.type === AppointmentType.InPerson && (
                      <Button highContrast className="w-full bg-[#194595]">
                        Get Direction
                      </Button>
                    )}
                  </Flex>
                  {/* Non functional buttons ending here */}
                </Flex>
                {/* Non functional previsit assesment and buttons ending from */}
              </Flex>
            </CardContainer>
          ))}
        </Flex>
      </GooglePlacesContextProvider>
    </CodesetStoreProvider>
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
