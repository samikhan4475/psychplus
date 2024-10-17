import { Flex } from '@radix-ui/themes'
import { DateStepper } from './calendar-view/date-stepper'
import { Header } from './list-view/header'
import { DateStepper as ProviderCodingViewDateStepper } from './provider-coding/filter-fields/provider-coding-date-stepper'
import { RoundingViewFilterGroup } from './rounding-view'
import { DateStepper as SchedulerDateStepper } from './scheduler-view/date-stepper'
import { TabValue } from './types'

const ViewHeader = ({ selectedTab }: { selectedTab: string }) => {
  switch (selectedTab) {
    case TabValue.Calendar:
      return <DateStepper />
    case TabValue.Scheduler:
      return (
        <Flex align="center" flexGrow="1">
          <SchedulerDateStepper />
        </Flex>
      )
    case TabValue.Rounding:
      return <RoundingViewFilterGroup />
    case TabValue.List:
      return <Header />
    case TabValue.ProviderCoding:
      return <ProviderCodingViewDateStepper />
    default:
      return null
  }
}

export { ViewHeader }
