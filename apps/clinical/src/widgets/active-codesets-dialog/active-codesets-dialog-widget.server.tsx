import { unstable_noStore as noStore } from 'next/cache'
import { ActiveCodeSetsDialogProps, ActiveCodesetsDialogWidgetClient } from '.'

const ActiveCodesetsDialogWidgetServer = ({
  isDialogOpen,
  toggleDialog,
  data,
  authorityId,
}: ActiveCodeSetsDialogProps) => {
  noStore()

  return (
    <ActiveCodesetsDialogWidgetClient
      isDialogOpen={isDialogOpen}
      toggleDialog={toggleDialog}
      data={data}
      authorityId={authorityId}
    />
  )
}

export { ActiveCodesetsDialogWidgetServer }
