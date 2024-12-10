'use client'

import { Button } from '@radix-ui/themes'

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => void
}
const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Button onClick={onClick} size="2" color="red">
      Delete
    </Button>
  )
}

export { DeleteButton }
