import { Flex } from '@radix-ui/themes'
import { AdditivesDropDown } from './additives-dropdown'
import { CollectionMethodDropDown } from './collection-method-dropdown'

const AdditivesAndCollectionRow = ({ index }: { index: number }) => {
  return (
    <Flex direction="row" gap="3" className="w-[100%]">
      <AdditivesDropDown index={index} />
      <CollectionMethodDropDown index={index} />
    </Flex>
  )
}

export { AdditivesAndCollectionRow }
