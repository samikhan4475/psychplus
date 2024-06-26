import React from 'react'
import { Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { deletePreferredPartnerCreditCard } from '../../api.client'
import { useStore } from '../../store'
import { type CreditCard } from '../../types'

const CreditCardRowActionEdit = ({
  row: { original: creditCard },
}: PropsWithRow<CreditCard>) => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const deleteCreditCard = async (creditCard: CreditCard) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this card?',
    )
    if (isConfirmed) {
      try {
        await deletePreferredPartnerCreditCard(
          preferredPartnerId,
          creditCard.id,
        )
        alert('Card deleted successfully!')
      } catch (error) {
        let message = ''
        if (typeof error === 'string') {
          message = error
        } else if (error instanceof Error) {
          message = error.message
        } else {
          message = JSON.stringify(error)
        }
        alert(`ERROR: ${message}`)
      } finally {
        window.location.replace(`/widgets/preferred-partners-financial-info`)
      }
    }
  }

  return (
    <DropdownMenu.Item
      onClick={() => {
        deleteCreditCard(creditCard)
      }}
    >
      <Text>Delete</Text>
    </DropdownMenu.Item>
  )
}

export { CreditCardRowActionEdit }
