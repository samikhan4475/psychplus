'use client'

import { type PropsWithRow } from '@/components'
import { PatientStatementDialog } from '../dialogs'
import { PatientStatement } from '../types'

const RowActionView = ({
  row: { original: record },
}: PropsWithRow<PatientStatement>) => {
  return <PatientStatementDialog data={record} />
}

export { RowActionView }
