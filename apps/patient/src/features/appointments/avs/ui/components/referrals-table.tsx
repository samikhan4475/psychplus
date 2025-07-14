import { EmptyFileIcon } from '@/components-v2'
import { useCodesetCodes } from '@/providers'
import { CODESETS } from '@psychplus-v2/constants'
import { formatDateTime } from '@psychplus/utils/time'
import { CommonTable } from '../../common'
import { Referral, TableColumn } from '../../types'
import { formatLocalDate } from '../../utils'
import { TextCell } from './text-cell'

const ReferralsTable = ({
  referrals,
  loading,
}: {
  referrals: Referral[]
  loading?: boolean
}) => {
  const contactMadeStatusCodes = useCodesetCodes(CODESETS.ContactMadeStatus)
  const servicesOfferedCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const columns: TableColumn<Referral>[] = [
    {
      key: 'dateTime',
      label: 'Date/Time',
      render: (row) => (
        <TextCell>
          {row?.referralDate
            ? formatDateTime(new Date(row?.referralDate),true)
            : ''}
        </TextCell>
      ),
    },
    {
      key: 'services',
      label: 'Services',
      render: (row) => (
        <TextCell>
          {servicesOfferedCodes?.find((item) => item?.value === row?.service)
            ?.display ?? ''}
        </TextCell>
      ),
    },
    {
      key: 'serviceStatus',
      label: 'Service Status',
      render: (row) => <TextCell>{row?.servicesStatus ?? ''}</TextCell>,
    },
    {
      key: 'initiatedBy',
      label: 'Initiated By',
      render: (row) => (
        <TextCell>{row?.metadata?.createdByFullName ?? ''}</TextCell>
      ),
    },
    {
      key: 'referringProvider',
      label: 'Referring Provider',
      render: (row) => (
        <TextCell>
          {row?.referredByName?.firstName ?? ''}{' '}
          {row?.referredByName?.lastName ?? ''}
        </TextCell>
      ),
    },
    {
      key: 'contactStatus',
      label: 'Contact Initiated',
      render: (row) => (
        <TextCell>
          {contactMadeStatusCodes?.find(
            (item) => item?.value === row?.contactStatus,
          )?.display ?? ''}
        </TextCell>
      ),
    },
    {
      key: 'nextVisit',
      label: 'Next Visit',
      render: (row) => (
        <TextCell>
          {row?.nextVisit ? formatLocalDate(row?.nextVisit, 'MM/dd/yy') : 'N/A'}
        </TextCell>
      ),
    },
  ]
  return (
    <CommonTable
      columns={columns}
      data={referrals}
      emptyDescription="No referrals"
      EmptyIcon={EmptyFileIcon}
      getRowKey={(row) => row?.id}
      loading={loading}
    />
  )
}

export default ReferralsTable
