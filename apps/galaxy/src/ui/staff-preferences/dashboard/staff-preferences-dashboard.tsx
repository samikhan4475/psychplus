'use client'

import { useMemo, useState } from 'react'
import { Box, ScrollArea, Separator } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { cn } from '@/utils'
import { useStore } from '../store'
import { ApprovalType, PreferenceTab } from '../types'
import { ActionCell } from './action-cell'
import { DashboardHeader } from './dashboard-header'

const columns: (
  canApprove: boolean,
  userId: number | undefined,
  setAlertInfo: ({
    message,
    isOpen,
  }: {
    message: string
    isOpen: boolean
  }) => void,
) => ColumnDef<{
  name: PreferenceTab
  isPending: boolean
  onApprove: () => Promise<string | void>
}>[] = (canApprove, userId, setAlertInfo) => [
  {
    id: 'name',
    header: ({ column }) => <ColumnHeader column={column} label="Pages" />,
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.name}</TextCell>
    ),
  },
  {
    id: 'isPending',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => (
      <TextCell
        className={cn('pl-1', {
          'text-pp-states-error': row.original.isPending,
          'text-pp-states-success': !row.original.isPending,
        })}
      >
        {row.original.isPending ? 'Pending' : 'Approved'}
      </TextCell>
    ),
  },
  {
    id: 'action',
    header: ({ column }) => <ColumnHeader column={column} label="Action" />,
    cell: ({ row }) => (
      <ActionCell
        canApprove={canApprove}
        row={row}
        setAlertInfo={setAlertInfo}
        userId={userId}
      />
    ),
  },
]
const StaffPreferencesDashboard = ({
  userId,
  onApprove,
}: {
  userId: number | undefined
  onApprove: (type: ApprovalType) => Promise<string | void>
}) => {
  const [alertInfo, setAlertInfo] = useState<{
    message: string
    isOpen: boolean
  }>({ message: '', isOpen: false })

  const { dashboardStatus } = useStore((state) => ({
    dashboardStatus: state.dashboardStatus,
  }))

  const canApprove = useHasPermission(
    'clickApproveMangStaffPrefAdminViewNonAdmin',
  )

  const data = useMemo(() => {
    return [
      {
        name: PreferenceTab.PublicView,
        isPending: dashboardStatus.public,
        onApprove: () => onApprove(ApprovalType.public),
      },
      {
        name: PreferenceTab.Alerts,
        isPending: dashboardStatus.alert,
        onApprove: () => onApprove(ApprovalType.alert),
      },
      {
        name: PreferenceTab.CoSignerInfo,
        isPending: dashboardStatus.cosigner,
        onApprove: () => onApprove(ApprovalType.cosigner),
      },
      {
        name: PreferenceTab.VisitSetting,
        isPending: dashboardStatus.visit,
        onApprove: () => onApprove(ApprovalType.visit),
      },
    ]
  }, [dashboardStatus])
  return (
    <>
      <DashboardHeader
        userId={userId}
        onApprove={onApprove}
        isPendingStatus={
          dashboardStatus.public ||
          dashboardStatus.alert ||
          dashboardStatus.cosigner ||
          dashboardStatus.visit
        }
        setAlertInfo={setAlertInfo}
      />
      <PermissionAlert
        isOpen={alertInfo.isOpen}
        message={alertInfo.message}
        showHeading={false}
        onClose={() => {
          setAlertInfo({
            message: '',
            isOpen: false,
          })
        }}
      />
      <Separator className="bg-pp-bg-accent w-full" />

      <Box p="2" className="bg-white mt-[3px]">
        <ScrollArea
          scrollbars="horizontal"
          className="w-full max-w-[calc(100vw_-_210px)]"
        >
          <DataTable
            columns={columns(!!canApprove, userId, setAlertInfo)}
            data={data}
            tdClass="p-0"
            isRowSpan
          />
        </ScrollArea>
      </Box>
    </>
  )
}

export { StaffPreferencesDashboard }
