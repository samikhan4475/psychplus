import React from 'react'
import { TextCell } from '@/components'
import { Row } from '@tanstack/react-table'
import { GetIdProofingResponse } from '../../types'

interface Props {
  row: Row<GetIdProofingResponse>
}

const RequestByStaffCell: React.FC<Props> = ({ row }) => {
  const staff = row.original?.requestByStaffname
  const fullName = staff
    ? `${staff.firstName ?? ''} ${staff.lastName ?? ''}`.trim()
    : ''

  return <TextCell>{fullName}</TextCell>
}

export default RequestByStaffCell
