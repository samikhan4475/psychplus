'use client'

import { Box } from "@radix-ui/themes"
import { OrganizationPoliciesListFilterForm } from "./organization-policies-list-filter-form"
import { OrganizationPoliciesListTable } from "./organization-policies-list-table"
import { PoliciesHeading } from "./policies-heading"

const OrganizationPoliciesView = () => {
  return (
    <Box className="w-full py-1">
      <PoliciesHeading />
      <OrganizationPoliciesListFilterForm />
      <OrganizationPoliciesListTable />
    </Box>
  )
}

export { OrganizationPoliciesView }
