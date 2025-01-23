import React from 'react'
import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { Patient } from '../types'
import { getOptionLabel } from '../utils'

const UserStatusCell = ({ row: { original } }: PropsWithRow<Patient>) => {
  const options = useCodesetOptions(CODESETS.CustomerStatus)
  return <TextCell>{getOptionLabel(options, original.status)}</TextCell>
}

export { UserStatusCell }
