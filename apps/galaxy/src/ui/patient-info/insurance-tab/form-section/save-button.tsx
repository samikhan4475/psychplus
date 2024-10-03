'use client'

import { Button } from '@radix-ui/themes'
import { Save } from 'lucide-react'

interface SaveButtonProps {
  disabled?: boolean
}

const SaveButton = ({ disabled }: SaveButtonProps) => {
  return (
    <Button
      variant="outline"
      color="gray"
      className="text-black"
      type="submit"
      size="1"
      disabled={disabled}
    >
      <Save size={14} /> Save
    </Button>
  )
}

export { SaveButton }
