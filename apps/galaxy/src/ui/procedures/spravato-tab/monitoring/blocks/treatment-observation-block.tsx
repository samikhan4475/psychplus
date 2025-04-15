import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components'

const TreatmentObservation = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>Treatment Observation & Patient Response</BlockLabel>
      <AutoResizeInput
        field="treatmentAndObservation"
        className="min-h-16 w-[50%]"
      />
      <FormFieldError name="treatmentAndObservation" />
    </Flex>
  )
}

export { TreatmentObservation }
