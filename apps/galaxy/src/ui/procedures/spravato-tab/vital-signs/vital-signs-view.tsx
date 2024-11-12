import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldContainer, FormFieldError } from '@/components'
import { AddVitalSigns } from './add-vital-signs'
import { VitalSignsTable } from './vital-signs-table'

const VitalSignsView = () => {
  return (
    <Flex direction="column" gap="2">
      <FormFieldContainer className="flex-row items-center gap-1">
        <BlockLabel className="text-3 font-[600]" required>
          Vital Signs
        </BlockLabel>
        <FormFieldError name="vitalSigns" />
      </FormFieldContainer>
      <VitalSignsTable />
      <AddVitalSigns />
    </Flex>
  )
}

export { VitalSignsView }
