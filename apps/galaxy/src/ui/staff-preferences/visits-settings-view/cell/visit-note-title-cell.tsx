'use client'

import { FieldArrayWithId } from 'react-hook-form'
import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import { SchemaType } from '../../schema'

const VisitNoteTitleCell = ({
  row,
}: PropsWithRow<FieldArrayWithId<SchemaType, 'visitTypes'>>) => {
  const { visitNoteTitle = '' } = row.original
  const codes = useCodesetCodes(CODESETS.NoteTitle)

  return (
    <TextCell className="truncate pl-1 capitalize" wrapperClass="w-full">
      {getCodesetDisplayName(visitNoteTitle, codes)}
    </TextCell>
  )
}

export { VisitNoteTitleCell }
