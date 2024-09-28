import { Flex } from '@radix-ui/themes'
import { ListViewTable } from './list-view-table'

interface ActiveVisitsListProps {
  staffId: string
  startDate: string
  endDate: string
}

const ActiveVisitsList = (props: ActiveVisitsListProps) => {
  return (
    <Flex direction="column" className="h-full overflow-auto">
      <ListViewTable {...props} />
    </Flex>
  )
}

export { ActiveVisitsList }
