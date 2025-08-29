'use client'

import { Button, Checkbox, Flex, TextFieldInput } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components-v2'

function GuardianDetails() {
  return (
    <Flex direction="column" gap="2">
      <Flex direction="row" gap="2" align="start">
        <Checkbox id="terms-and-conditions-checkbox" size="3" highContrast />
        <FormFieldLabel className="text-[14px] font-[400]">
          I am the above mentioned patient or guardian of the patient and I
          agree to electronically sign all{' '}
          <Button
            className="bg-transparent px-2 pt-[5px]"
            type="button"
            variant="ghost"
          >
            Policies
          </Button>
        </FormFieldLabel>
      </Flex>
      <Flex align="center" justify="between" gap="2" width="100%">
        <Flex direction="column" gap="1" width="100%">
          <FormFieldLabel required>Guardian First Name</FormFieldLabel>
          <TextFieldInput
            size="3"
            placeholder="First Name"
            className="w-full"
          />
        </Flex>
        <Flex direction="column" gap="1" width="100%">
          <FormFieldLabel required>Guardian Last Name</FormFieldLabel>
          <TextFieldInput size="3" placeholder="Last Name" className="w-full" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GuardianDetails
