import { Text } from '@radix-ui/themes'
import { WeekDetail } from '@/ui/procedures/tms-tab/treatment-session/protocol-used/blocks/week-detail-block'

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

const SaintSection = () => {
  return (
    <>
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

export { SaintSection }
