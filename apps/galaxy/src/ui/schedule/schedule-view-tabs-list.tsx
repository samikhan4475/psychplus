import { Tabs } from '@radix-ui/themes'
import { cn } from '@/utils'
import { TabValue } from './types'

const tabButtonClasses =
  'text-[12px] data-[state=active]:font-[510] data-[state=active]:before:bg-transparent data-[state=active]:bg-pp-focus-bg data-[state=active]:text-pp-blue text-black h-6 rounded-[2px] data-[state=active]:rounded-[2px] data-[state=active]:text-[12px] px-[0.4px] box-border [box-shadow:inset_0_0_0_0.4px_#B9BBC6]'

const TabsList = () => (
  <Tabs.List
    className={cn('items-center gap-x-2 pl-[17px] [box-shadow:none]')}
  >
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.List}>
      List View
    </Tabs.Trigger>
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.Calendar}>
      Calendar View
    </Tabs.Trigger>
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.Scheduler}>
      Scheduler
    </Tabs.Trigger>
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.ProviderCoding}>
      Provider Coding
    </Tabs.Trigger>
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.Rounding}>
      Rounding
    </Tabs.Trigger>
  </Tabs.List>
)

export { TabsList }
