import { Flex } from '@radix-ui/themes'
import { TestDropDown } from './test-dropdown'
import { TypeDropDown } from './type-dropdown'

const TestAndTypeRow = ({ index }: { index: number }) => {
  return (
    <Flex direction="row" gap="3" className="w-[100%]">
      <TestDropDown index={index} />
      <TypeDropDown index={index} />
    </Flex>
  )
}

export { TestAndTypeRow }
