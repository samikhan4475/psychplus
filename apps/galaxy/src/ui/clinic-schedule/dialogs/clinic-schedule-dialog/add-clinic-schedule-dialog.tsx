import { PropsWithChildren, useState } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components'
import { sanitizeFormData } from '@/utils'
import { addClinicVisit } from '../../clinic-time-tab/actions'
import { ClinicScheduleStatus } from '../../clinic-time-tab/constants'
import { useStore } from '../../clinic-time-tab/store'
import { transformOut } from '../../clinic-time-tab/transform'
import { PropsWithStaffId } from '../../clinic-time-tab/types'
import { isStartTimeEarlierThanEndTime } from '../../clinic-time-tab/utils'
import { ClinicScheduleForm } from './clinic-schedule-form'
import { ProfilePreferenceAlert } from './profile-preference-alert'
import { SchemaType } from './schema'

type AddClinicScheduleDialogProps = PropsWithChildren & PropsWithStaffId
const AddClinicScheduleDialog = ({
  children,
  staffId,
}: AddClinicScheduleDialogProps) => {
  const [open, setOpen] = useState(false)
  const { resetStates, refetch } = useStore((store) => ({
    resetStates: store.resetStates,
    refetch: store.refetch,
  }))
  const [showProfilePreferenceAlert, setShowProfilePreferenceAlert] =
    useState(false)

  const onSubmit: SubmitHandler<SchemaType> = async (e) => {
    const santizedFormData = sanitizeFormData({
      ...e,
      status: ClinicScheduleStatus.Pending,
    })
    if (santizedFormData.timeStart && santizedFormData.timeEnd) {
      if (
        !isStartTimeEarlierThanEndTime(
          santizedFormData.timeStart,
          santizedFormData.timeEnd,
        )
      ) {
        toast.error('Start time must be earlier than End time')
        return
      }
    }
    const resp = await addClinicVisit(
      staffId,
      transformOut(santizedFormData, staffId),
    )
    if (resp.state === 'error') {
      if (resp.status === 406 && resp.error.includes('Profile Preference')) {
        setShowProfilePreferenceAlert(true)
        return
      }
      toast.error(resp.error)
      return
    }
    toast.success('Clinic Schedule Successfully Added')
    refetch(Number(staffId))
    setOpen(false)
  }

  const handleResetStates = (open: boolean) => {
    if (open) {
      setOpen(true)
      setShowProfilePreferenceAlert(false)
      return
    }
    setOpen(false)
    resetStates()
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleResetStates}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="min-w-[50%]">
        <Flex justify="between">
          <Dialog.Title>Add Clinic Schedule</Dialog.Title>
          <CloseDialogTrigger />
        </Flex>
        <ClinicScheduleForm onSubmit={onSubmit} />
      </Dialog.Content>
      <ProfilePreferenceAlert
        open={showProfilePreferenceAlert}
        onClose={() => {
          setShowProfilePreferenceAlert(false)
        }}
      />
    </Dialog.Root>
  )
}

export { AddClinicScheduleDialog }
