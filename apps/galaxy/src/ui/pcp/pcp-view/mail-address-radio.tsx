import { Flex } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel, RadioGroup } from '@/components'

const MailAddressRadio = () => {
  return (
    <FormFieldContainer>
      <Flex align="center" mt="3" className=" col-span-2 py-4">
        <Flex className="bg-pp-bg-accent self-end rounded-2 p-2" gap="2">
          <FormFieldLabel className="text-[12px]">
            Is your mailing address same as office?
          </FormFieldLabel>
          <RadioGroup
            className="bg-white"
            field="isMailingAddressSameAsHome"
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
        </Flex>
      </Flex>
    </FormFieldContainer>
  )
}

export { MailAddressRadio }
