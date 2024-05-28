import { ReconcileUserListDialogWidgetServer } from '@/widgets/reconcile-user-list-dialog'

const ReconcileUserListListWidgetPage = ({
  searchParams,
}: {
  searchParams: {
    id: string
    firstName: string
    lastName: string
    birthDate: string
  }
}) => {
  if (
    !searchParams.id ||
    !searchParams.birthDate ||
    !searchParams.firstName ||
    !searchParams.lastName
  ) {
    return (
      <div>
        Preferred partner Id, birthDate, firstNamt and lastName is required
      </div>
    )
  }

  return <ReconcileUserListDialogWidgetServer searchParam={searchParams} />
}

export default ReconcileUserListListWidgetPage
