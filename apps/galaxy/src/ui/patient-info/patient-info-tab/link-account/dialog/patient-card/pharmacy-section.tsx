import { useEffect, useState } from 'react'
import { searchPharmaciesAction } from '@/ui/pharmacy/actions'
import { Pharmacy } from '@/ui/pharmacy/types'
import { LabelAndValue } from './label-and-value'

interface PatientCardPharmacySectionProps {
  patientId: string
}

const PatientCardPharmacySection = ({
  patientId,
}: PatientCardPharmacySectionProps) => {
  const [pharmacyResponse, setPharmacyResponse] = useState<Pharmacy>()

  const fetchPatientPharmaciesDetails = async () => {
    const pharmarcy = await searchPharmaciesAction(patientId, {
      isOnlyDefaults: true,
    })
    if (pharmarcy.state === 'success') {
      setPharmacyResponse(pharmarcy.data[0])
    }
  }
  useEffect(() => {
    fetchPatientPharmaciesDetails()
  }, [patientId])

  const pharmacyAddress = pharmacyResponse?.pharmacyContactDetails
    ?.addresses?.[0] ?? {
    type: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  }
  return (
    <>
      <LabelAndValue label="Pharmacy Name" value={'NA'} />
      <LabelAndValue
        label="Pharmacy Address"
        value={pharmacyAddress?.street1}
      />
      <LabelAndValue
        label="Pharm City/State/Zip"
        value={
          pharmacyAddress?.city
            ? `${pharmacyAddress.city}/${pharmacyAddress.state}/${pharmacyAddress.postalCode}`
            : undefined
        }
      />
    </>
  )
}

export { PatientCardPharmacySection }
