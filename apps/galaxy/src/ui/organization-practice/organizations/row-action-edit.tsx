'use client'

import { type PropsWithRow } from '@/components'
import { OrganizationDialog } from '../dialogs'
import { Organization } from '../types'

const RowActionEdit = ({
  row: { original: organization },
}: PropsWithRow<Organization>) => {
  return <OrganizationDialog data={organization} />
}

export { RowActionEdit }
