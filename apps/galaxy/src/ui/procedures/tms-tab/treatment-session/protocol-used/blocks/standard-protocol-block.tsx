import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { WeekDetail } from './week-detail-block'

export const WEEK_DETAILS = [
  {
    id: 1,
    description: '30 Sessions (Mon - Fri)',
    title: 'Week 1 - Week 6',
  },
  {
    id: 2,
    description: '3 Sessions (Mon, Wed, Fri)',
    title: 'Week 7',
  },
  {
    id: 3,
    description: '2 sessions (Tue, Thur)',
    title: 'Week 8',
  },
  {
    id: 4,
    description: '1 session (Wed)',
    title: 'Week 9',
  },
]

const StandardProtocol = () => {
  const form = useFormContext()
  const protocol = form.watch('protocol')

  return (
    <>
      <BlockLabel className="text-2 font-[600]">{protocol}</BlockLabel>
      <Text className="text-pp-black-3 text-1 font-regular">
        Involves a total of 30-36 sessions scheduled daily over 4-6 weeks,
        followed by a tapering phase of 6 sessions over the following 3 weeks
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

export { StandardProtocol }
