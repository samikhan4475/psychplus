'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { InsurancePayers } from '@psychplus/appointments'
import { fetchInsurancePayers } from '@psychplus/appointments/api.client'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { usePublishSize } from '@psychplus/widgets/hooks'
import { GooglePlacesContextProvider } from '@/providers'
import { InsurancePaymentForm } from './form'

interface Props {
  stripeApiKey: string
  onClose: () => void
  mapKey: string
}
const InsurancePaymentClient = ({ stripeApiKey, onClose, mapKey }: Props) => {
  const stripePromise = React.useMemo(
    () => loadStripe(stripeApiKey),
    [stripeApiKey],
  )

  const ref = React.useRef<HTMLDivElement>(null)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)

  const [insurancePayers, setInsurancePayers] = useState<InsurancePayers>([])

  useEffect(() => {
    fetchInsurancePayers().then((insurancePayers) =>
      setInsurancePayers(insurancePayers),
    )
  }, [])

  return (
    <GooglePlacesContextProvider apiKey={mapKey}>
      <Elements stripe={stripePromise}>
        <InsurancePaymentForm
          insuranceOptions={insuranceOptions}
          insurancePayers={insurancePayers}
          onClose={onClose}
        />
      </Elements>
    </GooglePlacesContextProvider>
  )
}

const insuranceOptions = [
  {
    key: 'yes',
    label: 'Insurance',
    value: true,
  },
  {
    key: 'no',
    label: 'Self Pay',
    value: false,
  },
]

export { InsurancePaymentClient }
