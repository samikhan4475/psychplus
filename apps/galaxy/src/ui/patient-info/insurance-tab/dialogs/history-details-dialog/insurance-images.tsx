'use client'

import { Flex } from '@radix-ui/themes'
import { ImageCard } from '../../shared'
import { useStore } from './store'

interface InsuranceImagesProps {
  patientId: string
  policyId: string
}
const InsuranceImages = ({ patientId, policyId }: InsuranceImagesProps) => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))
  return (
    <Flex gap="2" className="col-span-full" direction="column">
      {selectedRow?.hasCardFrontImage && (
        <ImageCard
          savedImg={`/ehr/api/patients/${patientId}/policies/${policyId}/cardimage/front`}
          title="Insurance Photo Front"
          noControls
        />
      )}
      {selectedRow?.hasCardBackImage && (
        <ImageCard
          savedImg={`/ehr/api/patients/${patientId}/policies/${policyId}/cardimage/back`}
          title="Insurance Photo Back"
          noControls
        />
      )}
    </Flex>
  )
}

export { InsuranceImages }
