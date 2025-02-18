import { headers } from 'next/headers'
import { ScheduleView } from '@/ui/schedule'

const HomePage = async () => {
  const referer = headers().get('referer')
  let isInitialLogin = false
  if (referer?.includes('/login')) {
    isInitialLogin = true
  }
  return <ScheduleView isInitialLogin={isInitialLogin} />
}

export default HomePage
