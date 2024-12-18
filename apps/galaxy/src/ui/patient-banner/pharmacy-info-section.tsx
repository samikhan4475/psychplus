import { Pharmacy } from '../pharmacy/types'
import { LabelAndValue } from './label-and-value'

interface PharmacyInfoSectionProps {
  pharmacy: Pharmacy
}

const PharmacyInfoSection = ({ pharmacy }: PharmacyInfoSectionProps) => {
  const pharmacyAddress = pharmacy?.pharmacyContactDetails?.addresses?.[0] ?? {}

  return (
    <>
      <LabelAndValue label="Pharmacy Name" value={pharmacy?.pharmacyName} />
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

export { PharmacyInfoSection }
