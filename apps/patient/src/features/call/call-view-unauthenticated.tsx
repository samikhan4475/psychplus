'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { PaymentType } from '@psychplus-v2/constants'
import { Flex, Text } from '@radix-ui/themes'
import { AnonHeader, PaymentMethodAccordion } from '@/components-v2'
import { AppointmentDetails } from '../appointments/book/ui/book-appointment'
import { InsurancePayer } from '../billing/payments/types'
import { CallCompositeContainer } from './blocks/call-composit'
import JoinNowButton from './blocks/join-now-button'
import VideoCallAccess from './blocks/video-call-access'
import { useCallView } from './hooks/use-call-view'
import { AcsInfo } from './types'

interface UnauthenticatedCallViewProps {
  acsInfo: AcsInfo
  stripeApiKey?: string
  insurancePayers?: InsurancePayer[]
}

const UnauthenticatedCallView = ({
  acsInfo,
  stripeApiKey,
  insurancePayers,
}: UnauthenticatedCallViewProps) => {
  const validTime = 30
  const targetDate = acsInfo?.paymentData?.appointmentDateTime
  const username = acsInfo?.paymentData?.patientFirstName
  const [isStartCall, setIsStartCall] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.Insurance,
  )

  const { checkCallEligibility } = useCallView({
    acsInfo,
    isUnAuthenticated: true,
    paymentMethod,
  })

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
    const target = new Date(targetDate).getTime()

    const checkTime = () => {
      const now = new Date().getTime()
      const difference = target - now
      const minutesLeft = difference / (1000 * 60)
      setIsWarning(minutesLeft > validTime)
    }

    checkTime()
    const timer = setInterval(checkTime, 1000 * validTime)

    return () => clearInterval(timer)
  }, [targetDate])

  return isStartCall ? (
    <Flex
      direction="column"
      className="flex w-full flex-1 flex-col overflow-y-auto px-2.5 py-0.5 shadow-1"
    >
      <CallCompositeContainer acsInfo={acsInfo} username={username as string} />
    </Flex>
  ) : (
    <Flex direction="column" width="100%">
      <AnonHeader />
      <Flex justify={'center'} align={'center'}>
        <Flex
          direction="column"
          className="bg-white my-10 w-full max-w-[688px] rounded-3 shadow-3 sm:p-12 md:px-6 md:py-8"
          gap="4"
        >
          <Flex align="center" justify="between">
            <Text size="6" weight="bold" className="mb-2 font-[inherit]">
              {acsInfo?.paymentData?.patientFirstName}, are you ready for your
              video call?
            </Text>
            <JoinNowButton
              setIsStartCall={() => setIsStartCall(true)}
              checkCallEligibility={checkCallEligibility as () => boolean}
              targetDate={acsInfo?.paymentData?.appointmentDateTime}
              isUnAuthenticated
            />
          </Flex>
          <AppointmentDetails
            isCall
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            acsInfo={acsInfo}
            isUnAuthenticated
          />
          {isWarning && (
            <VideoCallAccess
              date={acsInfo?.paymentData?.appointmentDateTime}
              checkCallEligibility={checkCallEligibility as () => boolean}
            />
          )}
          <PaymentMethodAccordion
            paymentMethod={paymentMethod}
            stripeApiKey={stripeApiKey as string}
            isCall
            isUnAuthenticated
            insurancePayers={insurancePayers as InsurancePayer[]}
            acsInfo={acsInfo}
          />
          <JoinNowButton
            setIsStartCall={setIsStartCall}
            className="w-full"
            checkCallEligibility={checkCallEligibility as () => boolean}
            targetDate={acsInfo?.paymentData?.appointmentDateTime}
            isUnAuthenticated
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

export { UnauthenticatedCallView }
