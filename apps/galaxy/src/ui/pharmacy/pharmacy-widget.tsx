'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { CurrentPharmaciesTable } from './current-pharmacies-table'
import { PharmacyHeader } from './pharmacy-header'
import { useStore } from './store'

interface PharmacyWidgetProps {
  patientId: string
  scriptSureAppUrl: string
}

const PharmacyWidget = ({
  patientId,
  scriptSureAppUrl,
}: PharmacyWidgetProps) => {
  const { fetchPatientPharmacies } = useStore((state) => ({
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))

  useEffect(() => {
    fetchPatientPharmacies(patientId)
  }, [patientId, fetchPatientPharmacies])
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyHeader scriptSureAppUrl={scriptSureAppUrl} />
      <CurrentPharmaciesTable />
    </Flex>
  )
}

export { PharmacyWidget }
