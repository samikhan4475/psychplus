import { ComponentProps } from 'react'
import { Button } from '@radix-ui/themes'

const ClearFilterButton = ({ onClick }: ComponentProps<typeof Button>) => {
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      type="button"
      className="text-black"
      onClick={onClick}
    >
      Clear
    </Button>
  )
}

export { ClearFilterButton }
