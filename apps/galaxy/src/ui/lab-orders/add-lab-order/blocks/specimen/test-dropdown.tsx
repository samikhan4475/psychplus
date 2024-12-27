import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { LabOrderSchemaType } from '../../lab-order-schema'

const TestDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].TestId`
  const form = useFormContext<LabOrderSchemaType>()
  const testLabs = form.getValues('testLabs')
  const specimenList = form.watch('specimenList')

  const getOptions = () =>
    testLabs.length > 0
      ? testLabs
          .filter((item) => !item.isNewTestLab)
          .map((item) => ({
            label: item?.testName ?? '',
            value: item?.id ?? '',
          }))
      : []

  return (
    <Flex direction="column" gap="1" width="50%">
      <BlockLabel required>Test</BlockLabel>
      <SelectInput
        field={field}
        options={getOptions()}
        buttonClassName="w-[100%] h-7"
        disabled={!specimenList[index]?.newSpecimen}
      />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { TestDropDown }
