'use client'

import { type PropsWithRow } from '@/components'
import { OrganizationStaffDialog } from './dialogs'
import { Staff } from './types'

const RowActionEdit = ({ row: { original: staff } }: PropsWithRow<Staff>) => {
  return <OrganizationStaffDialog data={staff} />
}

export { RowActionEdit }
