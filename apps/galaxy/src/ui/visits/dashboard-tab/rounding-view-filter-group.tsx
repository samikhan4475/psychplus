import { Button, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { TableFilters } from '../constants'

const RoundingViewFilterGroup = ({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter?: string
  setActiveFilter: (activeFilter: string) => void
}) => {
  const form = useFormContext()

  const applyFilter = (activeFilter: string) => () => {
    if (form.watch('dateFrom') || form.watch('dateTo')) {
      form.resetField('dateFrom')
      form.resetField('dateTo')
    }
    setActiveFilter(activeFilter)
  }

  const applyToggleBackground = (value: string) => {
    if (value === activeFilter) {
      return 'bg-pp-focus-bg text-pp-text-primary-base'
    }
    return 'text-black'
  }

  return (
    <Flex gap="3" pr="3" align="center" justify="start">
      <Button
        type="button"
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.Today),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.Today)}
      >
        {TableFilters.Today}
      </Button>
      <Button
        type="button"
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.LastThirtyDays),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.LastThirtyDays)}
      >
        {TableFilters.LastThirtyDays}
      </Button>
      <Button
        type="button"
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.LastNinetyDays),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.LastNinetyDays)}
      >
        {TableFilters.LastNinetyDays}
      </Button>
      <Button
        type="button"
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.LastMonth),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.LastMonth)}
      >
        {TableFilters.LastMonth}
      </Button>
      <Button
        type="button"
        className={cn(
          filterButtonClasses,
          applyToggleBackground(TableFilters.LastQuarter),
        )}
        color="gray"
        variant="outline"
        onClick={applyFilter(TableFilters.LastQuarter)}
      >
        {TableFilters.LastQuarter}
      </Button>
    </Flex>
  )
}

const filterButtonClasses = 'h-5 rounded-[20px] px-2 py-0.5 text-[12px]'

export { RoundingViewFilterGroup }
