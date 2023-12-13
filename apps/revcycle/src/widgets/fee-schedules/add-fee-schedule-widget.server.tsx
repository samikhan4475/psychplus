// import { CodeSetPreloader, getCodeSets } from '@psychplus/codeset'
// import { getUser, UserPreloader } from '@psychplus/user'
import { AddFeeScheduleWidgetClient } from './add-fee-schedule-widget.client'
import { useStore } from './store'

const AddFeeScheduleWidgetServer = async () => {
  // const [user, codeSets] = await Promise.all([getUser(), getCodeSets()])

  return (
    <>
      {/* <UserPreloader user={user} store={[useStore]} />
      <CodeSetPreloader codeSets={codeSets} store={[useStore]} /> */}
      <AddFeeScheduleWidgetClient />
    </>
  )
}

export { AddFeeScheduleWidgetServer }
