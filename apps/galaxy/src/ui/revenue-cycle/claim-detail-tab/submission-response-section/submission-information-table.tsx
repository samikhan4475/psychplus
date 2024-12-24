import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { ClaimSubmissionResponse, ClaimUpdate } from '@/types'
import { getClaimSubmissionResponse } from '../actions/get-service-claim-submission'
import { columns as getColumns } from './table-columns'

const SubmissionResponseTable = () => {
  const [submissionResponseList, setSubmissionResponseList] = useState<
    ClaimSubmissionResponse[]
  >([])
  const { watch } = useFormContext<ClaimUpdate>()
  const claimNumber = watch('claimNumber')

  useEffect(() => {
    fetchData()
  }, [claimNumber])

  const fetchData = async () => {
    if (!claimNumber) return
    const response = await getClaimSubmissionResponse(claimNumber)
    if (response.state === 'success') {
      setSubmissionResponseList(response.data)
    }
  }
  return <DataTable columns={getColumns()} data={submissionResponseList} />
}

export { SubmissionResponseTable }
