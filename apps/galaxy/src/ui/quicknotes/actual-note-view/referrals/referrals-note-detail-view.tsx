'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { getPatientReferralsAction } from '@/actions/get-patient-referrals'
import { LoadingPlaceholder } from '@/components'
import { PatientReferral } from '@/types'
import { QuickNoteSectionName } from '../../constants'
import { NoteDetailProps } from '../types'
import { Details } from './details'
import { getDefaultPayload } from './utils'

const ReferralNoteDetailView = ({ patientId }: NoteDetailProps) => {
  const [response, setResponse] = useState<{
    referrals: PatientReferral[]
    total: number
  }>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await getPatientReferralsAction({
        patientIds: [patientId],
        payload: getDefaultPayload(),
      })
      if (result.state === 'error') {
        setLoading(false)
        return
      }
      setResponse(result.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  if (!response) return null
  return <Details data={response.referrals} />
}

export { ReferralNoteDetailView }
