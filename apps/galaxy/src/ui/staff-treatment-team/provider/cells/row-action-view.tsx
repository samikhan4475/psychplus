'use client'

import { Button, Flex } from '@radix-ui/themes'
import { RefreshLineIcon } from '@/components/icons'

const RowActionView = ({
  patientId,
  onOpen,
}: {
  patientId: number
  onOpen: (patientId: number) => void
}) => {
  return (
    <Flex px="1" py=".5" width="100%">
      <Button
        type="button"
        variant="outline"
        size="1"
        color="gray"
        className="text-pp-black-3 h-5 w-full"
        onClick={() => onOpen(patientId)}
      >
        <RefreshLineIcon className="bg-pp-bg-primary" />
        Change
      </Button>
    </Flex>
  )
}

export { RowActionView }
