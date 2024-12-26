import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { CareTeamsHeader } from './care-teams-header'
import { ClinicalSupportStaffTable } from './clinical-support-staff-table'
import { useStore } from './store'

const CareTeamsView = () => {
  const { fetchClinicalStaff, loadingClinicalstaff } = useStore()
  useEffect(() => {
    fetchClinicalStaff(0)
  }, [])
  return (
    <Flex direction="column" className="w-[90%] sm:w-[80%] md:w-[50%]" gap="1">
      <CareTeamsHeader />
      {loadingClinicalstaff ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <ClinicalSupportStaffTable />
      )}
    </Flex>
  )
}

export { CareTeamsView }
