import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../schema'

const GuardianRadio = () => {
  const form = useFormContext<SchemaType>()
  const value = form.watch('hasGuardian')

  return (
    <Flex
      className="bg-pp-bg-accent col-span-2 self-end rounded-1 p-2"
      gap="2"
      justify="between"
      align="center"
    >
      <Text size="1" weight="medium">
        Does the patient have a parent, guardian, or legal representative?
      </Text>

      <RadixRadioGroup.Root
        onValueChange={(value) => {
          form.setValue('hasGuardian', value)
        }}
        value={value}
        className="flex items-center gap-1.5"
      >
        <RadixRadioGroup.Item
          className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
          value="yes"
          id="radio-option-yes"
        >
          <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
        </RadixRadioGroup.Item>
        <Text
          className="cursor-pointer"
          weight="medium"
          htmlFor="radio-option-yes"
          as="label"
          size="1"
        >
          Yes
        </Text>

        <RadixRadioGroup.Item
          className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
          value="no"
          id="radio-option-no"
        >
          <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
        </RadixRadioGroup.Item>
        <Text
          className="cursor-pointer"
          weight="medium"
          htmlFor="radio-option-no"
          as="label"
          size="1"
        >
          No
        </Text>
      </RadixRadioGroup.Root>
    </Flex>
  )
}

export { GuardianRadio }
