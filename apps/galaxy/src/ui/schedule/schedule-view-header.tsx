import { DateStepper } from './calendar-view/date-stepper'
import { SchedulerFilterGroup } from './components/header/scheduler-filter-group'
import { Header } from './list-view/header'
import { RoundingViewFilterGroup } from './rounding-view'
import { TabValue } from './types'

const ViewHeader = ({ selectedTab }: { selectedTab: string }) => {
  switch (selectedTab) {
    case TabValue.Calendar:
      return <DateStepper />
    case TabValue.Scheduler:
      return <SchedulerFilterGroup />
    case TabValue.Rounding:
      return <RoundingViewFilterGroup />
    case TabValue.List:
      return <Header />
    default:
      return null
  }
}

export { ViewHeader }
