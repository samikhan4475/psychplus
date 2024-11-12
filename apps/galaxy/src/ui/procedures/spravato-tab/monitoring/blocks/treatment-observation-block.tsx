import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, TextAreaInput } from '@/components'

const TreatmentObservation = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>Treatment Observation & Patient Response</BlockLabel>
      <TextAreaInput
        field="treatmentAndObservation"
        className="h- h-16 w-[50%]"
      />
      <FormFieldError name="treatmentAndObservation" />
    </Flex>
  )
}

export { TreatmentObservation }
