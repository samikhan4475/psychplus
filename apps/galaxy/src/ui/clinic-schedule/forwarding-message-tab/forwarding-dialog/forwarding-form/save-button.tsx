'use client'

import { Box, Button } from '@radix-ui/themes'

const SaveButton = () => {
  return (
    <Box className="col-span-5 ml-auto">
      <Button size="2" highContrast type="submit">
        Save
      </Button>
    </Box>
  )
}

export { SaveButton }
