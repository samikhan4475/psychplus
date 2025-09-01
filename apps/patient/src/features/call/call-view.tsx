'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { User } from '@psychplus-v2/auth'
import { PaymentType } from '@psychplus-v2/constants'
import { Flex, Text } from '@radix-ui/themes'
import { PaymentMethodAccordion } from '@/components-v2'
import { AppointmentDetails } from '../appointments/book/ui/book-appointment'
import { CreditCard } from '../billing/credit-debit-cards/types'
import { InsurancePayer, InsurancePolicy } from '../billing/payments/types'
import { CallCompositeContainer } from './blocks/call-composit'
import GuardianDetails from './blocks/guardian-details'
import JoinNowButton from './blocks/join-now-button'
import { useCallView } from './hooks/use-call-view'
import { AcsInfo } from './types'

interface CallViewProps {
  acsInfo: AcsInfo
  user?: User
  stripeApiKey?: string
  creditCards?: CreditCard[]
  patientInsurances?: InsurancePolicy[]
  insurancePayers?: InsurancePayer[]
}

const CallView = ({
  acsInfo,
  user,
  stripeApiKey,
  creditCards,
  patientInsurances,
  insurancePayers,
}: CallViewProps) => {
  const username = user ? `${user.firstName} ${user.lastName}` : ''
  const [isStartCall, setIsStartCall] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.Insurance,
  )

  const { checkCallEligibility } = useCallView({
    acsInfo,
    patientInsurances: patientInsurances || [],
    creditCards: creditCards || [],
    paymentMethod,
  })

  const isAdult = (() => {
    const today = new Date()
    const birthDate = new Date(user?.birthdate || '')
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18
    }
    return age >= 18
  })()

  useEffect(() => {
    if (acsInfo?.paymentData?.paymentResponsibilityCode) {
      const formattedPaymentMethod =
        acsInfo.paymentData.paymentResponsibilityCode.replace(
          /([a-z])([A-Z])/g,
          '$1 $2',
        )
      setPaymentMethod(formattedPaymentMethod as PaymentType)
    }
  }, [acsInfo?.paymentData?.paymentResponsibilityCode])

  useEffect(() => {
    setIsStartCall(checkCallEligibility() as boolean)
  }, [paymentMethod, acsInfo, creditCards, patientInsurances])

  return isStartCall ? (
    <Flex
      direction="column"
      className="flex w-full flex-1 flex-col overflow-y-auto px-2.5 py-0.5 shadow-1"
    >
      <CallCompositeContainer acsInfo={acsInfo} username={username} />
    </Flex>
  ) : (
    <Flex direction="column" width="100%">
      <Flex justify={'center'} align={'center'}>
        <Flex
          direction="column"
          className="bg-white my-10 w-full max-w-[688px] rounded-3 shadow-3 sm:p-12 md:px-6 md:py-8"
          gap="4"
        >
          <Flex align="center" justify="between">
            <Text size="6" weight="bold" className="mb-2 font-[inherit]">
              {user?.firstName}, are you ready for your video call?
            </Text>
            <JoinNowButton
              setIsStartCall={() => setIsStartCall(true)}
              checkCallEligibility={checkCallEligibility as () => boolean}
              targetDate={acsInfo?.paymentData?.appointmentDateTime}
            />
          </Flex>
          <AppointmentDetails
            isCall
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            activeCreditCard={creditCards?.find((credit) => credit.isPrimary)}
            patientInsurances={patientInsurances}
            acsInfo={acsInfo}
          />
          <PaymentMethodAccordion
            paymentMethod={paymentMethod}
            stripeApiKey={stripeApiKey as string}
            creditCards={creditCards as CreditCard[]}
            patientInsurances={patientInsurances as InsurancePolicy[]}
            insurancePayers={insurancePayers as InsurancePayer[]}
            isCall
          />
          {!isAdult && <GuardianDetails />}
          <JoinNowButton
            checkCallEligibility={checkCallEligibility as () => boolean}
            setIsStartCall={setIsStartCall}
            className="w-full"
            targetDate={acsInfo?.paymentData?.appointmentDateTime}
          />
          {!username && (
            <Text align="center" size="2" className="mt-8">
              <NextLink
                href="/login"
                className="ml-1 text-accent-11 underline-offset-2 transition-colors hover:text-accent-12 hover:underline"
              >
                Login to your patient portal
              </NextLink>
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export { CallView }
