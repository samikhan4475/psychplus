'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { LabResult } from '@/types'
import { fetchLabResultsAction } from '@/ui/lab-result/patient-lab-result-widget/actions'
import { getTableData } from '@/ui/lab-result/patient-lab-result-widget/utils'
import { Details } from './details'

type LabResultsClientProps = {
  patientId: string
  appointmentId?: string
}

const LabResultsClientNoteView = ({ patientId,appointmentId }: LabResultsClientProps) => {
  const [response, setResponse] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const payload = {
        resourceStatusList: ['Active'],
        patientId: patientId,
        isIncludeLabOrder: true,
        isIncludeLabLocation: true,
        isIncludeTests: true,
        appointmentId
      }
      const result = await fetchLabResultsAction(payload)
      setLoading(false)
      if (result.state === 'error') {
        return
      }
      if (result.data?.length) {
        const processedData = getTableData(result.data ?? [])
        setResponse(processedData)
      }
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

  return <Details data={response} />
}

export { LabResultsClientNoteView }
