import { Button, Flex, IconButton } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'

const FilterButtonGroup = ({ className }: { className?: string }) => {
  return (
    <Flex align="center" className={cn('justify-end gap-x-1.5', className)}>
      <Button
        variant="outline"
        type="button"
        className="h-6 cursor-pointer px-2 text-[12px]  text-[#000000] [box-shadow:inset_0_0_0_0.5px_#B9BBC6]"
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
