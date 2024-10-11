import { useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'

const DateTime = (props: any) => {
  const { x, y, payload } = props
  const [hovered, setHovered] = useState(false)

  const [date, time] = payload.value.split(' ')

  return (
    <g
      transform={`translate(${x},${y})`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill={hovered ? '#194195' : 'black'}
        className={`text-[10px] ${hovered && 'underline'} font-[500]`}
      >
        <tspan x={0} dy={0}>
          {date}
        </tspan>
        <tspan x={-10} dy={15}>
          {time}
        </tspan>
      </text>

      {hovered && (
        <foreignObject x={-50} y={25} width={100} height={50}>
          <Flex
            direction="column"
            className="bg-black text-white rounded-md relative rounded-3 px-3 py-1 text-center"
            role="tooltip"
          >
            <Text size="1" className="text-white">
              View Answers
            </Text>
          </Flex>
        </foreignObject>
      )}
    </g>
  )
}

export { DateTime }
