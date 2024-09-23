import { ScheduleView } from '@/ui/schedule'
import { getStatesByCountry } from '@/ui/visit/add-visit/api'

const SchedulePage = async () => {
  const statesResponse = await getStatesByCountry('United States')

  if (statesResponse.state === 'error') {
    throw new Error(statesResponse.error)
  }

  return <ScheduleView states={statesResponse.data} />
}

export default SchedulePage
