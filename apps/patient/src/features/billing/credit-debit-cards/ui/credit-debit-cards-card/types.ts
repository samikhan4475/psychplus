import { ReactNode } from 'react'
import { PatientProfile } from '@psychplus-v2/types'
import { CreditCard } from '../../types'

interface CreditFormProps {
  trigger?: ReactNode
  creditCard?: CreditCard
  existingCards?: CreditCard[]
  triggerClassName?: string
  isCall?: boolean
  isUnAuthenticated?: boolean
  onFormClose?: () => void
  profile?: PatientProfile
}

export { type CreditFormProps }
