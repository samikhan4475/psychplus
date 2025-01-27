import { PatientProfile } from '@/types'
import {
  getPatientCity,
  getPatientPostalCode,
  getPatientState,
  getPatientStreet,
} from '@/utils'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  user: PatientProfile
}

const UserContactDetailsSection = ({ user }: PatientBannerProps) => {
  return (
    <>
      <LabelAndValue
        label="Address"
        value={
          user?.contactDetails?.addresses
            ? getPatientStreet(user.contactDetails.addresses)
            : undefined
        }
      />
      <LabelAndValue
        label="City/State/Zip"
        value={
          user?.contactDetails?.addresses
            ? `${getPatientCity(
                user.contactDetails.addresses,
              )}, ${getPatientState(
                user.contactDetails.addresses,
              )} ${getPatientPostalCode(user.contactDetails.addresses)}`
            : undefined
        }
      />
    </>
  )
}

export { UserContactDetailsSection }
