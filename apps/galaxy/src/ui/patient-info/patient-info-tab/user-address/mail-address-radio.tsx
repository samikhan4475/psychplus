import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { PatientInfoSchemaType } from '../patient-info-schema'

const MailAddressRadio = () => {
  const { watch, setValue } = useFormContext<PatientInfoSchemaType>()

  return (
    <Flex
      className="bg-pp-bg-accent self-end rounded-2"
      px="2"
      gap="2"
      align="center"
    >
      <Text className="text-[12px]" weight="bold">
        Is your mailing address same as Primary?
      </Text>
      <RadioGroup
        className="bg-white"
        field="isMailingAddressSameAsPrimary"
        defaultValue={
          watch('contactDetails.isMailingAddressSameAsPrimary') ? 'Yes' : 'No'
        }
        onValueChange={(val) => {
          setValue(
            'contactDetails.isMailingAddressSameAsPrimary',
            val === 'Yes',
          )
        }}
        options={[
          { label: 'No', value: 'No' },
          { label: 'Yes', value: 'Yes' },
        ]}
      />
    </Flex>
  )
}

export { MailAddressRadio }
