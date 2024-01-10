import { useEffect, useState } from 'react'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { type Referral } from '@psychplus/referrals'
import { updatePatientReferral } from '@psychplus/referrals/api.client'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { Select } from '@psychplus/ui/select'
import { usePubsub } from '@psychplus/utils/event'
import { EVENT_REFERRAL_EDITED } from '@psychplus/widgets/events'
import { useContactStatusOptions } from '../hooks'

const TableCellContact = ({
  row: { original: referral },
}: PropsWithRow<Referral>) => {
  const { publish } = usePubsub()
  const [value, setValue] = useState(referral.contactStatus)
  const options = useContactStatusOptions()

  useEffect(() => {
    setValue(referral.contactStatus)
  }, [referral])

  const updateContactStatus = (value: string) => {
    setValue(value)

    updatePatientReferral({ ...referral, contactStatus: value })
      .then(() => {
        publish(EVENT_REFERRAL_EDITED)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const selectValue = value !== CODE_NOT_SET ? value : undefined

  return (
    <Select.Root
      size="1"
      value={selectValue}
      onValueChange={updateContactStatus}
    >
      <Select.Trigger placeholder="Not Contacted" className="min-w-[150px]" />
      <Select.Content>
        {options?.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { TableCellContact }
