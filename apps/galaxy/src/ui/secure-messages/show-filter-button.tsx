import { Button } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'
import { cn } from '@/utils'

const ShowFiltersButton = ({
  onClick,
  showFilter,
}: {
  onClick: () => void
  showFilter: boolean
}) => {
  return (
    <Button
      size="1"
      variant="outline"
      className={cn(
        '  w-[68px] border-none text-[12px] outline-none [box-shadow:none] ',
        showFilter
          ? 'bg-pp-focus-bg text-pp-link-text border-pp-focus-outline border border-solid'
          : 'text-black   border-pp-grey border border-solid  bg-transparent',
      )}
      onClick={onClick}
    >
      <ListFilterIcon className="h-[12px] w-[12px]" />
      Filters
    </Button>
  )
}
export { ShowFiltersButton }
