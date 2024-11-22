import React from 'react'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'

const SaveStaffButton = () => {
  return (
    <Button className="ml-auto" type="submit" size="1" highContrast>
      <SaveIcon width="16" className="mr-1" /> Save
    </Button>
  )
}

export { SaveStaffButton }
