'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { PatientConsent, PatientProfile } from '@/types'
import { TabContentHeading } from '../shared'
import { DataTable } from './data-table'
import { FilterForm } from './filter-form'
import { useStore } from './store'

const TAB_TITLE = 'Policy and Consents'

interface PolicyAndConsentsTabProps {
  patientId: string
  patientConsents: PatientConsent[]
  patientProfile: PatientProfile
}
const PolicyAndConsentsTab = ({
  patientId,
  patientConsents,
  patientProfile,
}: PolicyAndConsentsTabProps) => {
  const { filteredConsents, loading, setConsents, setPatientProfile } =
    useStore((state) => ({
      filteredConsents: state.filteredConsents,
      loading: state.loading,
      setConsents: state.setConsents,
      setPatientProfile: state.setPatientProfile,
    }))

  useEffect(() => {
    if (patientConsents.length > 0) {
      setConsents(patientConsents)
    }
  }, [patientConsents])

  useEffect(() => {
    if (patientProfile) {
      setPatientProfile(patientProfile)
    }
  }, [patientProfile])

  return (
    <Flex direction="column" width="100%" className="gap-0.5">
      <TabContentHeading title={TAB_TITLE} />
      <FilterForm patientId={patientId} />
      <DataTable loading={loading} consents={filteredConsents ?? []} />
    </Flex>
  )
}

export { PolicyAndConsentsTab }
