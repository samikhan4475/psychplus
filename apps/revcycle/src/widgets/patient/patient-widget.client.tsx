'use client'

import { Box } from '@radix-ui/themes'
import { useStore } from './store'

const PatientWidgetClient = () => {
  const patient = useStore((state) => state.getPatient())

  return (
    <Box height="100%" width="100%" p="4">
      <div>
        This example widget will fetch and display the patient&apos;s name.
      </div>
      <div>
        <b>Patient:</b> {patient.fullName}
      </div>
    </Box>
  )
}

export { PatientWidgetClient }
