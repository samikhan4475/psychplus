'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { unstable_noStore } from 'next/cache'
import { Container, Flex } from '@radix-ui/themes'
import { Elements } from '@stripe/react-stripe-js'
import { InsurancePayers } from '@psychplus/appointments'
import { fetchInsurancePayers } from '@psychplus/appointments/api.client'
import { useStripe } from '@psychplus/ui/stripe'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { usePublishSize } from '@psychplus/widgets/hooks'
import { psychPlusBlueColor } from '@/components/colors'
import InsurancePaymentForm from './form'

const ScheduleAppointmentInsurancePage = () => {
  unstable_noStore()

  const { stripePromise } = useStripe()

  const ref = React.useRef<HTMLDivElement>(null)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)

  const [insurancePayers, setInsurancePayers] = useState<InsurancePayers>([])

  useEffect(() => {
    fetchInsurancePayers().then((insurancePayers) =>
      setInsurancePayers(insurancePayers),
    )
  }, [])

  return (
    <Flex direction="column" className="w-full" ref={ref}>
      <Container
        className="px-5 sm:px-[25%]"
        style={{
          color: psychPlusBlueColor,
        }}
      >
        <Elements stripe={stripePromise}>
          <InsurancePaymentForm
            insuranceOptions={insuranceOptions}
            insurancePayers={insurancePayers}
          />
        </Elements>
      </Container>
    </Flex>
  )
}

const insuranceOptions = [
  {
    key: 'yes',
    label: 'Yes',
    value: true,
  },
  {
    key: 'no',
    label: 'Self Pay',
    value: false,
  },
]

export default ScheduleAppointmentInsurancePage
