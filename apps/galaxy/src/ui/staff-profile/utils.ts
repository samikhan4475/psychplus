import toast from 'react-hot-toast'
import { getLocalCalendarDate } from '@/utils'
import { uploadStaffVideoAction } from './actions/upload-staff-video'
import { SchemaType } from './schema'
import { StaffUpdatePayload } from './types'

const getInitialValues = ({
  contactInfo,
  legalName,
  phoneContact,
  ...staff
}: Partial<StaffUpdatePayload>): SchemaType => ({
  contactInfo: contactInfo ?? {
    email: '',
    emailVerificationStatus: '',
    isMailingAddressSameAsPrimary: false,
    phoneNumbers: [],
  },
  phoneContact: phoneContact ?? '',
  legalName: {
    firstName: legalName?.firstName ?? '',
    honors: legalName?.honors ?? '',
    lastName: legalName?.lastName ?? '',
    middleName: legalName?.middleName ?? '',
    preferredName: legalName?.preferredName ?? '',
    suffix: legalName?.suffix ?? '',
    title: legalName?.title ?? '',
  },
  homeAddress: contactInfo?.addresses?.find(
    (address) => address.type === 'Business' || address.type === 'Home',
  ),
  mailingAddress: contactInfo?.addresses?.find(
    (address) => address.type === 'Mailing',
  ),
  staffId: staff?.staffId ? String(staff?.staffId) : '',
  userId: staff?.userId ? String(staff?.userId) : '',
  staffRoleId: staff?.staffRoleId ? String(staff?.staffRoleId) : '',
  status: staff?.status ?? '',
  staffUserRoleIds: staff?.staffUserRoleIds ?? [],
  staffTypeIds: staff?.staffUserRoleIds ?? [],
  dob: staff?.dob ? getLocalCalendarDate(String(staff?.dob)) : null,
  spokenLanguages: staff?.spokenLanguages ?? [''],
  virtualRoomLink: staff?.virtualRoomLink ?? '',
  isVirtualRoomLink: Boolean(staff?.virtualRoomLink),
  biography: staff?.biography ?? '',
  npi: staff?.npi ?? '',
  gender: staff?.gender ?? '',
  supervisedBy: staff?.supervisedBy ?? '',
  supervisorStaffId: staff?.supervisorStaffId ?? '',
  specialists: staff?.specialists ?? [''],
  providerAttributions: staff?.providerAttributions ?? [],
  organizationIds: staff?.organizationIds ?? [''],
  practiceIds: staff?.practiceIds ?? [''],
  timeZonePreference: staff?.timeZonePreference ?? '',
  hasBioVideo: staff?.hasBioVideo ?? false,
  isTest: staff.isTest ?? false,
})

const handleUploadBioVideo = async (
  bioVideo: File,
  staffId: string,
  showSuccessMessage = true,
) => {
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

  showSuccessMessage && toast.success('Bio Video Uploaded')
  return true
}

export { getInitialValues, handleUploadBioVideo }
