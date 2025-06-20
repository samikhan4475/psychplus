import { PropsWithChildren, useState } from 'react'
import { parseDate, parseTime } from '@internationalized/date'
import { Dialog, Flex } from '@radix-ui/themes'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName, sanitizeFormData } from '@/utils'
import { updateClinicSchedule } from '../../clinic-time-tab/actions'
import { useStore } from '../../clinic-time-tab/store'
import { transformOut } from '../../clinic-time-tab/transform'
import { ClinicSchedule, PropsWithStaffId } from '../../clinic-time-tab/types'
import { isStartTimeEarlierThanEndTime } from '../../clinic-time-tab/utils'
import { ClinicScheduleForm } from './clinic-schedule-form'
import { ProfilePreferenceAlert } from './profile-preference-alert'
import { SchemaType } from './schema'

type EditClinicScheduleDialogProps = PropsWithChildren &
  PropsWithStaffId & {
    clinicTime: ClinicSchedule
  }

const EditClinicScheduleDialog = ({
  children,
  staffId,
  clinicTime,
}: EditClinicScheduleDialogProps) => {
  const { resetStates, refetch } = useStore((store) => ({
    resetStates: store.resetStates,
    refetch: store.refetch,
  }))
  const [open, setOpen] = useState(false)
  const [showProfilePreferenceAlert, setShowProfilePreferenceAlert] =
    useState(false)
  const sequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCodes = useCodesetCodes(CODESETS.VisitMedium)

  const onSubmit: SubmitHandler<SchemaType> = async (e) => {
    const santizedFormData = sanitizeFormData(e)
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
    const resp = await updateClinicSchedule(
      staffId,
      String(clinicTime.id),
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
    toast.success('Clinic Schedule Successfully Updated')
    refetch(clinicTime.staffId, clinicTime.id)
    setOpen(false)
  }

  const passDataInFormFormat = (): Partial<SchemaType> => {
    return {
      ...clinicTime,
      primaryState: clinicTime.stateCode,
      primaryLocation: clinicTime.locationId,
      primaryLocationName: clinicTime.locationName,
      cosignerStaffId: String(clinicTime.cosignerStaffId),
      day: clinicTime.dayOfSchedule,
      recurrence: clinicTime.weeklyRecurrence.toLocaleLowerCase(),
      visitMedium: clinicTime.visitMedium,
      status: clinicTime.status,
      publicView: clinicTime.isPublicViewable ? 'yes' : 'no',
      groups: clinicTime.ageGroups,
      teleStates: clinicTime.teleStates?.map((el) => ({
        ...el,
        location: el.locationId,
      })),
      visitTypes: clinicTime.visitTypes?.map((el) => {
        const sequence = getCodesetDisplayName(
          el.visitSequence ?? '',
          sequenceCodes,
        )
        const medium = getCodesetDisplayName(el.visitMedium ?? '', mediumCodes)
        return {
          serviceVisitTypeId: el.serviceVisitTypeId,
          visitName: `${el.typeOfVisit} - ${sequence} - ${medium}`,
        }
      }),
      bookingFrequency: String(clinicTime.maxBookingsPerSlot),
      timeStart: parseTime(clinicTime.startTime),
      timeEnd: clinicTime.endTime ? parseTime(clinicTime.endTime) : undefined,
      dateStart: parseDate(clinicTime.startDate),
      dateEnd: clinicTime.endDate ? parseDate(clinicTime.endDate) : undefined,
    }
  }

  const handleResetStates = (open: boolean) => {
    if (open) {
      setOpen(true)
      return
    }
    resetStates()
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleResetStates}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="min-w-[50%]">
        <Flex justify="between">
          <Dialog.Title>Edit Clinic Schedule</Dialog.Title>
          <CloseDialogTrigger />
        </Flex>
        <ClinicScheduleForm
          onSubmit={onSubmit}
          providerId={clinicTime.staffId}
          defaultValues={passDataInFormFormat()}
        />
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

export { EditClinicScheduleDialog }
