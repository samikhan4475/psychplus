import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CheckboxCell } from '@/components'

interface CoordinateData {
  x?: number
  y?: number
}

interface TooltipDataProps {
  active: boolean | undefined
  payload: any
  coordinate: CoordinateData | undefined
  showTooltip: boolean | undefined
}

const TooltipData = ({
  active,
  payload,
  coordinate,
  showTooltip,
}: TooltipDataProps) => {
  if (active && payload && coordinate && showTooltip) {
    const { totalScore, createdOn, addToNote } = payload?.[0]?.payload || {}
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{
          position: 'absolute',
          left: `${coordinate.x}px`,
          top: `${coordinate.y}px`,
          transform: 'translate(-50%, -115%)',
        }}
        className="text-white bg-black border-black w-[200px] rounded-2 p-2"
      >
        <Text>{`Score: ${totalScore}`}</Text>
        <Text>{createdOn}</Text>
        <Flex className="text-black mt-1 rounded-2 bg-[#EBF3FC] p-1">
          <CheckboxCell
            label="Add to Note"
            className="px-[9px] font-[500]"
            checked={addToNote}
            onCheckedChange={() => []}
          />
        </Flex>
      </Flex>
    )
  }
  return null
}

export { TooltipData }
