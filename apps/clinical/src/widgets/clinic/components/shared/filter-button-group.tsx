import { Button, Flex, IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import { useFilterVisibilityContext } from '../../context'

const FilterButtonGroup = ({ className }: { className?: string }) => {
  const hideFilters = useFilterVisibilityContext()
  return (
    <Flex align="center" className={cn('justify-end gap-x-1.5', className)}>
      <Button
        variant="outline"
        type="button"
        className="h-6 cursor-pointer px-0 text-[12px] text-[#194595] [box-shadow:none]"
        onClick={() => hideFilters(true)}
      >
        Hide Filters
      </Button>
      <Button
        variant="outline"
        type="button"
        className="h-6 cursor-pointer px-2 text-[12px] font-[510] text-[#000000] [box-shadow:inset_0_0_0_0.5px_#B9BBC6]"
      >
        Clear
      </Button>
      <IconButton
        variant="outline"
        type="submit"
        className="h-6 cursor-pointer bg-[#151B4A] text-[#FFF] [box-shadow:none]"
      >
        <SearchIcon width={14} height={14} />
      </IconButton>
    </Flex>
  )
}

export { FilterButtonGroup }
