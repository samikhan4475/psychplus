import { Button } from '@radix-ui/themes'
import { ComponentProps } from 'react'

const SaveSettingsButton = ({ onClick }: ComponentProps<typeof Button>) => {
  return (
    <Button
      size="1"
      variant="outline"
      type='button'
      color="gray"
      className="text-black"
      onClick={onClick}
    >
      Save Selection
    </Button>
  )
}

export { SaveSettingsButton }
