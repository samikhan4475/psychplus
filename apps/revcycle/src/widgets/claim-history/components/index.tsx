'use client'

import { useState } from 'react'
import { Box, Button } from '@radix-ui/themes'
import { HistoryDialog } from './dialog'

const WidgetScreen = () => {
  const [open, setOpen] = useState<boolean>(false)
  const setDialogOpen = (flag: boolean) => {
    setOpen(flag)
  }

  return (
    <Box m="7">
      <Box className="text-right">
        <Button
          color="gray"
          variant="solid"
          highContrast
          onClick={() => setDialogOpen(true)}
        >
          Hx
        </Button>
      </Box>
      <HistoryDialog open={open} setDialogOpen={setDialogOpen} />
    </Box>
  )
}

export { WidgetScreen }
