import { Button } from '@radix-ui/themes'

const SortByEndDateButton = ({
  sortByEndDate,
}: {
  sortByEndDate: () => void
}) => {
  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={sortByEndDate}
    >
      Sort by end date recent
    </Button>
  )
}

export { SortByEndDateButton }
