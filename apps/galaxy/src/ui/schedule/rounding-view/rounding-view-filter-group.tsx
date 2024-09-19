import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { cn } from '@/utils'
import { useStore } from '../store'
import { TABLE_FILTERS, TableFilters } from './constants'

const RoundingViewFilterGroup = () => {
  const updateTableFilters = useStore((state) => state.updateTableFilters)
  const [activeFilter, setActiveFilter] = useState<string>(TableFilters.All)

  const applyFilter = (activeFilter: string) => () => {
    setActiveFilter(activeFilter)
    updateTableFilters(TABLE_FILTERS[activeFilter])
  }

  const applyToggleBackground = (value: string) => {
    if (value === activeFilter)
      return 'bg-pp-focus-bg text-pp-text-primary-base'
    return 'text-black'
  }

  return (
    <Flex gap="3" className="flex-1" justify="end" pr="3">
      <Button
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.All),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.All)}
      >
        {TableFilters.All}
      </Button>
      <Button
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.Intake),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.Intake)}
      >
        {TableFilters.Intake}
      </Button>
      <Button
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.CSS),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.CSS)}
      >
        {TableFilters.CSS}
      </Button>
      <Button
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.RevCycle),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.RevCycle)}
      >
        {TableFilters.RevCycle}
      </Button>
      <Button
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.Provider),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.Provider)}
      >
        {TableFilters.Provider}
      </Button>
      <Button
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.BA),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.BA)}
      >
        {TableFilters.BA}
      </Button>
    </Flex>
  )
}

const filterButtonClasses = 'h-5 rounded-[20px] px-2 py-0.5 text-[12px]'

export { RoundingViewFilterGroup }
