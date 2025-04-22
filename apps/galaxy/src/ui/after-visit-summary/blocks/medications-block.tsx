import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PatientMedicationsDataTable } from '../../medications/patient-medications-widget/patient-medications-data-table'

const MedicationsBlock = () => {
  return (
    <Flex direction="column" gap="1" className="bg-white my-2 rounded-1 p-2">
      <Text className="text-[16px] font-[600] text-accent-12">
        Current Medications
      </Text>
      <PatientMedicationsDataTable actionsHide />
    </Flex>
  )
}

export { MedicationsBlock }
