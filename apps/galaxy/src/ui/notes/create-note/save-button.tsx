'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'

const SaveButton = () => (
  <Button
    type="submit"
    size="1"
    variant="outline"
    color="gray"
    className="text-black"
  >
    <SaveIcon width={15} height={15} strokeWidth={1.75} />
    Save
  </Button>
)

export { SaveButton }
