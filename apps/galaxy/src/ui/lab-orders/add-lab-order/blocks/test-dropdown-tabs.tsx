import * as Tabs from '@radix-ui/react-tabs'
import { AllTestLists } from './all-tests-lists'
import { TestLabsType } from './types'

const TestDropdownTabs = ({
  onClickTestLabItem,
}: {
  onClickTestLabItem: (value: TestLabsType) => void
}) => {
  return (
    <Tabs.Root defaultValue="favorites" className="w-full">
      <Tabs.List className="flex">
        <Tabs.Trigger
          value="favorites"
          className="data-[state=active]:bg-pp-focus-bg border-pp-focus-bg w-full rounded-1 border py-2 text-1 data-[state=active]:font-bold"
        >
          Favorites
        </Tabs.Trigger>
        <Tabs.Trigger
          value="all"
          className="border-pp-focus-bg data-[state=active]:bg-pp-focus-bg w-full rounded-1 border py-2 text-1 data-[state=active]:font-bold"
        >
          All
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="favorites">
        <AllTestLists
          onClickTestLabItem={onClickTestLabItem}
          isIncludeDefaultOnly
        />
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="all">
        <AllTestLists onClickTestLabItem={onClickTestLabItem} />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export { TestDropdownTabs }
