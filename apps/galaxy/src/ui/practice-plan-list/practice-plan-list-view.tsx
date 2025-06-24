'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { PracticePlanListForm } from './practice-plan-list-filter-form'
import { PracticePlanListHeading } from './practice-plan-list-heading'
import { PracticePlanListTable } from './practice-plan-list-table'

interface PracticesPlanListViewProps {
  googleApiKey: string
}
const PracticePlanListView = ({ googleApiKey }: PracticesPlanListViewProps) => {
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Box className="w-full py-1">
        <PracticePlanListHeading />
        <PracticePlanListForm />
        <PracticePlanListTable />
      </Box>
    </GooglePlacesContextProvider>
  )
}

export { PracticePlanListView }
