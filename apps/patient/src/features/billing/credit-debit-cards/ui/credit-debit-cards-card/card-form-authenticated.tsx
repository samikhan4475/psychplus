'use client'

import { useProfileStore } from '@/features/account/profile/store'
import CardForm from './card-form'
import { CreditFormProps } from './types'

const CardFormAuthenticated = (props: CreditFormProps) => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  return <CardForm {...props} profile={profile} />
}

export default CardFormAuthenticated
