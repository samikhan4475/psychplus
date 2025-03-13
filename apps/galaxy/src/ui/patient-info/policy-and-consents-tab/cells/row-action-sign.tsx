'use client'

import { PrivacyPolicyDialog } from '../privacy-policy-dialog'
import { RowActionProps } from '../types'

const RowActionSign = (props: RowActionProps) => {
  return <PrivacyPolicyDialog {...props} />
}

export { RowActionSign }
