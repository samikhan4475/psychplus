import { Button } from '@radix-ui/themes'

const HideFiltersButton = ({
  onClick,
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      size="1"
      variant="ghost"
      className="text-pp-text-primary-base text-[12px]"
      onClick={onClick}
    >
      Hide Filters
    </Button>
  )
}

export { HideFiltersButton }
