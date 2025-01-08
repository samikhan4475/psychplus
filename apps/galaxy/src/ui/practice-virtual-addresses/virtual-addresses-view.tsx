'use client'

import { GooglePlacesContextProvider } from "@/providers/google-places-provider"
import { Box } from "@radix-ui/themes"
import { VirtualAddressesListFilterForm } from "./virtual-addresses-list-filter-form"
import { VirtualAddressesHeading } from "./virtual-address-heading"
import { VirtualAddressesListTable } from "./virtual-addresses-list-table"

interface VirtualAddressesViewProps {
  googleApiKey: string
}

const VirtualAddressesView = ({ googleApiKey }: VirtualAddressesViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Box className="w-full py-1">
        <VirtualAddressesHeading />
        <VirtualAddressesListFilterForm />
        <VirtualAddressesListTable />
      </Box>
    </GooglePlacesContextProvider>
  )
}

export { VirtualAddressesView }
