'use client'

import { Box } from '@radix-ui/themes'
import { OrganizationPracticesListFilterForm } from './organization-practices-list-filter-form'
import { OrganizationPracticesListTable } from './organization-practices-list-table'
import { PracticesHeading } from './practices-heading'

interface OrganizationPracticesViewProps {
  isPractices?: boolean
}

const OrganizationPracticesView = ({
  isPractices,
}: OrganizationPracticesViewProps) => {
  return (
    <Box className="w-full py-1">
      {!isPractices && <PracticesHeading />}
      <OrganizationPracticesListFilterForm isPractices={isPractices} />
      <OrganizationPracticesListTable isPractices={isPractices} />
    </Box>
  )
}

export { OrganizationPracticesView }
