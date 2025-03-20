import { PlusIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from '@radix-ui/themes'
import { TestDropdownTabs } from './test-dropdown-tabs'
import { TestLabsType } from './types'

const AddTestLabsDropDown = ({
  onClickTestLabItem,
  isFormDisabled,
}: {
  onClickTestLabItem: (value: TestLabsType) => void

  isFormDisabled: boolean
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={isFormDisabled}>
        <PlusIcon className="cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-[386px]">
        <TestDropdownTabs onClickTestLabItem={onClickTestLabItem} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { AddTestLabsDropDown }
