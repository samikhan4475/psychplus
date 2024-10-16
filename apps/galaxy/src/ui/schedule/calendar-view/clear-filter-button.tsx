import { Button } from '@radix-ui/themes'
import { ComponentProps } from 'react'

const ClearFilterButton = ({ onClick }: ComponentProps<typeof Button>) => {
  return (
    <Button
      size="1"
      variant="outline"
      type='button'
      color="gray"
      className="text-black"
      onClick={onClick}
    >
      Clear
    </Button>
  )
}

export { ClearFilterButton }
