import Link from 'next/link'
import {
  AppointmentType,
  CODESETS,
  PaymentType,
  ProviderType,
} from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import {
  formatCurrency,
  getAppointmentTypeLabel,
  getProviderTypeLabel,
  getUserFullName,
  withSuspense,
} from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { CalendarDaysIcon, DotIcon } from 'lucide-react'
import { getCodesets, getConsents, getProfile } from '@/api'
import {
  Badge,
  CardContainer,
  CreditDebitCardIcon,
  FeatureEmpty,
  LoadingPlaceholder,
  ParentLineIcon,
  ProviderAvatar,
  ShieldFlashLineIcon,
} from '@/components-v2'
import { ChangeVisitMedium } from '@/features/appointments/upcoming/ui/change-visit-medium.tsx'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import {
  getCreditCards,
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'
import { ScheduleAppointmentButton } from '../../search'
import { getUpcomingAppointments } from '../api'
import {
  getClinicAddressDirectionMapUrl,
  mapVerificationStatusToChipVariant,
} from '../utils'
import { AppointmentEditButton } from './appointment-edit-button'
import { AppointmentTimeLabel } from './appointment-time-label'
import { CancelAppointment } from './cancel-appointment'
import { ChangePaymentMethodDialog } from './change-payment-method-dialog'
import { JoinVirtualCallBtn } from './join-virtual-call-button'
import { PayCopayButton } from './pay-copay-button'
import { UpdateDateAndTimeDialog } from './update-date-and-time-dialog'

const UpcomingAppointmentsSummaryComponent = async () => {
  const [
    creditCardResponse,
    profileResponse,
    upcomingAppointmentResponse,
    userConsentsResponse,
  ] = await Promise.all([
    getCreditCards(),
    getProfile(),
    getUpcomingAppointments(),
    getConsents(),
  ])

  const [insurancePayerResponse, patientInsurancesResponse] = await Promise.all(
    [getInsurancePayers(), getPatientInsurances()],
  )

  if (insurancePayerResponse.state === 'error') {
    throw new Error(insurancePayerResponse.error)
  }

  if (patientInsurancesResponse.state === 'error') {
    throw new Error(patientInsurancesResponse.error)
  }

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.UsStates,
    CODESETS.InsurancePolicyPriority,
  ])

  if (userConsentsResponse.state === 'error') {
    throw new Error(userConsentsResponse.error)
  }

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
  const patientVerification =
    upcomingAppointmentResponse.data.patientVerification

  if (upcomingAppointments.length === 0) {
    return (
      <CardContainer className="p-0">
        <FeatureEmpty
          title="No Upcoming Appointments"
          action={
            <ScheduleAppointmentButton
              className="justify-center"
            />
          }
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
                        <AppointmentEditButton
                          appointmentType={
                            row.type === 'InPerson'
                              ? AppointmentType.InPerson
                              : AppointmentType.Virtual
                          }
                          providerType={
                            row.specialistTypeCode === 1
                              ? ProviderType.Psychiatrist
                              : ProviderType.Therapist
                          }
                          appointmentId={row.id}
                          specialistId={row.specialist.id}
                        />
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
                          <ChangeVisitMedium appointment={row} />
                        </Flex>
                      </Flex>
                      <Flex gap="3" align="center">
                        <AppointmentTimeLabel appointment={row} />
                        <UpdateDateAndTimeDialog appointment={row} />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  wrap="wrap"
                  direction="column"
                  className="lg:ml-20"
                  gap={{ initial: '2', xs: '3' }}
                >
                  <Flex align="center" gap="2" ml={{ initial: '0', xs: '3' }}>
                    <Flex align="center" gap="1">
                      {row.isSelfPay && <CreditDebitCardIcon />}
                      {!row.isSelfPay && patientVerification.hasInsurance && (
                        <ShieldFlashLineIcon />
                      )}
                      {!row.isSelfPay &&
                        !patientVerification.hasInsurance &&
                        'Select Insurance'}

                      <Text className="text-[12px] xs:text-[15px]">
                        {row.isSelfPay
                          ? PaymentType.SelfPay
                          : patientVerification.primaryInsuranceName}
                      </Text>
                      {!row.isSelfPay &&
                        patientVerification.primaryInsuranceName && (
                          <Badge
                            label={
                              patientVerification.patientInsuranceVerification
                            }
                            type={mapVerificationStatusToChipVariant(
                              patientVerification?.patientInsuranceVerification,
                            )}
                            addIcon
                          />
                        )}
                    </Flex>
                    <ChangePaymentMethodDialog
                      appointment={row}
                      creditCards={sortCreditCardsByPrimary(
                        creditCardResponse.data,
                      )}
                      stripeApiKey={STRIPE_PUBLISHABLE_KEY}
                      patientInsurances={patientInsurancesResponse.data}
                      insurancePayers={insurancePayerResponse.data}
                    />
                  </Flex>

                  <Flex align="center" gap="1" ml={{ initial: '0', xs: '3' }}>
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

                <Flex
                  wrap="wrap"
                  gap="3"
                  align="center"
                  justify="end"
                  className="w-full"
                  mt="2"
                  direction={{ initial: 'column', xs: 'row' }}
                >
                  <Flex width={{ initial: '100%', xs: 'auto' }}>
                    {row?.virtualRoomLink &&
                      row.type === AppointmentType.Virtual && (
                        <JoinVirtualCallBtn
                          virtualRoomLink={row?.virtualRoomLink}
                          appointment={row}
                        />
                      )}
                    {row.type === AppointmentType.InPerson && (
                      <Link
                        href={getClinicAddressDirectionMapUrl(
                          row.clinic.contact?.addresses,
                        )}
                        target="_blank"
                      >
                        <Button highContrast className="w-full bg-[#194595]">
                          Get Direction
                        </Button>
                      </Link>
                    )}
                  </Flex>
                </Flex>
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
