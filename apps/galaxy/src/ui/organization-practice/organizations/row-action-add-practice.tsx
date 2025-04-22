'use client'

import { type PropsWithRow } from '@/components'
import { PracticeDialog } from '../dialogs'
import { Organization } from '../types'

const RowActionAddPractice = ({
  row: { original: organization },
}: PropsWithRow<Organization>) => {
  return <PracticeDialog organizationId={organization.id} data={organization} />
}

export { RowActionAddPractice }
