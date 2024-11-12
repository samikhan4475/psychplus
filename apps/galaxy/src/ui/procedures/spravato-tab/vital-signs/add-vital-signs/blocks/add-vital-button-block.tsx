import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import { TREATMENT_STATUS, VitalTreatmentConfigType } from '../types'
import { TreatmentStatus } from './treatment-status-block'
import { VitalSignsAddPopup } from './vital-signs-add-popup-block'

const AddVitalButton = ({
  showMessage,
  treatmentLabel,
  information,
  treatmentStatus = TREATMENT_STATUS.Info,
  disabled,
  generateVitalButtons,
}: VitalTreatmentConfigType & {
  disabled: boolean
  generateVitalButtons: (vitalSigns: []) => void
}) => (
  <>
    <Flex direction="row" gap="1" align="center">
      <BlockLabel required>{treatmentLabel}</BlockLabel>
      <VitalSignsAddPopup
        disabled={disabled}
        generateVitalButtons={generateVitalButtons}
      />
    </Flex>
    {showMessage && (
      <TreatmentStatus status={treatmentStatus} message={information ?? ''} />
    )}
  </>
)

export { AddVitalButton }
