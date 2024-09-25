import { Flex, ScrollArea } from '@radix-ui/themes'
import { ListViewFilterCard } from './list-view-filter-card'
import { ListViewTable } from './list-view-table'

const ListView = () => {
  return (
    <Flex direction="column" className="h-full overflow-auto">
      <ScrollArea className="flex-1">
        <Flex direction="column" className="flex-1">
          <ListViewFilterCard />
          <ListViewTable />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { ListView }
