import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { AdminTable } from './admin-table'
import { CareTeamsHeader } from './care-teams-header'
import { ClinicalSupportStaffTable } from './clinical-support-staff-table'
import { useStore } from './store'

const CareTeamsView = () => {
  const { fetchClinicalStaff, fetchAdmin } = useStore()
  useEffect(() => {
    fetchClinicalStaff(0)
    fetchAdmin(0)
  }, [])
  return (
    <Flex direction="column" className="w-[90%] sm:w-[80%] md:w-[50%]" gap="1">
      <CareTeamsHeader />
      <ClinicalSupportStaffTable />
      <AdminTable />
    </Flex>
  )
}

export { CareTeamsView }
