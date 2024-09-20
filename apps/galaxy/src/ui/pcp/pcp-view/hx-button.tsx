'use client'

import { Button } from '@radix-ui/themes'

const HxButton = ({ toggleOpen }: { toggleOpen(): void }) => (
  <Button
    type="submit"
    size="1"
    variant="outline"
    color="gray"
    className="text-black"
    onClick={toggleOpen}
  >
    Hx
  </Button>
)

export { HxButton }
