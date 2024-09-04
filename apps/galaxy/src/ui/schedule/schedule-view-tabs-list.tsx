import { Button, Tabs } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'
import { cn } from '@/utils'
import { TabValue } from './types'

const tabButtonClasses =
  'text-[12px] data-[state=active]:font-[510] data-[state=active]:before:bg-transparent data-[state=active]:bg-pp-focus-bg data-[state=active]:text-pp-blue text-black h-6 rounded-[2px] data-[state=active]:rounded-[2px] data-[state=active]:text-[12px] px-[0.4px] box-border [box-shadow:inset_0_0_0_0.4px_#B9BBC6]'

const TabsList = ({
  areFiltersHidden,
  setAreFiltersHidden,
}: {
  areFiltersHidden: boolean
  setAreFiltersHidden: (value: boolean) => void
}) => (
  <Tabs.List
    className={cn('items-center gap-x-2 pl-[17px] [box-shadow:none] lg:flex-1')}
  >
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.List}>
      List View
    </Tabs.Trigger>
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.Calender}>
      Calendar View
    </Tabs.Trigger>
    <Tabs.Trigger className={tabButtonClasses} value={TabValue.Scheduler}>
      Scheduler View
    </Tabs.Trigger>
    <Button
      className={cn(
        'text-black h-6 cursor-pointer [box-shadow:inset_0_0_0_0.4px_#9E9898CC]',
        {
          'bg-pp-focus-bg': !areFiltersHidden,
          'text-pp-blue': !areFiltersHidden,
        },
      )}
      variant="outline"
      type="button"
      onClick={() => setAreFiltersHidden(!areFiltersHidden)}
    >
      <ListFilterIcon width={12} height={12} />
      {areFiltersHidden ? 'More Filters' : 'Hide Filters'}
    </Button>
  </Tabs.List>
)

export { TabsList }
