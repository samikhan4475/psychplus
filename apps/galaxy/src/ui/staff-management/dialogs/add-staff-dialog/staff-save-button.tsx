import React from 'react'
import { Button } from '@radix-ui/themes'

const StaffSaveButton = () => {
  return (
    <Button type="submit" size="2" className="ml-auto mt-2 w-fit" highContrast>
      Save
    </Button>
  )
}

export { StaffSaveButton }
