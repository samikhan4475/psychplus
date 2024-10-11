import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { PatientInfoSchemaType } from '../patient-info-schema'

const GuardianRadio = () => {
  const { register, watch, setValue, unregister } =
    useFormContext<PatientInfoSchemaType>()

  const hasGuardian = watch('hasGuardian')

  return (
    <Flex
      className="bg-pp-bg-accent col-span-2 self-end rounded-1 p-2"
      gap="2"
      justify="between"
      align="center"
    >
      <Text className="text-1" weight="medium">
        Guardian (Do you have a Parent/Guardian?)
      </Text>
      <RadioGroup
        className="bg-white"
        field="hasGuardian"
        onValueChange={(value) => {
          if (value === 'yes') {
            setValue('hasGuardian', true)
            register('guardian')
          } else {
            setValue('hasGuardian', false)
            unregister('guardian')
          }
        }}
        defaultValue={hasGuardian ? 'yes' : 'no'}
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
      />
    </Flex>
  )
}

export { GuardianRadio }
