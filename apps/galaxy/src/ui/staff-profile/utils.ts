import toast from 'react-hot-toast'
import { getLocalCalendarDate } from '@/utils'
import { uploadStaffVideoAction } from './actions/upload-staff-video'
import { StaffUpdatePayload } from './types'

const removeTypeAndCompare = (address1: object, address2: object) => {
  const filterOutType = (address: object) =>
    Object.fromEntries(
      Object.entries(address).filter(([key]) => key !== 'type'),
    )
  return (
    JSON.stringify(filterOutType(address1)) ===
    JSON.stringify(filterOutType(address2))
  )
}
const getInitialValues = (staff?: Partial<StaffUpdatePayload>) => ({
  addresses: staff?.addresses ?? [
    {
      postalCode: '',
      type: 'Business',
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
    },
  ],
  staffId: (staff?.staffId && String(staff?.staffId)) ?? '',
  userId: (staff?.userId && String(staff?.userId)) ?? '',
  staffRoleId: (staff?.staffRoleId && String(staff?.staffRoleId)) ?? '',
  status: staff?.status ?? '',
  staffUserRoleIds: staff?.staffUserRoleIds ?? [],
  staffTypeIds: staff?.staffUserRoleIds ?? [],
  firstName: staff?.firstName ?? '',
  lastName: staff?.lastName ?? '',
  dob: (staff?.dob && getLocalCalendarDate(staff?.dob as string)) ?? undefined,
  middleName: staff?.middleName ?? '',
  spokenLanguages: staff?.spokenLanguages ?? [''],
  virtualRoomLink: staff?.virtualRoomLink ?? '',
  biography: staff?.biography ?? '',
  title: staff?.title ?? '',
  npi: staff?.npi ?? '',
  gender: staff?.gender ?? '',
  email: staff?.email ?? '',
  phoneContact: staff?.phoneContact ?? '',
  supervisedBy: staff?.supervisedBy ?? '',
  supervisorStaffId: staff?.supervisorStaffId ?? '',
  specialists: staff?.specialists ?? [''],
  providerAttributions: staff?.providerAttributions ?? [],
  organizationIds: staff?.organizationIds ?? [''],
  practiceIds: staff?.practiceIds ?? [''],
  isMailingAddressSameAsPrimary:
    staff?.addresses && staff.addresses.length > 1
      ? removeTypeAndCompare(staff.addresses[0], staff.addresses[1])
      : false,
  timeZonePreference: staff?.timeZonePreference,
  hasBioVideo: staff?.hasBioVideo,
})

const handleUploadBioVideo = async (bioVideo: File, staffId: string) => {
  const formData = new FormData()
  formData.append('file', bioVideo)
  const uploadBioVideoResponse = await uploadStaffVideoAction({
    staffId,
    data: formData,
  })

  if (uploadBioVideoResponse.state === 'error') {
    toast.error(
      uploadBioVideoResponse.error ??
        'There was a problem uploading the report. Please try again.',
    )
    return false
  }

  toast.success('Bio Video Uploaded')
  return true
}

export { getInitialValues, handleUploadBioVideo }
