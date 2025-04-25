'use client'

import { type PropsWithRow } from '@/components'
import { OrganizationStaffDialog } from './organization-staff-dialog'
import { Practice } from './types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<Practice>) => {
  return <OrganizationStaffDialog data={record} />
}

export { RowActionEdit }
