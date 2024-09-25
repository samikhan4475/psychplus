import { Button } from '@radix-ui/themes'
import { cn } from '@/utils'
import { useStore } from '../store'

interface FilterChipsProps {
  value: string
  setValue: (val: string) => void
  filter: string
  filtersList: { [key: string]: string[] }
}

const FilterChip = ({
  value,
  setValue,
  filter,
  filtersList,
}: FilterChipsProps) => {
  const updateTableFilters = useStore((state) => state.updateTableFilters)

  const applyFilter = (filter: string) => () => {
    setValue(filter)
    updateTableFilters(filtersList[filter])
  }

  const applyActiveStyle = (currentVal: string) => {
    if (value === currentVal) return 'bg-pp-focus-bg text-pp-text-primary-base'
    return 'text-black'
  }

  return (
    <Button
      className={cn(filterButtonClasses, applyActiveStyle(filter))}
      color="gray"
      variant="outline"
      onClick={applyFilter(filter)}
    >
      {filter}
    </Button>
  )
}

const filterButtonClasses = 'h-5 rounded-[20px] px-2 py-0.5 text-[12px]'

export { FilterChip }
