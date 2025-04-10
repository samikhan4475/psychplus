'use client'

import { type PropsWithRow } from '@/components'
import { OrganizationStaffDialog } from './organization-staff-dialog'
import { Practice } from './types'

const RowActionEdit = ({
  row: { original: record },
  userId,
}: PropsWithRow<Practice> & { userId: string }) => {
  return <OrganizationStaffDialog data={record} userId={userId} />
}

export { RowActionEdit }
