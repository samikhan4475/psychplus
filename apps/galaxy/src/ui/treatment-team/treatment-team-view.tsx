'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder, TabContentHeading } from '@/components'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getProviderCareTeams } from '../staff-treatment-team/care-teams/actions'
import { CareTeam } from '../staff-treatment-team/care-teams/types'
import {
  getProvidersOfPatients,
  ProvidersOfPatientsRequest,
  ProviderTeam,
} from './actions/get-providers-of-patients'
import { ProviderTable } from './provider/provider-table'
import { StaffTable } from './support-staff/staff-table'

const TreatmentTeamView = ({ patientId }: { patientId: string }) => {
  const [loading, setLoading] = useState(false)
  const [primaryPsychTeam, setPrimaryPsychTeam] = useState<ProviderTeam[]>([])
  const [primaryTherapyTeam, setPrimaryTherapyTeam] = useState<ProviderTeam[]>(
    [],
  )
  const [css, setCSS] = useState<CareTeam[]>([])
  const [admin, setAdmin] = useState<CareTeam[]>([])
  const [alertInfo, setAlertInfo] = useState<{
    message: string
    isOpen: boolean
  }>({ message: '', isOpen: false })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const payload: ProvidersOfPatientsRequest = {
      patientId: +patientId,
      isIncludeStaffInfo: true,
    }
    const [psychiatryRes, therapyRes, cssStaffRes, adminStaffRes] =
      await Promise.all([
        getProvidersOfPatients({
          ...payload,
          providerType: 'Psychiatrist',
        }),
        getProvidersOfPatients({
          ...payload,
          providerType: 'Therapy',
        }),
        getProviderCareTeams({
          patientId: +patientId,
          isOnlyMedicalAssistants: true,
        }),
        getProviderCareTeams({
          patientId: +patientId,
          isOnlyCareManagers: true,
        }),
      ])

    if (psychiatryRes.state === 'error') {
      toast.error(psychiatryRes.error || 'Failed to fetch Psychiatrists')
    } else {
      setPrimaryPsychTeam(psychiatryRes.data)
    }
    if (therapyRes.state === 'error') {
      toast.error(therapyRes.error || 'Failed to fetch Therapists')
    } else {
      setPrimaryTherapyTeam(therapyRes.data)
    }
    if (cssStaffRes.state === 'error') {
      toast.error(cssStaffRes.error || 'Failed to fetch Care Support Staff')
    } else {
      setCSS(cssStaffRes.data)
    }
    if (adminStaffRes.state === 'error') {
      toast.error(adminStaffRes.error || 'Failed to fetch Admin Staff')
    } else {
      setAdmin(adminStaffRes.data)
    }

    setLoading(false)
  }

  return (
    <Flex className="w-full p-[1px]" direction="column" gap="1">
      <TabContentHeading title="Treatment Team" className="justify-start" />

      <PermissionAlert
        isOpen={alertInfo.isOpen}
        message={alertInfo.message}
        showHeading={false}
        onClose={() => {
          setAlertInfo({ message: '', isOpen: false })
        }}
      />
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <ProviderTable
            data={primaryPsychTeam}
            patientId={patientId}
            isPsychiatry
          />
          <ProviderTable data={primaryTherapyTeam} patientId={patientId} />
          <StaffTable data={css} />
          <StaffTable data={admin} isAdmin />
        </>
      )}
    </Flex>
  )
}

export { TreatmentTeamView }
