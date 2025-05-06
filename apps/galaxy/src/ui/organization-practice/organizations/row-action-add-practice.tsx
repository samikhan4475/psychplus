'use client'

import { type PropsWithRow } from '@/components'
import { PracticeDialog } from '../dialogs'
import { useStore } from '../organizations/store'
import { Organization } from '../types'

const RowActionAddPractice = ({
  row: { original: organization },
}: PropsWithRow<Organization>) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  return (
    <PracticeDialog
      organizationId={organization.id}
      data={organization}
      refetch={search}
    />
  )
}

export { RowActionAddPractice }
