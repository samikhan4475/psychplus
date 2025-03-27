'use client'

import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import { FieldArrayWithId } from 'react-hook-form'
import { SchemaType } from '../../schema'

const VisitMediumCell = ({
  row,
}: PropsWithRow<FieldArrayWithId<SchemaType, 'visitTypes'>>) => {
  const { visitMedium = '' } = row.original
  const codes = useCodesetCodes(CODESETS.VisitMedium)

  return (
    <TextCell className="truncate pl-1 capitalize" wrapperClass="w-full">
      {getCodesetDisplayName(visitMedium, codes)}
    </TextCell>
  )
}

export { VisitMediumCell }
