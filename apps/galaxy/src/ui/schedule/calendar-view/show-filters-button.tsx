import { Button } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'

const ShowFiltersButton = ({
  onClick,
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type='button'
      className="text-black text-[12px]"
      onClick={onClick}
    >
      <ListFilterIcon width={12} height={12} />
      More Filters
    </Button>
  )
}

export { ShowFiltersButton }
