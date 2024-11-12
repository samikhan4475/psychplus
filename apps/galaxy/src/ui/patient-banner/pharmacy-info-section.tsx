import { Text } from '@radix-ui/themes'
import { searchPharmaciesAction } from '../pharmacy/actions'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  patientId: string
}

const PharmacyInfoSection = async ({ patientId }: PatientBannerProps) => {
  const response = await searchPharmaciesAction(patientId, {
    isOnlyDefaults: true,
  })
  if (response.state === 'error') return <Text>{response?.error}</Text>

  const pharmacy = response.data[0] ?? {}
  const pharmacyAddress = pharmacy.pharmacyContactDetails?.addresses?.[0] ?? {}

  return (
    <>
      <LabelAndValue label="Pharmacy Name" value={pharmacy.pharmacyName} />
      <LabelAndValue label="Pharmacy Address" value={pharmacyAddress.street1} />
      <LabelAndValue
        label="Pharm City/State/Zip"
        value={
          pharmacyAddress.city
            ? `${pharmacyAddress.city}/${pharmacyAddress.state}/${pharmacyAddress.postalCode}`
            : undefined
        }
      />
    </>
  )
}

export { PharmacyInfoSection }
