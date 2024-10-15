import { Button } from '@radix-ui/themes'

const ClearAction = ({
  onClear,
}: {
  onClear: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => (
  <Button
    color="gray"
    className="text-black"
    size="1"
    variant="outline"
    type="button"
    onClick={onClear}
  >
    Clear
  </Button>
)

export { ClearAction }
