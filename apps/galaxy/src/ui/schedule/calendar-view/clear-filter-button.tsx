import { Button } from '@radix-ui/themes'

const ClearFilterButton = () => {
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      className="text-black"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      Clear
    </Button>
  )
}

export { ClearFilterButton }
