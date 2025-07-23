import { notFound, redirect } from 'next/navigation'
import { getUserPermissions } from '@/api/get-user-permissions'

const ManagementView = async () => {
  const permissions = await getUserPermissions()

  if (!permissions['mainTabManagementPermission']) return notFound()

  redirect('/management/coding')
}

export { ManagementView }
