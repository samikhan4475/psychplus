import { useEffect, useState } from 'react'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { Select } from '@psychplus/ui/select'
import { usePubsub } from '@psychplus/utils/event'
import { EVENT_REFERRAL_EDITED } from '@psychplus/widgets/events'
import { updatePatientReferral } from '../api.client'
import { useReferralStatusOptions } from '../hooks'
import type { Referral } from '../types'

const TableCellStatus = ({
  row: { original: referral },
}: PropsWithRow<Referral>) => {
  const { publish } = usePubsub()
  const [value, setValue] = useState(referral.resourceStatus)
  const options = useReferralStatusOptions()

  useEffect(() => {
    setValue(referral.resourceStatus)
  }, [referral])

  const updateReferralStatus = (value: string) => {
    setValue(value)

    updatePatientReferral({ ...referral, resourceStatus: value })
      .then(() => {
        publish(EVENT_REFERRAL_EDITED)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <Select.Root size="1" value={value} onValueChange={updateReferralStatus}>
      <Select.Trigger className="min-w-[125px]" />
      <Select.Content>
        {options?.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { TableCellStatus }
