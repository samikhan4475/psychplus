import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PermissionAlert } from '@/ui/schedule/shared'
import { AdminTable } from './admin-table'
import { CareTeamsHeader } from './care-teams-header'
import { ClinicalSupportStaffTable } from './clinical-support-staff-table'
import { useStore } from './store'

const CareTeamsView = ({
  isProfileView,
  staffId,
}: {
  isProfileView?: boolean
  staffId: string
}) => {
  const [alertInfo, setAlertInfo] = useState<{
    message: string
    isOpen: boolean
  }>({ message: '', isOpen: false })
  const { fetchClinicalStaff, fetchAdmin } = useStore((state) => ({
    fetchClinicalStaff: state.fetchClinicalStaff,
    fetchAdmin: state.fetchAdmin,
  }))
  useEffect(() => {
    fetchClinicalStaff(+staffId)
    fetchAdmin(+staffId)
  }, [])
  return (
    <Flex direction="column" className="flex-1" gap="1">
      <CareTeamsHeader />

      <PermissionAlert
        isOpen={alertInfo.isOpen}
        message={alertInfo.message}
        showHeading={false}
        onClose={() => {
          setAlertInfo({ message: '', isOpen: false })
        }}
      />
      <ClinicalSupportStaffTable
        staffId={staffId}
        isProfileView={isProfileView}
        setAlertInfo={setAlertInfo}
      />
      <AdminTable
        staffId={staffId}
        isProfileView={isProfileView}
        setAlertInfo={setAlertInfo}
      />
    </Flex>
  )
}

export { CareTeamsView }
