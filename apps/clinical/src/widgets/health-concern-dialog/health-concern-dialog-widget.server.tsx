import { unstable_noStore as noStore } from 'next/cache'
import { HealthConcernDialogProps, HealthConcernDialogWidgetClient } from '.'
import { Preloader } from './preloader'
import { useStore } from './store'

const HealthConcernDialogWidgetServer = async ({
  isDialogOpen,
  toggleDialog,
  data,
  patientId,
  noteId,
}: HealthConcernDialogProps) => {
  noStore()

  return (
    <>
      <Preloader store={useStore} patientId={patientId} noteId={noteId} />
      <HealthConcernDialogWidgetClient
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        data={data}
      />
    </>
  )
}

export { HealthConcernDialogWidgetServer }
