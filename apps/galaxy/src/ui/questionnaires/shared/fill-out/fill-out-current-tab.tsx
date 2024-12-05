import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { Input, Label } from 'react-aria-components'
import { SaveButton } from '../save-button'

type FilloutCurrentTabProps = React.PropsWithChildren<{
  max: number
  value?: number
}>

const FilloutCurrentTab = ({
  max,
  value,
  children,
}: FilloutCurrentTabProps) => {
  return (
    <Flex maxWidth="100%" className="bg-white" px="3" py="1" direction="column">
      <Flex mt="2" direction="column">
        <Flex gap="2">
          <Label>{`${value}/${max}`}</Label>
          <Input
            type="range"
            className="w-[80%]"
            min={0}
            max={max}
            value={value}
            readOnly
          />
        </Flex>
        {children}
      </Flex>
      <Flex gap="2" justify="end" mt="2">
        <Button
          size="1"
          color="gray"
          variant="surface"
          highContrast
          className="h-auto p-2 text-[12px] font-[500]"
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          Request Patient to Fill
        </Button>
        <SaveButton isGhost />
      </Flex>
    </Flex>
  )
}

export { FilloutCurrentTab }
