'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'

const SaveButton = () => {
  return (
    <Button size="1" type="submit"  highContrast>
      <SaveIcon height={14} width={14} strokeWidth={2} />
      Save
    </Button>
  )
}

export { SaveButton }

