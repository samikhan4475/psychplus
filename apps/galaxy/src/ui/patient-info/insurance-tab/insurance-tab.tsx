'use client'

import { useEffect, useState } from 'react'
import { ViewLoadingPlaceholder } from '@/components'
import { getInsurancePayersAction } from './actions/get-insurance-payers'
import { InsuranceView } from './insurance-view'
import { useStore } from './store'
import { InsurancePayer } from './types'

const TAB_TITLE = 'Patient Insurance Information'

const InsuranceTab = () => {
  const { fetchInsurances, loading } = useStore((state) => ({
    fetchInsurances: state.fetchInsurances,
    loading: state.loading,
  }))

  const [insurancePayers, setInsurancePayers] = useState<InsurancePayer[]>([])

  useEffect(() => {
    Promise.all([fetchInsurances(), getInsurancePayersAction()]).then(
      ([_, insurancePayerResponse]) => {
        if (insurancePayerResponse.state == 'success') {
          setInsurancePayers(insurancePayerResponse.data ?? [])
        }
      },
    )
  }, [])

  if (loading) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  return <InsuranceView insurancePayers={insurancePayers ?? []} />
}

export { InsuranceTab }
