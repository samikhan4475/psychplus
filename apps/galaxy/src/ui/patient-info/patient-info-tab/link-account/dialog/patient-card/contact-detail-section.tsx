import { PatientProfile } from '@/types'
import {
  getPatientCity,
  getPatientPostalCode,
  getPatientState,
  getPatientStreet,
  getPatientZipLast4,
} from '@/utils'
import { LabelAndValue } from './label-and-value'

interface PatientCardContactProps {
  patient?: PatientProfile
}

const PatientContactDetailsSection = ({ patient }: PatientCardContactProps) => {
  return (
    <>
      <LabelAndValue
        label="Address"
        value={
          patient?.contactDetails.addresses
            ? getPatientStreet(patient.contactDetails.addresses)
            : undefined
        }
      />
      <LabelAndValue
        label="City/State/Zip/Area Code"
        value={
          patient?.contactDetails.addresses
            ? `${getPatientCity(
                patient.contactDetails.addresses,
              )}, ${getPatientState(
                patient.contactDetails.addresses,
              )} ${getPatientPostalCode(
                patient.contactDetails.addresses,
              )} ${getPatientZipLast4(patient.contactDetails.addresses)}`
            : undefined
        }
      />
    </>
  )
}

export { PatientContactDetailsSection }
