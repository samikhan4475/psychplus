'use client'

import CardForm from './card-form'
import CardFormAuthenticated from './card-form-authenticated'
import { CreditFormProps } from './types'

const CreditCardForm = (props: CreditFormProps) => {
  const { isUnAuthenticated } = props
  return isUnAuthenticated ? (
    <CardForm {...props} />
  ) : (
    <CardFormAuthenticated {...props} />
  )
}

export { CreditCardForm }
