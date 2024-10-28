import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { WeekDetail } from './week-detail-block'

const WEEK_DETAILS = [
  {
    id: 1,
    description: '2 sessions per day (Morning / Afternoon)',
    title: 'Day 1 - 5',
  },
  {
    id: 2,
    description: '3 sessions per day (Morning/Midday/Afternoon)',
    title: 'Day 6 - 10',
  },
]

const AcceleratedProtocol = () => {
  const form = useFormContext()
  const protocol = form.watch('protocol')

  return (
    <>
      <BlockLabel className="text-2 font-[600]">{protocol}</BlockLabel>
      <Text className="text-pp-black-3 text-1 font-regular">
        Involves a condensed treatment schedule with multiple sessions per day
        over 1 to 2 weeks
      </Text>
      {WEEK_DETAILS.map((weekDetail) => (
        <WeekDetail
          key={weekDetail.id}
          description={weekDetail.description}
          title={weekDetail.title}
        />
      ))}
    </>
  )
}

export { AcceleratedProtocol }
