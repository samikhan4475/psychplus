import { PatientAddress, PatientProfile } from '@/types'
import {
  getPatientCity,
  getPatientMainAddress,
  getPatientPostalCode,
  getPatientState,
} from '@/utils'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  user: PatientProfile
}

const UserContactDetailsSection = async ({ user }: PatientBannerProps) => {
  return (
    <>
      <LabelAndValue
        label="Address"
        value={
          user.contactDetails.addresses
            ? getPatientMainAddress(
                user.contactDetails.addresses as PatientAddress[],
              )
            : undefined
        }
      />
      <LabelAndValue
        label="City/State/Zip"
        value={
          user.contactDetails.addresses
            ? `${getPatientCity(
                user.contactDetails.addresses as PatientAddress[],
              )}, ${getPatientState(
                user.contactDetails.addresses as PatientAddress[],
              )} ${getPatientPostalCode(
                user.contactDetails.addresses as PatientAddress[],
              )}`
            : undefined
        }
      />
    </>
  )
}

export { UserContactDetailsSection }
