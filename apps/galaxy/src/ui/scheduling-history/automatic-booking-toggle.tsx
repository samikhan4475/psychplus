import { useCallback, useEffect, useState } from 'react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { useHasPermission } from '@/hooks'
import { PatientProfile } from '@/types'
import { getPatientProfileAction } from '../notes/client-actions/get-patient-profile'
import { PermissionAlert } from '../schedule/shared'
import { AutomaticRebookingDialog } from './auto-rebooking-dialog'

interface AutomaticBookingToggleProps {
  patientId: string
}

const AutomaticBookingToggle = ({ patientId }: AutomaticBookingToggleProps) => {
  const [open, setOpen] = useState<boolean | undefined>()
  const [patientProfile, setPatientProfile] = useState<
    undefined | PatientProfile
  >()
  const [showPermissionAlert, setShowPermissionAlert] = useState(false)
  const hasPermission = useHasPermission(
    'changeAutoRebookingToggleScheduleHxTab',
  )

  const fetchPatientProfile = useCallback(async () => {
    const response = await getPatientProfileAction(patientId)
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    setPatientProfile(response.data)
  }, [])

  const handleToggleSwitch = (value?: boolean) => {
    if (!hasPermission) {
      setShowPermissionAlert(true)
      return
    }
    setOpen(value)
  }

  const handleCloseDialog = (toggleStatus?: boolean) => {
    if (toggleStatus !== undefined && patientProfile) {
      setPatientProfile((prevState) =>
        prevState
          ? {
              ...prevState,
              isAutoReschedulingEnabled: !prevState.isAutoReschedulingEnabled,
            }
          : prevState,
      )
    }
    setOpen(undefined)
  }

  useEffect(() => {
    fetchPatientProfile()
  }, [])

  return (
    <Flex gap="1" align="center">
      <Text className="text-1 font-medium ">Automatic Booking Opt-out</Text>
      <Switch
        checked={patientProfile?.isAutoReschedulingEnabled}
        onCheckedChange={handleToggleSwitch}
        size="1"
        highContrast
      />
      {typeof open === 'boolean' && typeof patientProfile !== 'undefined' && (
        <AutomaticRebookingDialog
          open={typeof open === 'boolean'}
          patientProfile={patientProfile}
          patientId={patientId}
          handleClose={handleCloseDialog}
        />
      )}
      <PermissionAlert
        isOpen={showPermissionAlert}
        onClose={() => setShowPermissionAlert(false)}
        message="You do not have permission to change the auto-rebooking toggle in scheduling history tab. Please contact your supervisor if you need any further assistance."
      />
    </Flex>
  )
}

export { AutomaticBookingToggle }
