'use client'

import { Button, Flex } from '@radix-ui/themes'

const SmartFilters = () => {
  return (
    <Flex justify="end" flexGrow="1" gap="2">
      <Button
        size="1"
        variant="outline"
        className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        TMS
      </Button>
      <Button
        size="1"
        variant="outline"
        className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        Spravato
      </Button>
      <Button
        size="1"
        variant="outline"
        className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        Therapy (individual)
      </Button>
      <Button
        size="1"
        variant="outline"
        className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        Psychiatry
      </Button>
    </Flex>
  )
}

export { SmartFilters }
