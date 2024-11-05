import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { FormFieldContainer, LoadingPlaceholder, TextInput } from '@/components'
import { DoseAdministeredField } from './dose-administered-field'
import { SectionHeading } from './section-heading'

interface DosingSectionProps {
  loading: boolean
  error?: string
}
const DosingSection = ({ loading, error }: DosingSectionProps) => {
  return (
      <FormFieldContainer className='bg-white mt-2 p-2.5 shadow-2'>
        <SectionHeading title="Dosing" />
        {loading && (
          <Flex align="center" justify="center" style={{ height: `200px` }}>
            <LoadingPlaceholder />
          </Flex>
        )}
        {error && <Text>{error}</Text>}
        {!loading && !error && (
          <Flex gap="4">
            <TextInput
              label="Treatment Number"
              field="treatmentNumber"
              required={true}
              disabled
            />
            <DoseAdministeredField />
            <TextInput label="Lot Number" field="lotNumber" required={true} />
          </Flex>
        )}
      </FormFieldContainer>
  )
}

export { DosingSection }
