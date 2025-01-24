'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { License } from '../types'

const StateNameCell = ({
  row: { original: record },
}: PropsWithRow<License>) => {
  return <TextCell className='pl-1'>{record.stateName}</TextCell>
}

export { StateNameCell }
