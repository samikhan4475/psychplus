import { DayHeader } from './day-header'
import { ProvidersAccordionMenu } from './providers-accordion-menu'
import { PROVIDERS } from './pseudo-data'

const SchedulerViewContent = () => {
  return (
    <>
      <DayHeader />
      <ProvidersAccordionMenu providers={PROVIDERS} />
    </>
  )
}

export { SchedulerViewContent }
