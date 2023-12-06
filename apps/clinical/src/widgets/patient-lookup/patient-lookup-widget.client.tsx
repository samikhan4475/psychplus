'use client'

import { Box } from '@radix-ui/themes'
import { PatientLookupTable } from './components'

const PatientLookupWidgetClient = () => {
  return (
    <Box width="100%" height="100%">
      <PatientLookupTable />
    </Box>
  )
}

export { PatientLookupWidgetClient }
