import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  Flex,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { LabOrderSchemaType } from '../lab-order-schema'
import { SearchedItem } from './searched-item'
import { TestLabsType } from './types'

const AddTestLabsDropDown = ({
  getSearchedTestLabs,
  testLabsList,
  onClickTestLabItem,
  loading,
  isFormDisabled,
}: {
  testLabsList: TestLabsType[]
  getSearchedTestLabs: (value: string) => void
  onClickTestLabItem: (value: TestLabsType) => void
  loading: boolean
  isFormDisabled: boolean
}) => {
  const form = useFormContext<LabOrderSchemaType>()

  const selectedTestLabList = form.watch('testLabs')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSearchedTestLabs(e.target.value)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={isFormDisabled}>
        <PlusIcon className='cursor-pointer'/>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-[386px]">
        <Flex
          align="center"
          className="bg-white relative h-[48px] w-[100%] rounded-2"
        >
          <MagnifyingGlassIcon
            className="text-pp-gray-3 absolute left-2 "
            width="18px"
            height="18px"
          />
          <TextField.Root
            size="1"
            placeholder="Search"
            className="w-full pl-6"
            onChange={handleChange}
          />
        </Flex>

        <Separator className="w-full" />
        <Flex direction="column" gap="2" mt="2">
          <Text className="text-pp-gray-3 text-1 font-[600]">Lab Names</Text>

          {loading ? (
            <LoadingPlaceholder />
          ) : (
            testLabsList.length > 0 &&
            testLabsList.map((item: TestLabsType) => (
              <SearchedItem
                key={item.id}
                title={`${item?.testCode ?? ''} - ${item?.testName ?? ''}`}
                onClick={() => onClickTestLabItem(item)}
                disabled={
                  selectedTestLabList &&
                  selectedTestLabList.length > 0 &&
                  selectedTestLabList.find(
                    (e: any) => e?.labTestCode === item?.labTestCode,
                  ) !== undefined
                }
              />
            ))
          )}
        </Flex>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { AddTestLabsDropDown }
