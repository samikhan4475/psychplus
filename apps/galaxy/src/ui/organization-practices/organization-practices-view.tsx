'use client'

import { GooglePlacesContextProvider } from "@/providers/google-places-provider"
import { Box } from "@radix-ui/themes"
import { OrganizationPracticesListFilterForm } from "./organization-practices-list-filter-form"
import { OrganizationPracticesListTable } from "./organization-practices-list-table"
import { PracticesHeading } from "./practices-heading"

interface OrganizationPracticesViewProps {
  googleApiKey: string
  isPractices?: boolean
}

const OrganizationPracticesView = ({ googleApiKey, isPractices }: OrganizationPracticesViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Box className="w-full py-1">
        {!isPractices && <PracticesHeading />}
        <OrganizationPracticesListFilterForm />
        <OrganizationPracticesListTable />
      </Box>
    </GooglePlacesContextProvider>
  )
}

export { OrganizationPracticesView }
