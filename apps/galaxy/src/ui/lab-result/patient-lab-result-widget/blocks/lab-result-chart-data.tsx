import type React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatDate } from '@/utils'

interface IQueryResult {
  date: string
  value: number
  unit: string
  recommendedMin?: number
  recommendedMax?: number
}

export const LabResultChartData: React.FC<{
  dailyRevenue: IQueryResult[]
  tooltipLabel: string
}> = ({ dailyRevenue, tooltipLabel }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart
      data={dailyRevenue}
      margin={{ top: 20, right: 30, bottom: 30, left: 50 }}
    >
      <CartesianGrid stroke="#e5e7eb" strokeDasharray="1 1" />
      <XAxis
        dataKey="date"
        tickCount={2}
        tickFormatter={(t) => formatDate(new Date(t), 'MM/dd/yyyy')}
        tick={{ fontSize: 12, fill: '#6b7280' }}
        axisLine={{ stroke: '#d1d5db' }}
        tickLine={{ stroke: '#d1d5db' }}
      />
      <YAxis
        dx={-10}
        dy={-10}
        tickFormatter={(n) => `${n.toLocaleString()} ${dailyRevenue[0]?.unit}`}
        tick={{ fontSize: 12, fill: '#6b7280' }}
        axisLine={{ stroke: '#d1d5db' }}
        tickLine={{ stroke: '#d1d5db' }}
      />
      <Tooltip
        formatter={(v: number) => [
          `${v.toLocaleString()} ${dailyRevenue[0]?.unit}`,
          tooltipLabel,
        ]}
        labelFormatter={(t) => formatDate(new Date(t), 'MM/dd/yyyy')}
        contentStyle={{
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      />

      {dailyRevenue[0]?.recommendedMin !== undefined &&
        dailyRevenue[0]?.recommendedMax !== undefined && (
          <ReferenceArea
            y1={dailyRevenue[0].recommendedMin}
            y2={dailyRevenue[0].recommendedMax}
            strokeOpacity={0}
            fill="#bbf7d0"
            fillOpacity={0.4}
          />
        )}

      <Area
        type="monotone"
        dataKey="value"
        stroke="#3b82f6"
        strokeWidth={2}
        fill="#bfdbfe"
        fillOpacity={0.6}
        dot={false}
        activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: 'white' }}
      />
    </AreaChart>
  </ResponsiveContainer>
)
