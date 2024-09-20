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
        '  w-[66px] border-none text-[12px] outline-none [box-shadow:none] ',
        showFilter
          ? 'bg-pp-focus-bg text-pp-link-text [border:1px_solid_#8DA4EF] '
          : ' text-black   bg-transparent [border:1px_solid_#DDDDE3]',
      )}
      onClick={onClick}
    >
      <ListFilterIcon width={10} height={10} />
      Filters
    </Button>
  )
}
export { ShowFiltersButton }
