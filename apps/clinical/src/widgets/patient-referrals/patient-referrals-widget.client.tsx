'use client'

import { Box } from '@radix-ui/themes'
import { PatientReferralsTable } from './components'

const PatientReferralsWidgetClient = () => {
  return (
    <Box width="100%" height="100%">
      <PatientReferralsTable />
    </Box>
  )
}

export { PatientReferralsWidgetClient }
