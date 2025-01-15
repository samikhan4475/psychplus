'use client'

import { useCallback, useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { useGenericEventListener } from '@/hooks'
import { PatientReferral } from '@/types'
import { getPatientReferralsAction } from '@/ui/referrals/patient-referrals-widget/client-actions'
import { QuickNoteSectionName } from '../../constants'
import { Details } from './details'
import { getDefaultPayload } from './utils'

interface ReferralsClientViewProps {
  patientId: string
}

const ReferralsClientView = ({ patientId }: ReferralsClientViewProps) => {
  const [data, setData] = useState<PatientReferral[]>([])
  const [error, setError] = useState('')
  const refetch = useCallback(() => {
    getPatientReferralsAction({
      patientIds: [patientId],
      payload: getDefaultPayload(),
    }).then((response) => {
      if (response.state === 'error') {
        setError(response.error)
      } else {
        setData(response?.data?.referrals ?? [])
      }
    })
  }, [patientId])
  useEffect(() => {
    refetch()
  }, [refetch])

  useGenericEventListener({
    onEventTrigger: refetch,
    eventType: 'widget:save',
    widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
  })

  if (error) {
    return <Text>{error}</Text>
  }

  return <Details data={data} />
}

export { ReferralsClientView }
