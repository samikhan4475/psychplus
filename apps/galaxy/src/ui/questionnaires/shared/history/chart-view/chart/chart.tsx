import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { QuickNoteHistory } from '@/types'
import { DateTime } from './date-time'
import { TooltipData } from './tooltip-data'

interface ChartProps {
  data: QuickNoteHistory[]
}

const Chart = ({ data }: ChartProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <ResponsiveContainer width="100%" height={400} className="-ml-[50px]">
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 40 }}>
        <ReferenceArea y1={20} y2={27} fill="rgba(229, 72, 77, 0.2)" />
        <ReferenceArea y1={10} y2={20} fill="rgba(253, 255, 0, 0.2)" />
        <ReferenceArea y1={5} y2={10} fill="rgba(48, 164, 108, 0.2)" />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="createdOn"
          interval={0}
          tickMargin={10}
          tickSize={10}
          axisLine={false}
          tick={<DateTime />}
        />
        <YAxis
          domain={[0, 27]}
          ticks={[
            '0.0',
            '2.5',
            '5.0',
            '7.5',
            '10.0',
            '12.5',
            '15.0',
            '17.5',
            '20.0',
            '22.5',
            '25.0',
            '27.0',
          ]}
          interval={0}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={({ active, payload, coordinate }) =>
            TooltipData({
              active,
              payload,
              coordinate,
              showTooltip,
            })
          }
          cursor={false}
          filterNull={true}
          active={showTooltip}
        />
        <Line
          type="monotone"
          dataKey="totalScore"
          stroke="black"
          strokeWidth={3}
          dot={{
            r: 5,
            fill: 'black',
            onMouseEnter: () => setShowTooltip(true),
            onMouseLeave: () => setShowTooltip(false),
          }}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export { Chart }
