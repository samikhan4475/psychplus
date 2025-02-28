import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { ClaimNotesResponse } from '@/types'
import { getClaimNotesAction } from '../../actions'
import { columns as getColumns } from './table-column'

interface ClaimNotesDeletedTableProps {
  claimId: string
}

const ClaimNotesDeletedTable = ({ claimId }: ClaimNotesDeletedTableProps) => {
  const [data, setData] = useState<ClaimNotesResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClaimAuditHistory()
  }, [claimId])

  const fetchClaimAuditHistory = async () => {
    setLoading(true)
    const requestedPayload = {
      claimId: claimId,
      recordStatuses: ['Deleted'],
      isAlert: [true, false],
    }
    const response = await getClaimNotesAction({ payload: requestedPayload })
    setLoading(false)
    if (response.state === 'error') {
      return setData([])
    }
    setData(response.data)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <DataTable
      columns={getColumns()}
      data={data.filter((note) => note.recordStatus === 'Deleted')}
    />
  )
}

export { ClaimNotesDeletedTable }
