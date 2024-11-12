import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  TextInput,
} from '@/components'
import { DoseAdministeredField } from './dose-administered-field'
import { SectionHeading } from './section-heading'

const DosingSection = () => {
  return (
    <FormFieldContainer className="bg-white mt-2 p-2.5 shadow-2">
      <SectionHeading title="Dosing" />

      <Flex gap="4">
        <TextInput
          label="Treatment Number"
          field="treatmentNumber"
          required={true}
          disabled
        />
        <DoseAdministeredField />
        <Flex direction="row" gap="1">
          <BlockLabel required>Lot Number</BlockLabel>
          <TextInput label="" field="lotNumber" />
          <FormFieldError name="lotNumber" />
        </Flex>
      </Flex>
    </FormFieldContainer>
  )
}

export { DosingSection }
